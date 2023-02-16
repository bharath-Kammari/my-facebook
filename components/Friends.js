import React, { useEffect, useState } from 'react'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { fontSize } from '@mui/system';
import FriendsItem from './FriendsItem';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import FriendRequestItem1 from './FriendRequestItem1';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';
import { db } from '../firebase';
function Friends({ setHomePageState }) {
  const user = useSelector(selectUser);
  const [requests, setRequests] = useState([]);
  // console.log("got the user"+user.userID);
  useEffect(() => {
    console.log("first render");
    db.collection("friend_requests").where("toID", "==", user.userID).orderBy("timeStamp", "desc").onSnapshot((querySnapshot) => {
      const currRequests = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        currRequests.push(doc.data());
      })

      setRequests(currRequests);
      console.log("requestsrequests");
      console.log(requests);
    })
  }, [])
  return (
    <div className='flex h-[89vh] bg-[#f0f2f5]'>
      <div className="left   bg-white px-2 shadow-lg h-full w-[30%] min-w-[250px]">
        <div className="header p-2 flex justify-between">
          <h1 className='text-2xl font-bold'>Friends</h1>
          <SettingsRoundedIcon sx={{ fontSize: 35 }} className='bg-[#e4e6eb] p-1.5 rounded-full' />
        </div>
        <FriendsItem setHomePageState={()=>{}} active={true}  Icon={GroupRoundedIcon} title="Home" />
        <FriendsItem setHomePageState={setHomePageState} Icon={PersonAddAlt1RoundedIcon} title="Friend Requests" extend={true} />
        <FriendsItem Icon={ListRoundedIcon} title="All Friends" extend={true} />
        <FriendsItem Icon={CakeRoundedIcon} title="Birthdays" />
      </div>

      <div className="right flex flex-col w-[70%] h-full  lg:p-8 md:p-6 sm:p-4 p-2 bg-[#f0f2f5]">
        <h1 className='text-xl mb-4 font-bold'>Friend Requests</h1>
        <div className="requests rounded-lg overflow-y-auto no-scrollbar grid grid-cols-1  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-2 ">

        {requests.map(({ fromID, fromImage, fromName }) =>
        (
          <FriendRequestItem1 key={fromID} profile={fromImage} title={fromName} userID={fromID} />
          )
          )}
       
        </div>
        
      </div>
    </div>

  )
}

export default Friends
