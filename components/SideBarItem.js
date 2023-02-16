import { Avatar } from '@mui/material'
import React from 'react'

function SideBarItem({setHomePageState,Icon,title,avatar}) {
  return (
    <div className='flex w-full space-x-2 p-2 cursor-pointer items-center rounded-md hover:bg-[#e6e9ec]'>

      {avatar?
        <Avatar  sx={{ width: 28, height: 28 }} src={avatar}/>:
      <Icon className="h-[28px] w-[28px] text-[#1b74e4]"></Icon>
}
    
      <h1 onClick={()=>{setHomePageState({HomeState:title})}}className='font-semibold'>{title}</h1>
    </div>
  )
}

export default SideBarItem
