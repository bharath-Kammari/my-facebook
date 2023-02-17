import React, { useEffect, useState } from 'react'
import InputButton from './InputButton'
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MessageIcon from '@mui/icons-material/Message';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { db } from '../firebase';
import NavItem from './NavItem';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';
import firebase from 'firebase/compat/app';
import { useSession } from 'next-auth/react';
import Popup from 'reactjs-popup';
import FriendRequestItem2 from './FriendRequestItem2';
import { PersonOff } from '@mui/icons-material';
function Profile({ profileState, currID, currName, currImage }) {
  const { data: session } = useSession();
  const [user, setUser] = useState();
  const [requestState, setRequestState] = useState("Add Friend");
  const actualUser = useSelector(selectUser);
  const actualUserID = actualUser.userID;
  // const [userID,setUserID]=useState();
  const handleOnConfirm=()=>{
    const fromID=currID;
    const fromName=currName;
    const fromImage=currImage;
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
      db.collection("friend_requests").doc(str).delete().then(()=>{
        console.log("deleted friend request");
        setRequestState("Friends");
      }).catch(err=>{console.log(err)});
      // setRequestState("Friends");
    });
  }
  const handleOnDelete=()=>{
    const fromID=currID;
    const fromName=currName;
    const fromImage=currImage;
    const toID=actualUser.userID;
    const toName=session.user.name;
    const toImage=session.user.image;
    let arr=[toID,fromID];
    arr.sort();
    const str=arr[0]+"_"+arr[1];
    db.collection("friend_requests").doc(str).delete().then(()=>{
      console.log("deleted friend request");
      setRequestState("Add Friend");
    }).catch(err=>{console.log(err)});

  }
  const handleClick = () => {

    if (requestState == "Add Friend") {
      var arr = [actualUserID, currID];
      arr.sort();
      const str = arr[0] + "_" + arr[1];
      db.collection("friend_requests").doc(str).set({
        fromID: actualUserID,
        toID: currID,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        fromImage: session.user.image,
        fromName: session.user.name,


      }).then(() => {
        console.log("Added Successfully");
        setRequestState("Requested");
      })
    }
    else if (requestState == "Requested") {

    }
    else if (requestState == "Respond") {

    }
    else if (requestState == "Friends") {
      // For unfriending
      var arr = [actualUserID, currID];
      arr.sort();
      const str = arr[0] + "_" + arr[1];
      db.collection("friends").doc(str).delete().then(() => {
        const fromID = actualUserID;
        const toID = currID;
        let docRef = db.collection("followers").doc(fromID);
        docRef.get().then((querySnapshot) => {
          if (querySnapshot.exists) {
            docRef.update({
              followers: firebase.firestore.FieldValue.arrayRemove(toID)
            });
            let docRef2 = db.collection("followers").doc(toID);
            docRef2.get().then((querySnapshot) => {
              if (querySnapshot.exists) {
                docRef2.update({
                  followers: firebase.firestore.FieldValue.arrayRemove(fromID)
                });
              }
              setRequestState("Add Friend");
            })
          }

        })


      })
    }
  }


  // useEffect(()=>{

  //   var arr=[actualUserID,currID];
  //   arr.sort();
  //   const str=arr[0]+"_"+arr[1];
  //   db.collection("friend_requests").doc(str).get().then((doc)=>{
  //     if(doc.exists){
  //       let friendRequest=doc.data();
  //       if(friendRequest.fromID.localeCompare(actualUserID)==0){
  //         setRequestState("Requested");
  //       }
  //       else setRequestState("Respond");
  //     }
  //     else{
  //       db.collection("followers").doc(actualUserID).get().then((doc)=>{
  //           if(doc.exists){
  //             let followerObj=doc.data();
  //             var followers=followerObj.followers;
  //             if(followers.find(element=>(element==currID))!=undefined)
  //             { setRequestState("Friends");}
  //           }
  //           else setRequestState("Add Friend");
  //       })
  //     }
  //   });

  // });
  useEffect(() => {
    setRequestState(profileState);
  }, [profileState]);
  return (
    <div className='bg-[#f0f2f5]'>
      {/* <h1>{currID}</h1> */}
      <div className='flex justify-around shadow-md bg-white'>
        <div className="wrapper w-[90%] sm:w-3/4  flex flex-col items-center lg:items-start bg-white">

          <div className="coverPhoto relative w-full h-96 bg-gradient-to-t from-[#5d5d5e] via-[#f0f2f5] to-[#f0f2f5] rounded-lg   ">
            {/* <img src={currImage} className="object-cover h-96 w-full rounded-lg" /> */}
            <div className="addPhoto shadow-lg absolute bottom-4 right-4 ">
              <InputButton bgColor="white" Icon={CameraAltRoundedIcon} title="Add Cover Photo" />
            </div>
          </div>
          <div className="main px-8 flex flex-col space-y-4 items-center lg:flex lg:flex-row w-full space-x-3  relative bottom-10">
            <div className="left">
              <img src={currImage} alt="" className='h-[175px] rounded-full  border-4 border-white w-[175px]' />
            </div>
            <div className="middle flex flex-col justify-center flex-grow">
              <h1 className='text-3xl font-bold'>{currName}</h1>

            </div>
            <div className="right flex items-end justify-between lg:items-end h-full  lg:pb-8 space-x-5 lg:space-x-3">
              {requestState == "Respond" && (

                <Popup trigger={

                  <InputButton onClick={handleClick} textColor="white" color="white" Icon={PersonAddAlt1RoundedIcon} title={requestState} bgColor="#1b74e4" />
                } modal>
                  {
                    close => (
                      <div className='relative'>
                        <div onClick={close} className="close absolute top-1 cursor-pointer right-1">
                          <CloseRoundedIcon className='text-gray-400' />
                        </div>
                        {/* {(requestState=="Respond")&&( */}
                        <div className="w-[30vw] min-w-[250px]">

                          <div className='flex w-full space-x-2 bg-white p-2 py-3 rounded-lg cursor-pointer hover:bg-[#f5f6f8]'>
                            <div className="left">
                              <img className="h-16 w-16 rounded-full border border-1 border-black" src={currImage} />
                            </div>
                            <div className="right grow">
                              <h1 className='font-semibold'>{currName}</h1>
                              <h1 className='text-sm text-gray-400 mb-2'>38 mutual friends</h1>
                              <div className="buttons flex space-x-2 ">
                                <div onClick={()=>{handleOnConfirm();
                                close();}} className="button cursor-pointer w-1/2 flex justify-center bg-[#1b74e4] rounded-md py-2">
                                  <h1 className='font-semibold text-white'>Confirm</h1>
                                </div>
                                <div onClick={()=>{handleOnDelete();
                                close();}} className="button w-1/2 cursor-pointer flex justify-center bg-[#e4e6eb] rounded-md py-2">
                                  <h1 className='font-semibold text-black'>Delete</h1>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ div>

                        {/* )} */}
                      </div>
                    )
                  }
                </Popup>
              )}
              {requestState == "Add Friend" && (
                <InputButton onClick={handleClick} textColor="white" color="white" Icon={PersonAddAlt1RoundedIcon} title={requestState} bgColor="#1b74e4" />
              )}
              {requestState == "Requested" && (
                <Popup trigger={

                  <InputButton onClick={handleClick} textColor="white" color="white" Icon={PersonAddAlt1RoundedIcon} title={requestState} bgColor="#1b74e4" />
                } modal>
                  {
                    close => (
                      <div className='relative  bg-white rounded-lg'>
                        <div onClick={close} className="close absolute top-1 cursor-pointer right-1">
                          <CloseRoundedIcon className='text-gray-400' />
                        </div>
                        {/* {(requestState=="Respond")&&( */}
                        <div className="w-[30vw] py-4 px-3">
                          <h1>The Friend Request was sent. Waiting for acceptance.</h1>
                        </ div>

                        {/* )} */}
                      </div>
                    )
                  }
                </Popup>
              )}
              {requestState == "Friends" && (
                <Popup trigger={

                  <InputButton textColor="black" color="black" Icon={CheckCircleOutlineIcon} title={requestState} bgColor="#e4e6eb" />
                } modal>
                  {
                    close => (
                      <div className='relative  bg-white rounded-lg'>
                        <div onClick={close} className="close absolute top-1 cursor-pointer right-1">
                          <CloseRoundedIcon className='text-gray-400' />
                        </div>
                        {/* {(requestState=="Respond")&&( */}
                        <div className="w-[30vw] flex flex-col items-center py-4 px-3">
                          <h1 className='mb-6 text-md font-semibold'>Would you like to unfriend this user?</h1>

                          <div className="flex space-x-7 justify-around">

                            <InputButton onClick={close} textColor="white" color="white" Icon={CloseRoundedIcon} title={"Close"} bgColor="#1b74e4" />
                            <InputButton onClick={() => {
                              handleClick()

                              close()
                            }} textColor="black" color="black" Icon={PersonOff} title={"Unfriend"} bgColor="#e4e6eb" />
                          </div>
                        </ div>

                        {/* )} */}
                      </div>
                    )
                  }
                </Popup>
              )}
              <InputButton textColor="black" Icon={MessageIcon} bgColor="#e4e6eb" title="Message" />
            </div>

          </div>
          <div className="wrapper2 px-8">

            <div className=" -mt-8 ">
              <div className="h-[1px] bg-gray-300"></div>

            </div>

            {/* <hr /> */}

            <div className="navbar py-1 flex">
              <NavItem title="Posts" />
              <NavItem title="About" />
              <NavItem title="Friends" />
              <NavItem title="Photos" />
              <NavItem title="Videos" />
              <NavItem title="Check-ins" />
            </div>

          </div>
        </div>
      </div>
      <div className="lower">
        
      </div>
    </div>
  )
}

export default Profile
