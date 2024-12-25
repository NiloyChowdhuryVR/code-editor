import { SignedIn, SignInButton, SignOutButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { ConvexHttpClient } from 'convex/browser'
import React from 'react'
import { api } from '../../../../convex/_generated/api';
import Link from 'next/link';
import ThemeSelector from './ThemeSelector';
import LanguageSelector from './LanguageSelector';
import RunButton from './RunButton';
import HeaderProfileBtn from './HeaderProfileBtn';

const Header = async () => {

    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const user = await currentUser();

    const convexUser = await convex.query(api.users.getUser,{userId: user?.id || ""})


  return (
    <>
    <div>
    {/* JUST TRIAL  */}
    <SignInButton/>
    <div>{user?user?.fullName:"Please Login"}</div>
    <SignOutButton/>
    </div>
    <div>
        {/* Theme and Language Selector  */}
        <ThemeSelector/>
        <LanguageSelector hasAccess={Boolean(convexUser?.isPro)}/>
    </div>

    {!convexUser?.isPro && <div><Link href="/pricing">Upgrade to Pro</Link></div>}
    
    <SignedIn>
        <RunButton/>
    </SignedIn>

    <div>
        <HeaderProfileBtn/>
    </div>
    </>
  )
}

export default Header