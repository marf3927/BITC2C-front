import React from 'react';
import AppLayout from '../../components/AppLayout';
import { Button, Input } from 'semantic-ui-react'
import axios from 'axios'

const Ask = () => {
    function upload(){
        axios.post('http://localhost:3000/QnA',
            {
                title: "title",
                content: "content",
                username: "username",
                date: "date"
            }
        ).then((response) => {
            
        });
    }

    return (
        <>
        <AppLayout>
            <div>
                <h1>질문하기</h1>
                <div>
                    <Button onClick={upload}>
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