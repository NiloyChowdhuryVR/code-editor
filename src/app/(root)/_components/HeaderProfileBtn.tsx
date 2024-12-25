"use client"
import { SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const HeaderProfileBtn = () => {
  return (
    <>
        <UserButton>
            <UserButton.MenuItems>
                <UserButton.Link label='Profile' href='/profile' labelIcon="User" />
            </UserButton.MenuItems>
        </UserButton>

        <SignedOut>
            <SignInButton/>
        </SignedOut>
    </>
)
}

export default HeaderProfileBtn