import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const MyAccount = () => {

    const router = useRouter()

    useEffect(() => {
        if (!localStorage?.getItem('token')) {
            router?.push('/')
        }
    }, [])
    
  return (
    <div>
      
    </div>
  )
}

export default MyAccount
