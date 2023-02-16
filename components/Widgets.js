import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { selectUser } from '../slices/userSlice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ContactItem from './ContactItem';
function Widgets({ actualUserID, setHomePageState, setProfileState, setHomeOtherUser }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    console.log("Actual");
    console.log(actualUserID);
    db.collection("followers").doc(actualUserID).get().then((docRef) => {
      if (docRef.exists) {
        console.log("exists");
        const followers = docRef.data().followers;

        const promises = [];
        followers.forEach((docID) => {
          promises.push(db.collection("users").doc(docID).get());
        })
        const friendsData = [];
        Promise.all(promises).then((values) => {
          values.forEach((value) => {
            friendsData.push({ id: value.id, user: value.data() });
          })
          console.log("Friends DAta")
          console.log(friendsData);
          setFriends(friendsData);
        })


      }

    })
  }, [actualUserID])
  return (
    <div className='w-full flex flex-col h-[89vh] space-y-2'>
      <div className="overflow-auto">


        <div className="header w-full flex justify-between mt-2">
          <div className="left">
            <h1 className='text-gray-500 text-lg font-semibold'>Contacts</h1>
          </div>
          <div className="right  flex space-x-2">
            <VideoCallIcon className='text-gray-500 '></VideoCallIcon>
            <SearchIcon className='text-gray-500 '></SearchIcon>
            <MoreHorizIcon className='text-gray-500 '></MoreHorizIcon>
          </div>
        </div>
        {
          friends.length != 0 && (
            <div className='w-full flex flex-col space-y-1'>

              {friends.map((doc) => (
                <ContactItem setProfileState={setProfileState} key={doc.id} setHomeOtherUser={setHomeOtherUser} setHomePageState={setHomePageState} userID={doc.id} profile={doc.user.userImage} name={doc.user.userName} />
              ))}

            </div>
          )
        }

      </div>
    </div>
  )
}

export default Widgets 
