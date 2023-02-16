import { useSession } from 'next-auth/react'
import React from 'react'
import SideBarItem from './SideBarItem'
import { UsersIcon } from '@heroicons/react/20/solid'
import { ClockIcon } from '@heroicons/react/20/solid'
import { UserGroupIcon } from '@heroicons/react/20/solid'
import { BuildingStorefrontIcon } from '@heroicons/react/20/solid'
import { BookmarkIcon } from '@heroicons/react/20/solid'
import { FlagIcon } from '@heroicons/react/20/solid'
import { CalendarDaysIcon } from '@heroicons/react/20/solid'
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import HistoryIcon from '@mui/icons-material/History';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import HomeIcon from '@mui/icons-material/Home';
import Popup from 'reactjs-popup'
function SideBar({ setHomePageState }) {
  const { data: session } = useSession();
  return (
    <div className='w-full flex flex-col h-[89vh]  '>
      <div className="overflow-auto ">

        <SideBarItem avatar={session.user.image} title={session.user.name}></SideBarItem>

        <SideBarItem setHomePageState={setHomePageState} Icon={UsersIcon} title="Friends" />
        <Popup
          trigger={open => (
            <div className="item">

              <SideBarItem setHomePageState={() => { }} Icon={ClockIcon} title="Recent" />
            </div>

          )}
          position="right center"
          on={['hover', 'focus']}
          closeOnDocumentClick
        >
          <span className='bg-white p-2 rounded-lg shadow-lg'> Not implemented yet! </span>
        </Popup>
        <Popup
          trigger={open => (
            <div className="item">

              <SideBarItem setHomePageState={() => { }} Icon={UserGroupIcon} title="Groups" />
            </div>
          )}
          position="right center"
          on={['hover', 'focus']}
          closeOnDocumentClick
        >
          <span className='bg-white p-2 rounded-lg shadow-lg'> Not implemented yet! </span>
        </Popup>
        <Popup
          trigger={open => (
            <div className="item">

              <SideBarItem setHomePageState={() => { }} Icon={BuildingStorefrontIcon} title="Marketplace" />
            </div>

          )}
          position="right center"
          on={['hover', 'focus']}
          closeOnDocumentClick
        >
          <span className='bg-white p-2 rounded-lg shadow-lg'> Not implemented yet! </span>
        </Popup>
        <Popup
          trigger={open => (
            <div className="item">

              <SideBarItem setHomePageState={() => { }} Icon={SmartDisplayIcon} title="Watch" />
            </div>

          )}
          position="right center"
          on={['hover', 'focus']}
          closeOnDocumentClick
        >
          <span className='bg-white p-2 rounded-lg shadow-lg'> Not implemented yet! </span>
        </Popup>
        <Popup
          trigger={open => (
            <div className="item">

              <SideBarItem setHomePageState={() => { }} Icon={BookmarkIcon} title="Saved" />
            </div>

          )}
          position="right center"
          on={['hover', 'focus']}
          closeOnDocumentClick
        >
          <span className='bg-white p-2 rounded-lg shadow-lg'> Not implemented yet! </span>
        </Popup>
        <Popup
          trigger={open => (
            <div className="item">

              <SideBarItem setHomePageState={() => { }} Icon={FlagIcon} title="Pages" />
            </div>

          )}
          position="right center"
          on={['hover', 'focus']}
          closeOnDocumentClick
        >
          <span className='bg-white p-2 rounded-lg shadow-lg'> Not implemented yet! </span>
        </Popup>
        <Popup
          trigger={open => (
            <div className="item">

              <SideBarItem setHomePageState={() => { }} Icon={CalendarDaysIcon} title="Events" />
            </div>
          )}
          position="right center"
          on={['hover', 'focus']}
          closeOnDocumentClick
        >
          <span className='bg-white p-2 rounded-lg shadow-lg'> Not implemented yet! </span>
        </Popup>
        <Popup
          trigger={open => (
            <div className="item">

              <SideBarItem setHomePageState={() => { }} Icon={ChevronDownIcon} title="See more" />
            </div>

          )}
          position="right center"
          on={['hover', 'focus']}
          closeOnDocumentClick
        >
          <span className='bg-white p-2 rounded-lg shadow-lg'> Not implemented yet! </span>
        </Popup>
        {/* <SideBarItem setHomePageState={()=>{}} Icon={ChevronDownIcon} title="See more"/>
      <SideBarItem setHomePageState={()=>{}} Icon={ChevronDownIcon} title="See more"/>
      <SideBarItem setHomePageState={()=>{}} Icon={ChevronDownIcon} title="See more"/>
      <SideBarItem setHomePageState={()=>{}} Icon={ChevronDownIcon} title="See more"/>
      <SideBarItem setHomePageState={()=>{}} Icon={ChevronDownIcon} title="See more"/>
      <SideBarItem setHomePageState={()=>{}} Icon={ChevronDownIcon} title="See more"/>
      <SideBarItem setHomePageState={()=>{}} Icon={ChevronDownIcon} title="See more"/>
      <SideBarItem setHomePageState={()=>{}} Icon={ChevronDownIcon} title="See more"/>
      <SideBarItem setHomePageState={()=>{}} Icon={ChevronDownIcon} title="See more"/>
      <SideBarItem setHomePageState={()=>{}} Icon={ChevronDownIcon} title="See more"/> */}
      </div>
    </div>
  )
}

export default SideBar
