import {Menu, Icon, Container, Button,Responsive,Visibility ,Segment,Header, Image } from 'semantic-ui-react'
import React, {useState} from "react";
import  Router  from 'next/router';


const HomepageHeading = () =>{

    const gototrade = () => Router.push('/trade/tradeMain')


    return(
        <Segment
                 inverted
                    textAlign='center'
                    style={{ minHeight: 250, padding: '7em 0em' }}
                    vertical
        >
        <Container>
        <Image size='small' src="/static/image/logo.png" centered circular />
            <Header
                as='h1'
                content='이더리움은 혁신적인 결제 네트워크이자 신종 화폐입니다.'
                inverted
                style={{
                    
                    fontWeight: 'normal',
                    marginBottom: 0,
                   
                }}
            />
            <Header
                as='h2'
                content='Do whatever you want when you want to.'
                inverted
                style={{
                    
                    fontWeight: 'normal',
                    
                }}
            />
            <Button primary size='huge' onClick={gototrade}>
                거래 시작하기
                <Icon name='right arrow' />
            </Button>
        </Container>
        </Segment>
    )


}


export default HomepageHeading