import React, {useState, useEffect, useContext, useRef} from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import {Button, Table, Input, Icon, Tab} from 'semantic-ui-react'
import axios from 'axios'
import Router from "next/router"
import {AuthStoreContext} from "../../store/AuthStroe"
import { id } from 'postcss-selector-parser'

const List = () => {
    const AuthStore = useContext(AuthStoreContext)
    const baseURL = AuthStore.baseURL

    const [items, setItems] = useState([])
    const [page, setPage] = useState(1)
    const [selected, setSelected] = useState("All")
    const [selectedtoken, setSelectedtoken] = useState("ETH")
    const [Sortname, setSortname] = useState("");
    const [Iconbool,setIconbool] =useState(true);
    const idReference = useRef();

    useEffect(() => {
        getItems()
        
    }, [, page, selected,Iconbool,Sortname,selectedtoken])
    function sortItems(level,method){
        
            console.log("level=",level)
            axios.get(baseURL + '/trade/'+method+'/'+page,{
                params: {
                    method:Sortname,
                    order:level,
                    type:selectedtoken
                }
            })
                .then((response) => {
                    const data = response.data
                    setItems(data)
                    console.log(data)
                    console.log(items)
                    
                })
        
    }
    function getItems() {
       if (selected === "All") {

        
           if(!(Sortname==="")&&Iconbool){
            
               sortItems(Iconbool,"index")
           }else if(!(Sortname==="")&&!(Iconbool)){
               
                sortItems(Iconbool,"index")
           }else{
            axios.get(baseURL + '/trade/index/' + page,{
                params: {
                    type:selectedtoken
                }
            })
                .then((response) => {
                    const data = response.data
                
                    setItems(data)
                })
           }
            
        } else if (selected === "Buy") {
            if(!(Sortname==="")&&Iconbool){
            
                sortItems(Iconbool,"buy")
            }else if(!(Sortname==="")&&!(Iconbool)){
                
                 sortItems(Iconbool,"buy")
            }else{
            axios.get(baseURL + '/trade/buy/' + page,{
                params: {
                    type:selectedtoken
                }
            })
                .then((response) => {
                    const data = response.data
                    setItems(data)
                })
            }
        } else if (selected === "Sell") {
            if(!(Sortname==="")&&Iconbool){
            
                sortItems(Iconbool,"sell")
            }else if(!(Sortname==="")&&!(Iconbool)){
                
                 sortItems(Iconbool,"sell")
            }else{
            axios.get(baseURL + '/trade/sell/' + page,{
                params: {
                    type:selectedtoken
                }
            })
                .then((response) => {
                    const data = response.data
                    setItems(data)
                })
            }
        }
    }
    function gotoDetail(itemiD, status, method){
        const itemID=itemiD;
        const statusCode=status
       // const method = method
        //진행상황이 0 이면 detail 페이지로 1이면 excahnge 페이지로
        if(statusCode === 0){
            Router.push({
            pathname : '/trade/detail',
            query : {id : itemID}
        },'/detail'
        )
        }else if(statusCode ===1){
            Router.push({
                pathname: '/trade/exchange',
                query: { name: method }
            }
            ,'/exchange'
            )
        }else{

        }
        
    }
    function tabClicktoken(e){
        setSelectedtoken(e)

        return true;
    }
    function tabClick(e) {
        

        setSelected(e)
        setPage(1)
    }

    function NextPageClick() {
        setPage(page + 1)
    }

    function PreviousPageClick() {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    
    function WritingBoard() {
        console.log("writing");
        Router.push('/trade/writing');
    }
    
    //상태값에 따라서 화면렌더링 변환
    function statusdecide(status){
        if(status ===0){
            return "Standby"
        }else if(status ===1){
            return "Progress"
        }else{
            return "Complete"
        }
    }
    //정렬기능중 오름차순,내림차순에 따라 true false 값 반환
    
    function iconlist(){
        if(!Iconbool){                          
            return <i className="caret down icon"></i>              
        }else{             
            
            return <i className="caret up icon"></i>
        }
    }
    const element = useRef();


    function decideSort(methodname){
    
        
        if(Sortname===methodname){   

            return iconlist()   

        }
    }
   
    function Sortlist(clicked){
        setSortname(clicked)
        setIconbool(!Iconbool);
    
    }
    
    return (
        <>

            <AppLayout>
                <style jsx>{`
                    .type_right {
                        float: right;
                        color: rgb(92, 5, 80);
                    }
                `}</style>
                <div>
                     <div className="ui pointing secondary menu">
                        <a id="ETH" className={`item ${selectedtoken ==="ETH" ? "active" : ""}` } onClick={() => tabClicktoken("ETH")}>ETH</a>
                        <a id="Atoken" className={`item ${selectedtoken ==="Atoken" ? "active" : ""}`}onClick={() => tabClicktoken("Atoken")}>Atoken</a>
                        <a id="Btoken" className={`item ${selectedtoken ==="Btoken" ? "active" : ""}`}onClick={() => tabClicktoken("Btoken")}>Btoken</a>
                        <a id="Ctoken" className={`item ${selectedtoken ==="Ctoken" ? "active" : ""}`}onClick={() => tabClicktoken("Ctoken")}>Ctoken</a>

                    </div>
                    <div className="ui pointing secondary menu">
                        <a id="All" className={`item ${selected ==="All" ? "active" : ""}`} onClick={() => tabClick("All")}>All</a>
                        <a id="Buy" className={`item ${selected ==="Buy" ? "active" : ""}`} onClick={() => tabClick("Buy")}>Buy</a>
                        <a id="Sell" className={`item ${selected ==="Sell" ? "active" : ""}`} onClick={() => tabClick("Sell")}>Sell</a>

                    </div>
                    <div className="ui segment active tab">
                    <Table singleLine>
                        <Table.Header>
                            <Table.Row>

                              
                                <Table.HeaderCell onClick={()=>Sortlist("status")}>status{decideSort("status")}</Table.HeaderCell>
                                <Table.HeaderCell onClick={()=>Sortlist("type")}>type{decideSort("type")}</Table.HeaderCell>
                                <Table.HeaderCell onClick={()=>Sortlist("price")}>price{decideSort("price")}</Table.HeaderCell>
                                <Table.HeaderCell onClick={()=>Sortlist("amount")}>amount{decideSort("amount")}</Table.HeaderCell>
                                <Table.HeaderCell onClick={()=>Sortlist("updated")}>updated{decideSort("updated")}</Table.HeaderCell>

                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {items.map((item) => {
                                return  <Table.Row key={item.id} onClick={()=>gotoDetail(item.id,item.status,item.method)}>
                                     <Table.Cell>{statusdecide(item.status)}</Table.Cell>
                                    <Table.Cell>{item.type}</Table.Cell>
                                    <Table.Cell>{item.price}</Table.Cell>
                                    <Table.Cell>{item.amount}</Table.Cell>
                                    <Table.Cell>{item.updatedAt}</Table.Cell>
                                </Table.Row>
                               
                            })}
                        </Table.Body>
                    </Table>
                </div>
                </div>
                <div>
                    <span><Button onClick={() => PreviousPageClick()}><Icon name="caret left"/></Button></span>
                    <span><a>{page}</a></span>
                    <span><Button onClick={() => NextPageClick()}><Icon name="caret right"/></Button></span>
                    <span className="ui icon input">
                        <Input type="text" id="page" name="page" placeholder="Page..."/>
                        <i aria-hidden="true" className="search circular link icon" onClick={e => {
                            if (document.getElementById('page').value >= 1) {
                                setPage(document.getElementById('page').value)
                            }
                        }}></i>
                    </span>
                    <span className="type_right"><Button id="WritingBoard" onClick={() => WritingBoard()}>Writing</Button></span>
                </div>
            </AppLayout>
       </>
    )
}


export default List;
