import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import { useSession, signIn, signOut } from 'next-auth/react'
import Login from '../components/Login'
import SideBar from '../components/SideBar'
import Feed from '../components/Feed'
import Widgets from '../components/Widgets'
import HomePage from '../components/HomePage'

import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import { useEffect } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();
  
  if (session) {
   
    return (
      <>
        {/* <img src={session.user.image}/>
     */}
        {/* <h1>{session.user.image}</h1> */}
        <Head>
        <title>Facebook</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <HomePage />
      {/* <h1  className="p-4 rounded-lg bg-blue-500 text-white">{session.user.email}</h1> */}
      </>
    )
  }
  else {
    return (
      <Login />
    )
  }

}