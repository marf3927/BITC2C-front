import {Menu, Icon, Container, Button,Responsive,Visibility ,Segment,Header } from 'semantic-ui-react'
import React, {useState} from "react";


const HomepageHeading = () =>{




    return(
        <Segment
                 inverted
                    textAlign='center'
                    style={{ minHeight: 250, padding: '7em 0em' }}
                    vertical
        >
        <Container>
            <Header
                as='h1'
                content='Imagine-a-Company'
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
            <Button primary size='huge'>
                Get Started
                <Icon name='right arrow' />
            </Button>
        </Container>
        </Segment>
    )


}


export default HomepageHeading