import { ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Moment from "react-moment";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import {signIn, useSession} from "next-auth/react"
import { useState, useEffect } from "react";
import { onSnapshot, collection, deleteDoc } from "firebase/firestore";
import { HeartIcon as HeartIconFiled} from "@heroicons/react/24/solid";
import { deleteObject, ref } from "firebase/storage";

export default function Post({post}) {
  const {data: session} = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", post.id, "likes"), (snapshot) => 
      setLikes(snapshot.docs)
    )
  }, [db]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1)
  }, [likes])

  async function likePost(){
    if(session){
      if(hasLiked){
        await deleteDoc(doc(db, "posts", post.id, "likes", session?.user.uid));
      }else{
      await setDoc(doc(db, "posts", post.id, "likes", session?.user.uid), {
        username: session.user.username,
      })

    }
  }else{
    signIn();
  }
}
async function deletePost(){
  if(window.confirm("Are you sure you want to delete this post?")){
    deleteDoc(doc(db, "posts", post.id));
    if (post.data().image){

      deleteObject(ref(storage, `posts/${post.id}/image`));
    }
  }
  
}
  return (
    <div className="flex p-3 border-b border-gray-200 cursor-pointer ">
      {/* user image */}
      <img src={post.data().userImg} alt="user-img" className="mr-4 rounded-full h-11 w-11"/>
      {/* right side */}
        <div className="w-full">
          {/* header */}
            <div className="flex items-center justify-between">
              {/* post user info */}
              <div className="flex items-center space-x-1 whitespace-nowrap">
                <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post.data().name}</h4>
                <span className="text-sm sm:text-[15px] text-gray-600">@{post.data().username} - </span>
                <span className="text-sm sm:[15px] hover:under text-gray-600
                ">
                <Moment fromNow>
                  {post?.data().timestamp?.toDate()}
                </Moment>
                </span>
              </div>
              {/* dot icon*/}
              <EllipsisHorizontalIcon className="w-10 h-10 p-2 hoverEffect hover:bg-sky-100 hover:text-sky-500"/>
            </div>

          {/*post text*/}
          <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{post.data().text}</p>

          {/*post image*/}
          <img className="w-full rounded-2xl" src={post.data().image} alt="" />

          {/*icons*/}
          <div className="flex justify-between p-2 text-gray-500">
          <ChatBubbleOvalLeftEllipsisIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100"/>

          {session?.user.uid === post?.data().id &&
            <TrashIcon onClick={deletePost} className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100"/>
          }
            <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFiled onClick={likePost} className="p-2 text-red-600 h-9 w-9 hoverEffect hover:bg-red-100"/>
              
              ): (
                
                <HeartIcon onClick={likePost} className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100"/>
                )}
                {
                  likes.length > 0 && (
                    <span className={`${hasLiked && "text-red-600 text-sm select-none"}`} >{likes.length}</span>
                    )
         }
         </div>
          <ShareIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100"/>
          <ChartBarIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100"/>


          </div>
        </div>
    </div>
  )
}
