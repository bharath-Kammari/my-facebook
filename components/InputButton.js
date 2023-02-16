import React from 'react'

function InputButton({Icon,onClick,color,bgColor,textColor,title}) {
  return (
    <div onClick={onClick}>

    
    <div style={{backgroundColor:bgColor}} className='flex flex-grow space-x-2 justify-center  p-2 px-3 cursor-pointer rounded-md hover:bg-[#f0f2f5]'>
      {Icon&&(

        <Icon style={{color:color}}/>
        )}
      
      <h1 style={{color:textColor}} className='text-[#707276] font-semibold'>{title}</h1>  
      
      
    </div>
    </div>
  )
}

export default InputButton
