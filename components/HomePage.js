import React, { useEffect, useRef, useState } from 'react'
import Feed from './Feed'
import Header from './Header'
import SideBar from './SideBar'
import Widgets from './Widgets'
import { useSession } from 'next-auth/react'
import { db } from '../firebase'
import Friends from './Friends'
import Profile from './Profile'
import FriendsRequests from './FriendsRequests'
import { useDispatch } from 'react-redux'
import { login } from '../slices/userSlice'
import firebase from 'firebase/compat/app'
function HomePage() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [state, setState] = useState({ HomeState: "Home" });
  const [otherUID, setOtherUID] = useState({});
  const [profileState, setProfileState] = useState("");
  const [actualUserID, setActualUserID] = useState("IDK");
  const [sideBarState,setSideBarState] = useState(false);
  const sideBarRef=useRef(null);
  const feedRef=useRef(null);
  const widgetsRef=useRef(null);
  useEffect(() => {
    if (session) {

      var query = db.collection('users').where('userEmail', '==', session.user.email);
      query.get().then((querySnapshot) => {
        if (querySnapshot.empty) {
          // Adding
          console.log('empty');
          db.collection('users').add(
            {
              userName: session.user.name,
              userEmail: session.user.email,
              userImage: session.user.image,
            }
          )
            .then((docRef) => {
              dispatch(
                login({
                  userID: docRef.id,
                  userName: session.user.name,
                  userEmail: session.user.email,
                  userImage: session.user.image,
                })
              )
              setActualUserID(docRef.id);
              db.collection("followers").doc(docRef.id).set({
                followers: [docRef.id],
                recentPosts: [],
                lastPost: firebase.firestore.FieldValue.serverTimestamp()
              })
              console.log(docRef.id);
            }).catch(e => alert(e));


        }
        else {
          const userID = querySnapshot.docs[0].id;
          dispatch(
            login({
              userID: userID,
              userName: session.user.name,
              userEmail: session.user.email,
              userImage: session.user.image,
            })
          )
          setActualUserID(userID);
          console.log(userID);
        }

      })
    }
  }, [])
  useEffect(()=>{
    if(state.HomeState!="Home")return;
    if(sideBarState){
      // while(!sideBarState.current){

      // }
      
      sideBarRef.current.classList.remove("hidden");
      sideBarRef.current.classList.add("w-[100%]")
      feedRef.current.classList.add("hidden");
      feedRef.current.classList.add("sm:hidden");
      feedRef.current.classList.add("md:hidden");
      feedRef.current.classList.add("lg:hidden");
      widgetsRef.current.classList.add("hidden");
      widgetsRef.current.classList.add("sm:hidden");
      widgetsRef.current.classList.add("md:hidden");
      widgetsRef.current.classList.add("lg:hidden");
  }
  else{
    // while(!sideBarState.current){
        
    // }
    sideBarRef.current.classList.add("hidden");
    sideBarRef.current.classList.remove("w-[100%]")
    feedRef.current.classList.remove("hidden");
    feedRef.current.classList.remove("sm:hidden");
    feedRef.current.classList.remove("md:hidden");
    feedRef.current.classList.remove("lg:hidden");
    // widgetsRef.current.classList.remove("hidden");
    widgetsRef.current.classList.remove("sm:hidden");
    widgetsRef.current.classList.remove("md:hidden");
    widgetsRef.current.classList.remove("lg:hidden");
  }
  },[sideBarState])
  useEffect(() => {
    console.log(otherUID)
    console.log(profileState)

    console.log(state)
  }, [otherUID, profileState, state])

  return (
    <div className='flex flex-col'>
      <Header setSideBarState={setSideBarState }setProfileState={setProfileState} setHomeOtherUser={setOtherUID} setHomePageState={setState}></Header>


      {state.HomeState == "Home" && (
        <main className='bg-[#f0f2f5] flex-grow px-2 '>

          {/* <Feed/> */}
          <div className="flex justify-around ">
            <div ref={sideBarRef} className="sidebar hidden lg:flex lg:w-[20%] ">

              <SideBar setHomePageState={setState} />
            </div>
            <div ref={feedRef} className="feed flex w-[90%] min-w-[280px] md:w-[60%]  lg:w-[45%]">

              <Feed setProfileState={setProfileState} setHomeOtherUser={setOtherUID} setHomePageState={setState}></Feed>
            </div>


            {/* <Widgets/> */}


            <div ref={widgetsRef} className="widgets hidden md:flex md:w-[30%] lg:flex lg:w-[20%]">

              <Widgets actualUserID={actualUserID} setProfileState={setProfileState} setHomeOtherUser={setOtherUID} setHomePageState={setState}></Widgets>
            </div>


          </div>
        </main>
      )}
      {state.HomeState == "Friends" && (
        <Friends setHomePageState={setState} />
      )}
      {(state.HomeState == "Profile") && (
        <div>

          {/* <h1>{otherUID}</h1> */}
          <Profile profileState={profileState} currID={otherUID.userID} currName={otherUID.name} currImage={otherUID.image} />
        </div>
      )}
      {(state.HomeState == "Friend Requests") && (

        <FriendsRequests setHomePageState={setState} />
      )}
      


    </div>
  )
}

export default HomePage
