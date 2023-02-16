import React from 'react'

function HeaderOption({setHomePageState,Icon,active,title}) {
  return (
    <div onClick={()=>{
      if(setHomePageState)
      setHomePageState({HomeState:title});
    }} className='w-full hover:cursor-pointer active:border-b-2 active:border-[#1b74e4] active:rounded-b-none flex justify-center items-center  hover:bg-[#f0f2f5] rounded-lg '>
      {active?<Icon className='active:text-[#1b74e4] text-[#1b74e4]'></Icon>
      :<Icon className='active:text-[#1b74e4] text-[#65676b]'></Icon>
  }
    </div>
  )
}

export default HeaderOption
