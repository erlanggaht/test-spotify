'use client'
import React from 'react'
import { SessionProvider } from "next-auth/react"


function SessionProviderClient({children,session}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default SessionProviderClient
