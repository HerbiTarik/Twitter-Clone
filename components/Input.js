import {FaceSmileIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {useSession, signOut} from "next-auth/react"
import { useState, useRef } from 'react';
import {db, storage} from "../firebase";
import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { getDownloadURL, uploadString, ref  } from 'firebase/storage';


export default function Input() {
  const {data: session} = useSession();
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  }

  const sendPost = async () => {

    if(loading) return ;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
       id:session.user.uid,
       text:input,
       userImg: session.user.image,
       timestamp: serverTimestamp(),
       name: session.user.name,
       username: session.user.username
    });
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if(selectedFile){
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        })
      })
    }
    setInput("");
    setSelectedFile(null);
    setLoading(false);
  }


  return (
    <>
    {session && (
      <div className='flex p-3 space-x-3 border-b border-gray-200 '>
      <img
      onClick={signOut}
      src={session.user.image}
      alt="picture of tarik"
      className='rounded-full cursor-pointer h-11 w-11 hover:brightness-95'
      />
      <div className="w-full divide-y divide-gray-200">
      <div className="">
          <textarea className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700" rows="2" placeholder="what's happening?" value={input} onChange={(e) => setInput(e.target.value)}></textarea>
        </div>
        {selectedFile && (
          <div className="relative">
            <XMarkIcon className='absolute m-1 text-black border border-white rounded-full shadow-md cursor-pointer h-7' onClick={() => setSelectedFile(null)}/>
            <img src={selectedFile} className={`${loading && "animate-pulse"}`} />
          </div>
        )}
        <div className="flex items-center justify-between pt-2.5">
        {!loading && (
          <>
          <div className="flex">
          <div className="" onClick={() => filePickerRef.current.click()}>
          <PhotoIcon className='w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100'/>
          <input type="file" hidden ref={filePickerRef} onChange={addImageToPost} />
          </div>
            <FaceSmileIcon className='w-10 h-10 p-2 hoverEffect text-sky-500 hover:bg-sky-100'/>
          </div>
          <button onClick={sendPost} disabled={!input.trim()} className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50'>Tweet</button>
        
          </>
        )}
          </div>
        </div>
        
        </div>
        )}
        </>
  )
}
