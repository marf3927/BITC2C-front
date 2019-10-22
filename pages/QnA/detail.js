import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { Button, Table, Input, Icon, Tab } from 'semantic-ui-react'
import axios from 'axios'
import Router from 'next/router'

const Board = () => {

    const ask = () => {
        Router.push('/QnA/ask');
    }

    return (
        <AppLayout>
            <div>
                <h1>Q&A</h1>
                <Button onClick={ask}>
                    질문하기
                </Button>
                <table border="1">
                    <tbody>
                        <tr align="center">
                            <td width="50">No.</td>
                            <td width="1100">Title</td>
                            <td width="120">Name</td>
                            <td width="150">Date</td>
                        </tr>
                        {/* {
                            boards.map(row =>
                                (<BoardItem key={row.brdno} row={row} />)
                            )
                        } */}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    )
}

const BoardItem = () => {
    return (
        <tr>
            <td>{this.props.row.brdno}</td>
            <td>{this.props.row.brdtitle}</td>
            <td>{this.props.row.brdwriter}</td>
            <td>{this.props.row.brddate.toLocaleDateString('ko-KR')}</td>
        </tr>
    )
}

export default Board;