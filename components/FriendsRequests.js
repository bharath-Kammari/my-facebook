import React, { useEffect, useState } from 'react'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import FriendRequestItem2 from './FriendRequestItem2';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';
import { db } from '../firebase';
import Profile from './Profile';
function FriendsRequests({ setHomePageState }) {
  const user = useSelector(selectUser);
  const [requests, setRequests] = useState([]);
  const [clickRequest, setClickRequest] = useState(null);
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
      <div className="left  bg-white px-2 shadow-lg h-full w-[30%] min-w-[250px]">
        <div className="header flex space-x-4 mb-2 pt-2 items-center w-full">
          <div onClick={
            () => {
              setHomePageState({ HomeState: "Friends" });
            }} className="left cursor-pointer">
            <ArrowBackRoundedIcon className='text-[#6d7a8a]' />
          </div>
          <div className="right">
            <h1 className='text-[#6d7a8a] text-sm'>Friends</h1>
            <h1 className='text-black text-2xl font-bold'>Friend Requests</h1>
          </div>
        </div>
        <hr className='text-black h-[1px] mb-2 bg-gray-300' />
        <div className="requests flex flex-col space-y-2 w-full">
          {requests.map(({ fromID, fromImage, fromName }) =>
          (
            <div key={fromID } onClick={() => {
              setClickRequest({ profileState: "Respond", currID: fromID, currImage: fromImage, currName: fromName })
            }} className="item">

              <FriendRequestItem2  key={fromID} profile={fromImage} title={fromName} userID={fromID} />
            </div>
          )
          )}


        </div>
      </div>
      <div className="right w-[70%] hidden md:flex h-full  overflow-auto no-scrollbar bg-[#f0f2f5]">
        {clickRequest && <Profile profileState={clickRequest.profileState} currID={clickRequest.currID} currName={clickRequest.currName} currImage={clickRequest.currImage}></Profile>}

      </div>

    </div>
  )
}

export default FriendsRequests
