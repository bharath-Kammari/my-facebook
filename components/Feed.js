import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../slices/userSlice'
import InputBox from './InputBox'
import Posts from './Posts'
import Stories from './Stories'

function Feed({setHomeOtherUser,setProfileState,setHomePageState}) {
  const user=useSelector(selectUser);
  return (
    <div className='w-full flex flex-col h-[89vh]   space-y-2'>
      <div className="overflow-auto  no-scrollbar">

      {/* <Stories/> */}
      <InputBox></InputBox>
      {user&&(
        
        <Posts setHomePageState={setHomePageState} setHomeOtherUser={setHomeOtherUser} setProfileState={setProfileState}></Posts>
        )}
      </div>
    </div>
  )
}

export default Feed
