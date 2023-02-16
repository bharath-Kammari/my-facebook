import Image from 'next/image'
import React from 'react'

function StoryItem({name,src,profile}) {
  return (
    // <div>
      <div className="relative rounded-lg flex items-center  h-48 w-28 overflow-hidden ">
        <img className="object-cover brightness-75 h-full w-full" src={src}   />
        <img className='h-10 w-10 rounded-full absolute top-2 left-2 border-2 border-[#1b74e4]' src={profile}/>
        <h1 className='absolute bottom-2 left-2 font-semibold text-sm  text-white'>{name}</h1>
      </div>
    // </div>
  )
}

export default StoryItem
