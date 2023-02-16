import React from 'react'

function NavItem({title}) {
  return (
    <div className='px-4 py-3 cursor-pointer hover:bg-[#f0f2f5] rounded-lg'>
      <h1 className='font-semibold text-[#6B6C6E]'>{title}</h1>
    </div>
  )
}

export default NavItem
