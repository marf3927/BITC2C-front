import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import AppLayout from '../../components/AppLayout'
import { Button, Table, Input, Icon, Tab } from 'semantic-ui-react'
import axios from 'axios'
import Router from "next/router"
import Cookies from 'js-cookie';


const Emailcheck = () => {
    

    return (
        <>

            <AppLayout>
                <div>
                    Email을 확인해 주세요!
                </div>
            </AppLayout>
        </>
    )
}


export default Emailcheck;
