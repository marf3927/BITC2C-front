import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { useSelector } from "react-redux";
import { Button, Table, Input, Icon, Tab, Dropdown, Menu, Label} from 'semantic-ui-react'
import axios from 'axios'
import Router from 'next/router'

const Writing = () => {
    const options = [
        { key: 1, text: 'Choice 1', value: 1 },
        { key: 2, text: 'Choice 2', value: 2 },
        { key: 3, text: 'Choice 3', value: 3 },
    ]

    return (
        <AppLayout>
            <Menu compact>
                <Dropdown text='Dropdown' options={options} simple item />
            </Menu>
        </AppLayout>

    )
}


export default Writing;