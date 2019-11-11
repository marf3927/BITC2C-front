import React from 'react'
import AppLayout from '../../components/AppLayout'
import { Button } from 'semantic-ui-react'
import Router from 'next/router'

const Board = () => {

    const ask = () => {
        Router.push('/QnA/ask');
    }

    const detail = () => {
        Router.push('/QnA/detail');
    }

    return (
        <AppLayout>
            <div>
                <h1>Q&A</h1>
                <Button onClick={ask}>
                    질문하기
                </Button>
                <Button onClick={detail}>
                    상세보기
                </Button>
                <table border="1">
                    <tbody>
                        <tr align="center">
                            <td width="50">No.</td>
                            <td width="1100">Title</td>
                            <td width="120">Name</td>
                            <td width="150">Date</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppLayout>
    )
}

export default Board;