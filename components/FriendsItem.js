import React from 'react'

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
function FriendsItem({setHomePageState,active,Icon,title, extend}) {
  return (
    <div onClick={()=>{
      setHomePageState({HomeState:title});
    }} className='flex justify-between cursor-pointer hover:bg-[#f0f2f5] rounded-lg py-2 px-4 items-center'>
        <div className="start flex space-x-4 items-center">
      {active&&(
      <Icon sx={{fontSize:35}} className="bg-blue-500 text-white  p-1.5 rounded-full"></Icon>

      )}
      {!active&&(
        <Icon sx={{fontSize:35}} className="bg-[#e4e6eb]  p-1.5 rounded-full"></Icon>
      )}
      
      <h1 className='text-lg font-semibold'>{title}</h1>
        </div>
      {extend&&(<ArrowForwardIosRoundedIcon fontSize='small' className='text-[#606770]'/>)}
    </div>
  )
}

export default FriendsItem;
