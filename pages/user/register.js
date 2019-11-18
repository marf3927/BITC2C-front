import React, {useState, useEffect, useContext} from 'react';
import Router from 'next/router'
import {Button, Input ,Dimmer, Loader, Image, Segment,Form,Label,Grid,Message,Icon} from 'semantic-ui-react'
import axios from 'axios'
import AppLayout from '../../components/AppLayout';

import {HttpServiceContext} from "../../store/HttpService"



const Register = () =>{
    const HttpService = useContext(HttpServiceContext)

    const [name, setName] = useState('') //유저 이름
    const [email, setEmail] = useState('') //유저 이메일
    const [password, setPassword] = useState('') //유저 비밀번호
    const [walletpassword, setwalletPassword] = useState('') //지갑 비밀번호

    const [emailValid, setEmailValid] = useState(false) //이메일 형식 확인
    const [emailValidTxt, setEmailValidTxt] = useState('') //이메일 형식 확인 안내

    const [passwordValid, setPasswordValid] = useState(false) //비밀번호 형식 확인
    const [passwordValidTxt, setPasswordValidTxt] = useState('') //비밀번호 형식 확인 안내

    const [walletpasswordValid, setwalletPasswordValid] = useState(false) //지갑 비밀번호 형식 확인
    const [walletpasswordValidTxt, setwalletPasswordValidTxt] = useState('') //지갑 비밀번호 형식 확인 안내

    const [passwordCheck, setPasswordCheck] = useState('') //비밀번호 재입력
    const [passwordCheckValid, setPasswordCheckValid] = useState(false)//비밀번호 재입력 확인
    const [passwordCheckValidTxt, setPasswordCheckValidTxt] = useState('')//비밀번호 재입력 확인 안내

    const [walletpasswordCheck, setwalletPasswordCheck] = useState('') //지갑 비밀번호 재입력
    const [walletpasswordCheckValid, setwalletPasswordCheckValid] = useState(false)//지갑 비밀번호 재입력 확인
    const [walletpasswordCheckValidTxt, setwalletPasswordCheckValidTxt] = useState('')//지갑 비밀번호 재입력 확인 안내

    const [walletcreateaddr,setwalletcreateaddr] = useState(false);
    const [walletcreatecheck,setwalletcreatecheck] = useState(false);

    const [registstart,setregiststart] = useState(false);
    //이메일 형식 확인
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //비밀번호 형식 확인
    function validatePassword(password) {
        var decimal= /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}/;
        return decimal.test(String(password).toLowerCase());
    }

    useEffect(() => {
        document.getElementById("registbtn").disabled = true;
    },[]);


    //비밀번호 형식, 일치 확인
    useEffect(() => {
        if(password===''){
            setPasswordValid(false)
            setPasswordValidTxt('8자 이상 20 이하, 영문 대소문자, 숫자, 특수 문자 포함된 비밀번호를 입력해주세요.')
        }else if(validatePassword(password)){
            setPasswordValid(true)
            setPasswordValidTxt('사용 가능한 비밀번호입니다.')
            //비밀번호, 재입력한 비밀번호 일치 확인
            if(password === ''){
                setPasswordCheckValid(false)
                setPasswordCheckValidTxt('')
            }
            else if(password === passwordCheck){
                setPasswordCheckValid(true)
                setPasswordCheckValidTxt('비밀번호가 일치합니다.')
            }else{
                setPasswordCheckValid(false)
                setPasswordCheckValidTxt('비밀번호가 일치하지 않습니다.')
            }
        } else{
            setPasswordValid(false)
            setPasswordValidTxt('8자 이상 20 이하, 영문 대소문자, 숫자, 특수 문자 포함된 비밀번호를 입력해주세요.')
        }
    },[password, passwordCheck]);

    useEffect(() => {
        if(walletpassword===''){
            setwalletPasswordValid(false)
            setwalletPasswordValidTxt('8자 이상 20 이하, 영문 대소문자, 숫자, 특수 문자 포함된 비밀번호를 입력해주세요.')
        }else if(validatePassword(walletpassword)){
            setwalletPasswordValid(true)
            setwalletPasswordValidTxt('사용 가능한 비밀번호입니다.')
            //비밀번호, 재입력한 비밀번호 일치 확인
            if(walletpassword === ''){
                setwalletPasswordCheckValid(false)
                setwalletPasswordCheckValidTxt('')
            }
            else if(walletpassword === walletpasswordCheck){
                setwalletPasswordCheckValid(true)
                setwalletPasswordCheckValidTxt('비밀번호가 일치합니다.')
            }else{
                setwalletPasswordCheckValid(false)
                setwalletPasswordCheckValidTxt('비밀번호가 일치하지 않습니다.')
            }
        } else{
            setwalletPasswordValid(false)
            setwalletPasswordValidTxt('8자 이상 20 이하, 영문 대소문자, 숫자, 특수 문자 포함된 비밀번호를 입력해주세요.')
        }
    },[walletpassword, walletpasswordCheck]);
    //이메일 형식 확인
    useEffect(() => {
        if(email===''){
            setEmailValid(false)
            setEmailValidTxt('')
        }else if(validateEmail(email)){
            setEmailValid(true)
            setEmailValidTxt('유효한 이메일입니다.')
        } else{
            setEmailValidTxt('유효하지 않은 이메일입니다!')
            setEmailValid(false)
        }
    },[email]);

    useEffect(() => {
        if(setEmailValid&&passwordCheckValid&&passwordValid&&name&&!walletcreatecheck){
            document.getElementById("registbtn").disabled = false;
        } else{
            document.getElementById("registbtn").disabled = true;
        }
    },[setEmailValid, passwordValid, passwordCheckValid, name]);
    //wallet 보내기
    // function onwalletRegisterClick(walletpassword){
    //     HttpService.onwalletRegisterClick(walletpassword).then((res)=>{
    //         console.log(res.data);
    //         setwalletcreateaddr(res.data);
    //         setwalletcreatecheck(true);
    //     }).catch((e)=>{
    //         console.log(e);
    //     })
    // }


    //regiser 보내기
    function onRegisterClick(name, email, password){
        setregiststart(true);
        HttpService.onRegisterClick(name, email, password)


    }

    return (
        <>
            <AppLayout>
            <Segment
                 style={{ minHeight: 650, padding: '5em 0em' }}
                 vertical
                >

<Grid columns='equal'>
    <Grid.Column>
      
    </Grid.Column>
    <Grid.Column width={4}>
    <Message icon>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>Sign Up</Message.Header>
      
Please fill in all fields .
    </Message.Content>
  </Message>
    <Dimmer active={registstart}>
                            <Loader size='huge'>지갑 생성중</Loader>
                        </Dimmer>

                        <Segment inverted>
                            <Form inverted>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Username' placeholder="Name" type="text" onChange={e => setName(e.target.value)}  />

                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Email' onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="Email" />

                                </Form.Group>
                                {emailValidTxt ? <Form.Group><Label basic color='red' pointing>
                                    {emailValidTxt}
                                </Label>
                                </Form.Group> : "" }
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Password' type="password" onChange={e => setPassword(e.target.value)} name="pass" placeholder="Password" />

                                </Form.Group>
                                {passwordValidTxt ? <Form.Group><Label basic color='red' pointing>
                                        {passwordValidTxt}
                                    </Label>
                                </Form.Group>: ""}

                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='Password Check' type="password" onChange={e => setPasswordCheck(e.target.value)} name="passCheck" placeholder="Password Check" />

                                </Form.Group>

                                    {passwordCheckValidTxt ? <Form.Group><Label basic color='red' pointing>
                                            {passwordCheckValidTxt}
                                        </Label>
                                        </Form.Group> : ""}
                                <Button inverted id='registbtn' onClick={() => onRegisterClick(name, email, password)}>Register</Button>

                            </Form>
                        </Segment>
                        
                        
    </Grid.Column>
    <Grid.Column>
      
    </Grid.Column>
  </Grid>
               
                </Segment>   

              
            </AppLayout>
        </>
    );
};

export default Register;
