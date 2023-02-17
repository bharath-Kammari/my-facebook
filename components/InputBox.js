import { Avatar } from '@mui/material';
import { useSession } from 'next-auth/react'
import React, { useRef, useState } from 'react'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CollectionsIcon from '@mui/icons-material/Collections';
import InputButton from './InputButton';
import TagFacesIcon from '@mui/icons-material/TagFaces';

import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';
import Popup from 'reactjs-popup';
function InputBox() {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const user = useSelector(selectUser);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value && !imageToPost) return;

    db.collection('posts').add(
      {
        message: inputRef.current.value,
        name: session.user.name,
        profile: session.user.image,
        userID: user.userID,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        postImage: (imageToPost) ? imageToPost : null,

      }).then((docRef) => {
        const userID = user.userID;
        // db.collection("followers").doc(userID).update({
        //   recentPosts:firebase.firestore.FieldValue.arrayUnion({postID:docRef.id,
        //     published:timestamp,}),
        //   lastPost:timestamp,
        // })
        // db.collection("sample").doc("i8XXEYAVXrBcxGf4tR0j").update({
        //   recentPosts:firebase.firestore.FieldValue.arrayUnion({secondName:"userThree",ThirdName:"dslfjs"}),
        //   lastPost:timestamp,
        // })
        // const map=new Map([["postID",docRef.id],["published",firebase.firestore.FieldValue.serverTimestamp()]]);
        db.collection("followers").doc(userID).update({
          recentPosts: firebase.firestore.FieldValue.arrayUnion({
            postID: docRef.id,
            published: new Date()
          }),
          lastPost: firebase.firestore.FieldValue.serverTimestamp(),
        }).catch(err => { console.error(err); });
      }).catch(err => { console.log(err) });

    inputRef.current.value = null;
    setImageToPost(null);

  }
  const removeImage = (e) => {
    setImageToPost(null);
  }
  const addImageToPost = (e) => {

    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };

  }
  return (
    <div className='bg-white rounded-lg shadow-[#bdc0c2] mt-2 shadow-sm p-2 px-4'>
      <form className="upper flex space-x-2 mb-2">
        <Avatar src={session.user.image}></Avatar>
        <input ref={inputRef} className='rounded-full flex-grow p-2 bg-[#f0f2f5] outline-none text-[#717377] hover:bg-[#dfe3ea]' type="text" placeholder={"What's on you mind, " + session.user.name + "?"} />
        {imageToPost &&
          (
            <div onClick={removeImage}>
              <img className="h-10 cursor-pointer object-contain " title='Remove' src={imageToPost} />
            </div>
          )}

        <button type='submit' hidden onClick={sendPost}></button>
      </form>
      <hr />
      <div className="lower flex mt-2 justify-around">
        <Popup
          trigger={open => (
            <div className="item">



              <InputButton Icon={VideoCameraFrontIcon} title="Live video" color="#f02849" />

            </div>

          )}
          position="right center"
          on={['hover', 'focus']}
          closeOnDocumentClick
        >
          <span className='bg-white p-2 rounded-lg shadow-lg'> Not implemented yet! </span>
        </Popup>
        {/* <InputButton Icon={CollectionsIcon} title= color=""/> */}
        <div onClick={() => filePickerRef.current.click()} className='flex space-x-2 justify-center p-2 px-3 cursor-pointer rounded-md hover:bg-[#f0f2f5]'>
          <CollectionsIcon style={{ color: "#45bd62" }} />
          <h1 className='text-[#707276]'>Photo/video</h1>
          <input ref={filePickerRef} type="file" hidden onChange={addImageToPost} />
        </div>
        <Popup
          trigger={open => (
            <div className="item hidden sm:flex">



              <InputButton  Icon={TagFacesIcon} title="Feeling/activity" color="#f7b928" />

            </div>

          )}
          position="right center"
          on={['hover', 'focus']}
          closeOnDocumentClick
        >
          <span className='bg-white p-2 rounded-lg shadow-lg'> Not implemented yet! </span>
        </Popup>
      </div>

    </div>
  )
}

export default InputBox
