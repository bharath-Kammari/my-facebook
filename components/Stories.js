import React from 'react'
import StoryItem from './StoryItem';
const stories=[
    // {
    //     name:"Sonny Sangha",
    //     src:"https://links.papareact.com/zof",
    //     profile:"https://links.papareact.com/l4v"
    // },
    {
        name:"Elon Musk",
        src:"https://links.papareact.com/4zn",
        profile:"https://links.papareact.com/kxk"
    },
    {
        name:"Jeff Bezos",
        src:"https://links.papareact.com/k2j",
        profile:"https://res.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_256,w_256,f_auto,g_faces,z_0.7,q_auto:eco,dpr_1/v1487985168/ytuofcigxo6oaznmlpwn.png"
    },
    {
        name:"Mark Zuckerberg",
        src:"https://links.papareact.com/xql",
        profile:"https://links.papareact.com/snf"
    },
    {
        name:"Bill Gates",
        src:"https://links.papareact.com/4u4",
        profile:"https://links.papareact.com/zvy"
    },
    {
        name:"Sundar Pichai",
        profile:"https://links.papareact.com/4u4",
        src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXSFlFmRhDlApwFji3cqv3mV_IGwgdQ20Apg&usqp=CAU"
    },
    {
        name:"Ratan Tata",
        src:"https://akm-img-a-in.tosshub.com/aajtak/images/story/202201/ratan_tata-sixteen_nine.jpg",
        profile:"http://starsunfolded.com/wp-content/uploads/2016/09/Ratan-Tata.jpg"
    },
    
];

function Stories() {
    
  return (
    <div className='flex space-x-2 mt-2 '>
      {
        stories.map((ele)=>{
            return (
            <StoryItem key={ele.src} name={ele.name} src={ele.src} profile={ele.profile}/>
            );
        })
      }
    </div>
  )
}

export default Stories
