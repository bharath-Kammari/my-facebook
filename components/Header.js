import React, { useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import StorefrontIcon from '@mui/icons-material/Storefront';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderOption from './HeaderOption';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import RightOption from './RightOption';
import { Avatar } from '@mui/material';
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react';
import { db } from '../firebase';
import SearchItem from './SearchItem';
import { useEffect } from 'react';
function Header({ setHomePageState, setProfileState, setHomeOtherUser, setSideBarState }) {

  const { data: session } = useSession();
  const hamburgerRef=useRef(null);
  const [searchText, setSearchText] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [sideBar,setSideBar]=useState(false);
  useEffect(() => {
    console.log(searchText);
    if (!searchText) {
      setSearchResults([]);
    }
    else {
      var query = db.collection("users").where("userName", ">=", searchText).where("userName", "<=", searchText + "~");
      query.get().then((querySnapshot) => {


        var list = [];
        querySnapshot.forEach((doc) => {
          list.push({ user: doc.data(), id: doc.id });
        })
        setSearchResults(list);
      })
    }
  }, [searchText])
  const handleChange = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    setSearchText(e.target.value);
  }
  return (
    <div className='sticky top-0   flex justify-between  py-2 px-2 z-50 shadow-md  bg-white space-x-1'>
      <div className="left flex relative flex-col w-1/4">
        <div className="subLeft flex items-center">

          <img onClick={()=>{
            setHomePageState({HomeState:"Home"});
          }
          }
            className='h-11 w-11 mr-2 cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="" />
          <div className="searchField flex-grow">


            <div className="searchWrapper flex flex-grow px-2 py-2 rounded-full bg-[#f0f2f5] items-center">
              <SearchIcon className='text-[#6f7175] mr-2'></SearchIcon>
              <input type="text " onKeyUp={handleChange} className='bg-[#f0f2f5] flex-grow  outline-none' placeholder='Search Facebook' />
            </div>
          </div>
        </div>
        <div className="searchResults z-50 shadow-md absolute left-0 top-[50px] w-full min-w-[280px] rounded-lg bg-white">


          {(searchText != undefined && searchText.length > 0) && (
            searchResults.map((doc) => (
              <SearchItem setProfileState={setProfileState} key={doc.id} setSearchText={setSearchText} setHomeOtherUser={setHomeOtherUser} setHomePageState={setHomePageState} userID={doc.id} profile={doc.user.userImage} name={doc.user.userName} />
            ))
          )
          }

        </div>
      </div>

      <div className="middle hidden  lg:flex w-1/2 space-x-2">
        <HeaderOption title="Home" setHomePageState={setHomePageState} Icon={HomeIcon} active={true}></HeaderOption>
        
        <HeaderOption Icon={OndemandVideoIcon}></HeaderOption>
        <HeaderOption Icon={StorefrontIcon}></HeaderOption>
        <HeaderOption Icon={GroupsIcon}></HeaderOption>
        <HeaderOption Icon={SportsEsportsIcon}></HeaderOption>

      </div>

      <div className="right flex justify-end space-x-2 md:w-[40%] lg:w-[30%] items-center">
        <div ref={hamburgerRef} onClick={()=>{setSideBarState(!sideBar);setSideBar(!sideBar);}}className='flex items-center lg:hidden'>

          <HeaderOption Icon={MenuIcon}></HeaderOption>
        </div>
        <div className="options hidden md:inline-flex space-x-1">

          <RightOption Icon={AppsIcon}></RightOption>
          <RightOption Icon={MessageIcon}></RightOption>
          <RightOption Icon={NotificationsIcon}></RightOption>
        </div>
        <div className="flex space-x-1 items-center">

          <Avatar className="cursor-pointer" onClick={signOut} src={session.user.image}></Avatar>
          <h1 className='font-semibold max-w-min hidden sm:flex overflow-ellipsis'>{session.user.name}</h1>
        </div>
      </div>
    </div>
  )
}

export default Header
