
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'


export default function AuthLayout ({children,authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader]  = useState("")
    const authStatus = useSelector(state => state.auth.status)
    useEffect(()=> {
        if(authentication && authStatus !== authentication){
            navigate('/')
        }else if(!authentication && authStatus !== authentication){
            navigate('/dashboard')
        }

        setLoader(false)

    },[authStatus, navigate, authentication])

  return loader? <h1>loading...</h1> :<>{children}</>

}