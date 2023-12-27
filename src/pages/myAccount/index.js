import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const MyAccount = () => {

  const router = useRouter()

  useEffect(() => {
    if (!localStorage?.getItem('token')) {
      router?.push('/')
    }
    if (document) {
      document.title = 'CodesWear || MyAccount';
    }
  }, [])

  return (
    <div>

    </div>
  )
}

export default MyAccount
