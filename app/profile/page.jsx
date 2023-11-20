"use client"
import React from 'react';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProfileInfo from '@/components/ProfileInfo';

const page = () => {
const router = useRouter();
const {data:session} = useSession();
const [navbar, setNavbar] = useState(false);

if (window.scrollY > 100) {
    setNavbar(false);
}
if (!session) {
  router.push('/')
}

  return (
    <main className='min-h-screen w-screen overflow-x-hidden'>
    <Navbar isSearchAllowed={false} otherStyles={`${navbar ? 'fixed top-0' : 'static flex'}`} />
    <ProfileInfo />
    </main>
  )
}

export default page