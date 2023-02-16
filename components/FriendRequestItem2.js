import { useSession } from 'next-auth/react'
import React from 'react'
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { selectUser } from '../slices/userSlice';
import InputButton from './InputButton'
import firebase from 'firebase/compat/app';

function FriendRequestItem2({userID,title,onConfim,onDelete,profile}) {
  const {data:session}=useSession();
  const actualUser=useSelector(selectUser);
  const handleOnConfirm=()=>{
    const fromID=userID;
    const fromName=title;
    const fromImage=profile;
    const toID=actualUser.userID;
    const toName=session.user.name;
    const toImage=session.user.image;
    let arr=[toID,fromID];
    arr.sort();
    const str=arr[0]+"_"+arr[1];
    db.collection("friends").doc(str).set({
      fromID: fromID,
      fromName: fromName,
      fromImage:fromImage,
      toID: toID,
      toName: toName,
      toImage: toImage,

    }).then(()=>{
      let docRef=db.collection("followers").doc(fromID);
      docRef.get().then((querySnapshot)=>{
        if(querySnapshot.exists){
          docRef.update({
            followers: firebase.firestore.FieldValue.arrayUnion(toID)
          });
        }
        else{
          db.collection("followers").doc(fromID).set(
            {
              followers:[toID],
              lastPost:firebase.firestore.FieldValue.serverTimestamp(),
              recentPosts:[]
            }
          )
        }
      })
      let docRef2=db.collection("followers").doc(toID);
      docRef2.get().then((querySnapshot)=>{
        if(querySnapshot.exists){
          docRef2.update({
            followers: firebase.firestore.FieldValue.arrayUnion(fromID)
          });
        }
        else{
          db.collection("followers").doc(toID).set(
            {
              followers:[fromID],
              lastPost:firebase.firestore.FieldValue.serverTimestamp(),
              recentPosts:[]
            }
          )
        }
      })
      handleOnDelete();
    });
  }
  const handleOnDelete=()=>{
    const fromID=userID;
    const fromName=title;
    const fromImage=profile;
    const toID=actualUser.userID;
    const toName=session.user.name;
    const toImage=session.user.image;
    let arr=[toID,fromID];
    arr.sort();
    const str=arr[0]+"_"+arr[1];
    db.collection("friend_requests").doc(str).delete().then(()=>{
      console.log("deleted friend request");
    }).catch(err=>{console.log(err)});

  }
  return (
    <div className='flex w-full space-x-2 bg-white p-2 py-3 rounded-lg cursor-pointer hover:bg-[#f5f6f8]'>
      <div className="left">
        <img className="h-16 w-16 rounded-full border border-1 border-black" src={profile}/>
      </div>
      <div className="right grow">
        <h1 className='font-semibold'>{title}</h1>
        <h1 className='text-sm text-gray-400 mb-2'>38 mutual friends</h1>
        <div className="buttons flex space-x-2 ">
            <div onClick={handleOnConfirm} className="button cursor-pointer w-1/2 flex justify-center bg-[#1b74e4] rounded-md py-2">
                <h1 className='font-semibold text-white'>Confirm</h1>
            </div>
            <div onClick={handleOnDelete} className="button w-1/2 cursor-pointer flex justify-center bg-[#e4e6eb] rounded-md py-2">
            <h1 className='font-semibold text-black'>Delete</h1>
            </div>
        </div>
      </div>
    </div>
  )
}

export default FriendRequestItem2
