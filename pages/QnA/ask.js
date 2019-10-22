import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Cookies } from 'react-cookie';
import AppLayout from '../../components/AppLayout';
import { Button, Input, Table } from 'semantic-ui-react'
import axios from "axios"
import Router from "next/router"

const Ask = () => {
    function upload(){

    }

    return (
        <>
        <AppLayout>
            <div>
                <h1>질문하기</h1>
                <div>
                    <Button>
                        작성완료
                    </Button>
                    <br/>
                    <br />
                </div>
                <div>
                    제목<Input type="text" placeholder="제목을 입력하세요"/>
                    <br />
                    <br />
                    내용
                    <br />
                    <textarea placeholder="내용을 입력하세요" rows="25" cols="230"></textarea>
                </div>
            </div>
        </AppLayout>
        </>
    )
}

export default Ask