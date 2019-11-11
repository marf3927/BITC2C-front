import React from 'react';
import AppLayout from '../../components/AppLayout';
import { Button, Input } from 'semantic-ui-react'

const Ask = () => {
    function upload(){

    }

    return (
        <>
        <AppLayout>
            <div>
                <h2>질문 상세보기</h2>
                <div>
                    <br />
                    <br />
                </div>
                <div>
                    제목<Input type="text" placeholder="해당 질문의 제목"/>
                    <br />
                    <br />
                    내용
                    <br />
                    <textarea placeholder="해당 질문의 내용" rows="25" cols="230"></textarea>
                    <Button>
                        답변하기
                    </Button>
                </div>
            </div>
        </AppLayout>
        </>
    )
}

export default Ask