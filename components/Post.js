import React, { useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseIcon from '@mui/icons-material/Close';
import InputButton from './InputButton';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import RecommendRoundedIcon from '@mui/icons-material/RecommendRounded';
// import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { selectUser } from '../slices/userSlice';
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import Popup from 'reactjs-popup';
import SearchItem from './SearchItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
function Post({ message, name, profile, postID, days, postImage, setHomePageState, setProfileState, setHomeOtherUser }) {
    const [likeState, setLikeState] = useState(false);
    const user = useSelector(selectUser);
    const [likeCount, setLikeCount] = useState(0);
    const [likeString, setLikeString] = useState("");
    const [likedBy, setLikedBy] = useState([]);
    const handleOnLike = () => {
        const str = postID + "_" + user.userID;
        if (likeState) {
            db.collection("likes").doc(str).delete().then(() => {

                setLikeState(false);
                setLikeCount(likeCount - 1);
            })
        }
        else {
            db.collection("likes").doc(str).set({
                postID: postID,
                userID: user.userID,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                userImage: user.userImage,
                userName: user.userName,
            }).then(() => {
                setLikeCount(likeCount + 1);
                setLikeState(true);
            });
        }
    }
    const handleOnComment = () => {

    }
    useEffect(() => {
        const str = postID + "_" + user.userID;
        db.collection("likes").where("postID", "==", postID).orderBy("timestamp", "desc").limit(10).onSnapshot((querySnapshot) => {
            console.log("onSnapshot");
            if (querySnapshot.size > 1)
                setLikeString(querySnapshot.docs[0].data().userName + " and " + (querySnapshot.size - 1) + " others");
            else if (querySnapshot.size == 1) {
                setLikeString(querySnapshot.docs[0].data().userName + " liked this post");

            }
            else setLikeString("");

            setLikedBy(querySnapshot.docs.map((doc) => ({ id: doc.data().userID, user: doc.data() })))

            setLikeCount(querySnapshot.size);
        })
        db.collection("likes").doc(str).get().then((docRef) => {
            if (docRef.exists) setLikeState(true);
            else setLikeState(false);
        })
    }, [])
    return (
        <div className='rounded-lg my-2 shadow-[#bebdbd] shadow-sm  bg-white '>
            <div className="p-2 px-4 pb-1 header flex items-center">
                <img className="h-10 rounded-full mr-2 object-contain" src={profile} alt="" />
                <div className="profileDetails flex-grow">
                    <h1 className='font-semibold'>{name}</h1>
                    <p className='text-sm text-[#707276]'>{days}d ago</p>
                </div>
                <MoreHorizIcon fontSize='large' className='hover:bg-[#f0f2f5] text-gray-500 p-1 cursor-pointer  rounded-full' />
                <CloseIcon fontSize='large' className='hover:bg-[#f0f2f5]   text-gray-500 p-1 rounded-full cursor-pointer' />



            </div>
            {message&&(<h1 className=' p-2 px-4 text-[#0f0f0f]'>{message}</h1>)}

            <div className="middle ">
                <hr />
                {postImage && (
                    <img className="object-contain h-full w-full" src={postImage} />
                )}
            </div>
            <div className="flex justify-between p-2 px-4">
                <Popup trigger={

                    <div className="left flex cursor-pointer  space-x-1 items-center">
                        <RecommendRoundedIcon className='text-[#129df7]'></RecommendRoundedIcon>
                        <h1 className="text-gray-500 pr-2 ">{likeCount}</h1>
                        <h1 className="text-gray-500 text-sm hover:underline">{likeString}</h1>
                    </div>
                } modal>
                    {
                        close => (
                            <div className='w-[30vw] h-[70vh] rounded-lg shadow-xl relative flex flex-col space-y-2 p-4  bg-white'>
                                <div onClick={close} className="close absolute top-1 cursor-pointer right-1">
                                    <CloseRoundedIcon className='text-gray-400' />
                                </div>
                                <h1 className='font-semibold '>Liked By</h1>
                                <div className='overflow-auto'>

                                    {
                                        likedBy.map((doc) => (
                                            <SearchItem setProfileState={setProfileState} key={doc.id} setSearchText={() => { }} setHomeOtherUser={setHomeOtherUser} setHomePageState={setHomePageState} userID={doc.id} profile={doc.user.userImage} name={doc.user.userName} />
                                        ))
                                    }
                                    
                                </div>
                            </div>
                        )
                    }
                </Popup>
                <div className="right flex space-x-2">
                    <div className="left flex space-x-1 items-center">
                        <h1 className="text-gray-500 ">116K</h1>
                        <ChatBubbleOutlineOutlinedIcon fontSize='small' className='text-gray-500'></ChatBubbleOutlineOutlinedIcon>
                    </div>
                    <div className="right flex space-x-1 items-center">
                        <h1 className="text-gray-500">116K</h1>
                        <RedoOutlinedIcon fontSize='small' className='text-gray-500'></RedoOutlinedIcon>
                    </div>
                </div>
            </div>
            <hr />
            <div className="bottom justify-around my-1 flex">
                {
                    likeState && (
                        <InputButton onClick={handleOnLike} Icon={ThumbUpAltRoundedIcon} title="Like" color="#1b74e4" textColor="#1b74e4" />
                    )
                }
                {
                    !likeState && (
                        <InputButton onClick={handleOnLike} Icon={ThumbUpOutlinedIcon} title="Like" color="#707276" />
                    )
                }
                <Popup
          trigger={open => (
            <div className="item">

<InputButton Icon={ChatBubbleOutlineOutlinedIcon} title="Comment" color="#707276" />
              
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


<InputButton Icon={ShareOutlinedIcon} title="Share" color="#707276" />
              
            </div>

          )}
          position="right center"
          on={['hover', 'focus']}
          closeOnDocumentClick
        >
          <span className='bg-white p-2 rounded-lg shadow-lg'> Not implemented yet! </span>
        </Popup>
            </div>
            <hr />
        </div>
    )
}

export default Post
