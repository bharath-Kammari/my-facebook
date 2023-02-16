import React from 'react'
import {useSession,signIn,signOut} from 'next-auth/react'
function Login() {
  return (
    <div className='flex flex-col items-center justify-center' >
      <img className="object-contain mt-10 h-[200px] w-[200px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png" alt="" />
      {/* <Image ></Image> */}
      <button onClick={signIn} className="mt-8 bg-[#1178f2] p-2 rounded-full font-bold text-white">Google Sign in</button>

    </div>
  )
}

export default Login
