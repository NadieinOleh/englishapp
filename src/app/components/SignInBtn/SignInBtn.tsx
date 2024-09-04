'use client'

import React from 'react'
import {signIn} from "next-auth/react"
 
export const SignInBtn = () => {
  return (
    <button onClick={() => signIn("google")}>SignInBtn Google</button>
  )
}
