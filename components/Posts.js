import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { selectUser } from '../slices/userSlice';
import Post from './Post';

function Posts({setHomePageState,setHomeOtherUser,setProfileState}) {
    const[posts,setPosts] = useState([]);
    const user=useSelector(selectUser);
   
  
    useEffect(()=>{
        // db.collection("posts").orderBy('timestamp','desc').onSnapshot(snapshot=>(
        //     setPosts(
        //         snapshot.docs.map(doc=>(
        //             {
        //                 id:doc.id,
        //                 data:doc.data(),
        //             }
        //         ))
        //     )
        // ))
        db.collection("followers").where("followers","array-contains",user.userID).orderBy("lastPost","desc").limit(10).onSnapshot((querySnapshot)=>{
          const data=querySnapshot.docs.map(doc=>doc.data());
          const posts=data.reduce((acc,curr)=>acc.concat(curr.recentPosts),[]);
          const sortedPosts=posts.sort((a,b)=>b.published.toDate().getTime()-a.published.toDate().getTime());
          // console.log(sortedPosts);
          const actualPosts=[];
        //  new Promise((resolve, reject) =>{
          const promises=[];
          sortedPosts.forEach(({postID})=>{
            promises.push(db.collection("posts").doc(postID).get())
          })
          
          Promise.all(promises)
          .then((values)=>{
            
            values.forEach(docRef=>{
              const currPost={id:docRef.id,data:docRef.data()};
            actualPosts.push(currPost);
            })
            
            setPosts(actualPosts);
          })
          
          
        })
      
        
          // updateFunc(posts);


        
    },[]);
  return (
    <div>
      {posts.map(({id,data})=>(
        <Post setHomePageState={setHomePageState} setHomeOtherUser={setHomeOtherUser} setProfileState={setProfileState} key={id} postID={id} message={data.message} days={Math.ceil(((new Date())-data.timestamp.toDate())/((1000 * 60 * 60 * 24)))} name={data.name} profile={data.profile} postImage={data.postImage}/>
        // <h1>{e.id}</h1>
      ))}
    </div>
  )
}

export default Posts
