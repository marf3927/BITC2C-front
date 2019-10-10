import React, {useState, useEffect} from 'react';

import Link from 'next/link';
import Head from 'next/head';

import {Button, Input} from 'semantic-ui-react'


import axios from 'axios'

import AppLayout from '../../components/AppLayout';

const Register = () =>{

    const [name, setName] = useState('') //유저 이름 변수
    const [email, setEmail] = useState('') //유저 이메일 변수
    const [password, setPassword] = useState('') //유저 비밀번호

    const [emailValid, setEmailValid] = useState(false) //이메일 형식 확인
    const [emailValidTxt, setEmailValidTxt] = useState('') //이메일 형식 확인 안내

    const [passwordValid, setPasswordValid] = useState(false) //비밀번호 형식 확인
    const [passwordValidTxt, setPasswordValidTxt] = useState('') //비밀번호 형식 확인 안내
    
    const [passwordCheck, setPasswordCheck] = useState('') //비밀번호 재입력
    const [passwordCheckValid, setPasswordCheckValid] = useState(false)//비밀번호 재입력 확인
    const [passwordCheckValidTxt, setPasswordCheckValidTxt] = useState('')//비밀번호 재입력 확인 안내

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
        if(setEmailValid&&passwordCheckValid&&passwordValid&&name){
            document.getElementById("registbtn").disabled = false;
        } else{
            document.getElementById("registbtn").disabled = true;
        }
    },[setEmailValid, passwordValid, passwordCheckValid, name]);

    axios.defaults.baseURL = 'http://localhost:5555'
    
    //regiser 보내기
    function onRegisterClick(name, email, password){
        return axios.post(('/users/create/'),
        {   
            email,
            name,
            password
        })
        .then((response) => {
            console.log (response.data)
        })
    }

    return (
        <>
            <Head>
                <title>BITC2C</title>
                <link
                    rel="stylesheet"
                    href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
                />
            </Head>
            <AppLayout>
                <div>
                    <h1>Register</h1>
                    <div>
                        <Input type="text" onChange={e => setName(e.target.value)} name="username" placeholder="Name" />
                    </div>
                    <div>
                        <Input onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="Email" />
                        <a>{emailValidTxt}</a>
                    </div>
                    <div >
                        <Input type="password" onChange={e => setPassword(e.target.value)} name="pass" placeholder="Password" />
                        <a>{passwordValidTxt}</a>
                    </div>
                    <div >
                        <Input type="password" onChange={e => setPasswordCheck(e.target.value)} name="passCheck" placeholder="Password Check" />
                        <a>{passwordCheckValidTxt}</a>
                    </div>

                    <div >
                        <Button id='registbtn' onClick={() => onRegisterClick(name, email, password)}>
                            Register
                        </Button>
                    </div>
                </div>
            </AppLayout>
        </>
    );
};

export default Register;