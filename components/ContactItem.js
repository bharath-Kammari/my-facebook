import React from 'react'
import { Avatar } from '@mui/material';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';
function ContactItem({setProfileState,setHomeOtherUser,setHomePageState,userID,profile,name}) {
  const actualUser=useSelector(selectUser);
  const actualUserID=actualUser.userID;
  return (
    <div onClick={()=>{
      
      // console.log(userID);
      const str1="Profile";
      let obj={HomeState:str1};
      
      // db.collection("users").doc(userID).get().then((querySnapshot)=>{
      //   const userObj=querySnapshot.data();

      var arr=[actualUserID,userID];

      arr.sort();
      const str=arr[0]+"_"+arr[1];
      console.log(str);
      db.collection("friend_requests").doc(str).get().then((doc)=>{
        if(doc.exists){
          let friendRequest=doc.data();
          if(friendRequest.fromID.localeCompare(actualUserID)==0){
            setProfileState("Requested");
          }
          else setProfileState("Respond");

          setHomeOtherUser({userID:userID,name:name,image:profile});
        setHomePageState(obj)
        }
        else{
          db.collection("followers").doc(actualUserID).get().then((doc)=>{
              if(doc.exists){
                let followerObj=doc.data();
                var followers=followerObj.followers;
                console.log(followers);
                console.log(userID);
                console.log(followers.find(element=>(element==userID)));
                if(followers.find(element=>(element==userID))==userID)
                { console.log("Friends");setProfileState("Friends");}
                else {
                  console.log("No Friend");
                setProfileState("Add Friend");
                }
              }
              

              setHomeOtherUser({userID:userID,name:name,image:profile});
        setHomePageState(obj)
          })
        }
      });
      
        // console.log(userObj);
        
        
      // })
      
      
      
    }} className="hover:bg-[#e6e9ec] cursor-pointer box-border w-full p-2 rounded-lg flex space-x-2  items-center bg-[#f0f2f5]">
      <Avatar sx={{ width: 28, height: 28 }} src={profile}></Avatar>
      <h1 className=' font-semibold  truncate'>{name}</h1>
    </div>
  )
}

export default ContactItem
