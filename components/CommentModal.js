import {useRecoilState} from "recoil"
import {modalState, postIdState} from '@/atom/ModalAtom'
import Modal from "react-modal";
import { XMarkIcon, PhotoIcon, FaceSmileIcon  } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { db } from "@/firebase";
import {useSession} from "next-auth/react"
import { doc, onSnapshot, collection, addDoc, serverTimestamp } from "firebase/firestore";
import Moment from "react-moment";
import { useRouter } from "next/router";


export default function CommentModal() {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId,setPostId] = useRecoilState(postIdState);
  const [post,setPost] = useState({});
  const [input, setInput] = useState('');
  const {data: session} = useSession();
  const router = useRouter();


  useEffect(()=>{
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot);
      })
  }, [postId, db]);

  
  async function sendComment(){
      await addDoc(collection(db, "posts", postId, "comments"), {
        comment: input,
        name: session.user.name,
        username: session.user.username,
        userImg: session.user.image,
        timestamp: serverTimestamp()

      })
      setOpen(false);
      setInput("");
      router.push(`posts/${postId}`)
  }
  
  return (
    <div>
      
      {open && (
        <Modal 
        isOpen={open}
        onRequestClose={() => setOpen(false)}
         className="max-w-lg w-[90%] absolute top-24 left-[50%] border-1 border-gray-200 translate-x-[-50%] bg-white rounded-xl shadow-md outline-none">
         <div className="p-1">
          <div className="border-b border-gray-200 py-2 px-1.5">
            <div onClick ={() => setOpen(false)} className="flex items-center justify-center w-10 h-10 hoverEffect ">
              <XMarkIcon className="h-[23px] text-gray-700 p-0"/>
            </div>
          </div>
          <div className="relative flex items-center p-2 space-x-1">
          <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300"></span>
          <img src={post?.data()?.userImg} alt="user-img" className="mr-4 rounded-full h-11 w-11"/>
          <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post?.data()?.name}</h4>
          <span className="text-sm sm:text-[15px] text-gray-600">@{post?.data()?.username} - </span>
          <span className="text-sm sm:[15px] hover:under text-gray-600">
          <Moment fromNow>
            {post?.data()?.timestamp?.toDate()}
          </Moment>
          </span>
          </div>

          <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">{post?.data()?.text}</p>
            <div className='flex p-3 space-x-3 '>
            <img
            src={session.user.image}
            alt="picture of tarik"
            className='rounded-full cursor-pointer h-11 w-11 hover:brightness-95'
            />
            <div className="w-full divide-y divide-gray-200">
            <div className="">
                <textarea className="w-full border-none focus:ring-0 text-lg placeholder-gray-500 tracking-wide min-h-[50px] text-gray-700" rows="2" placeholder="Tweet your reply" value={input} onChange={(e) => setInput(e.target.value)}></textarea>
              </div>
              <div className="flex items-center justify-between pt-2.5">
              
                <div className="flex">
                <div className="" 
                // onClick={() => filePickerRef.current.click()}
                >
                <PhotoIcon className='w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100'/>
      {/* <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} /> */}

                </div>
                  <FaceSmileIcon className='w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100'/>
                </div>
                <button onClick={sendComment} disabled={!input.trim()} className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'>Reply</button>
              
              </div>
              </div>
        
        </div>
         </div>
        </Modal>
      )}
    </div>
  )
}
