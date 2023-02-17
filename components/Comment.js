import { ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Moment from "react-moment";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import {signIn, useSession} from "next-auth/react"
import { useState, useEffect } from "react";
import { onSnapshot, collection, deleteDoc } from "firebase/firestore";
import { HeartIcon as HeartIconFiled} from "@heroicons/react/24/solid";
import { deleteObject, ref } from "firebase/storage";
import {useRecoilState} from 'recoil'
import { modalState, postIdState } from "@/atom/ModalAtom";
import { useRouter } from "next/router";

export default function Comment({comment, commentId, originalPostId}) {
  const {data: session} = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"), (snapshot) => 
      setLikes(snapshot.docs)
    )
  }, [db, originalPostId, commentId]);


  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1)
  }, [likes])

  async function likeComment(){
    if(session){
      if(hasLiked){
        await deleteDoc(doc(db, "posts", originalPostId, "comments", commentId, "likes", session?.user.uid));
      }else{
      await setDoc(doc(db, "posts", originalPostId, "comments", commentId, "likes", session?.user.uid), {
        username: session.user.username,
      })

    }
  }else{
    signIn();
  }
}
async function deleteComment(){
  if(window.confirm("Are you sure you want to delete this comment?")){
    deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
    
  }
  
}
  return (
    <div className="flex p-3 pl-20 border-b border-gray-200 cursor-pointer">
      {/* user image */}
      <img src={comment?.userImg} alt="user-img" className="mr-4 rounded-full h-11 w-11"/>
      {/* right side */}
        <div className="flex-1">
          {/* header */}
            <div className="flex items-center justify-between">
              {/* post user info */}
              <div className="flex items-center space-x-1 whitespace-nowrap">
                <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{comment?.name}</h4>
                <span className="text-sm sm:text-[15px] text-gray-600">@{comment?.username} - </span>
                <span className="text-sm sm:[15px] hover:under text-gray-600
                ">
                <Moment fromNow>
                  {comment?.timestamp?.toDate()}
                </Moment>
                </span>
              </div>
              {/* dot icon*/}
              <EllipsisHorizontalIcon className="w-10 h-10 p-2 hoverEffect hover:bg-sky-100 hover:text-sky-500"/>
            </div>

          {/*post text*/}
          <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{comment?.comment}</p>


          {/*icons*/}
          <div className="flex justify-between p-2 text-gray-500">
          <div className="flex items-center select-none">
          <ChatBubbleOvalLeftEllipsisIcon onClick={() => {
            if(!session){
              signIn();
            }else{
              setPostId(originalPostId);  
              setOpen(!open);
            }

          }} 
          className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100"/>
      
          </div>
          
          {session?.user.uid === comment?.userId &&
            <TrashIcon onClick={deleteComment} className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100"/>
          }
            <div className="flex items-center">
            {hasLiked ? (
              <HeartIconFiled onClick={likeComment} className="p-2 text-red-600 h-9 w-9 hoverEffect hover:bg-red-100"/>
              
              ): (
                
                <HeartIcon onClick={likeComment} className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100"/>
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

