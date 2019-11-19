import React, {useContext, useState, useEffect} from 'react'
import {Menu, Icon} from 'semantic-ui-react'
import Link from 'next/link'
import {HttpServiceContext} from "../store/HttpService"

const Previousheader = () => {
    const HttpService = useContext(HttpServiceContext)
    const [alarms, setAlarms] = useState(0)

    const getAlarm = () => {
        if(HttpService.authStore.isLoggedIn){
            HttpService.getAlarm()
                .then((alarms) =>{
                    console.log(alarms)
                    if(alarms){
                        setAlarms(Object.keys(alarms.data).length)
                    }
                })
        }
    }

    HttpService.socket.get_socket().on("alarm", (data)=>{
        setAlarms(alarms+1)
    })


    useEffect(()=>{
        getAlarm()
    })

    const logout = () => {
        HttpService.authStore.deleteToken()
    }

    return (
        <a></a>
    )

}

export default Previousheader