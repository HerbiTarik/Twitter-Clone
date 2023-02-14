import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import Post from "./Post";
import { useState, useEffect } from 'react';
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { db } from "@/firebase";
import { AnimatePresence, motion } from "framer-motion";

export default function Feed() {
  const [posts,setPosts] = useState([]);

  useEffect(() => 
   onSnapshot(query(collection(db, "posts"), orderBy('timestamp', 'desc')), (snapshot) => {setPosts(snapshot.docs)}
   ), [])
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[620px] lg:min-w-[620px] md:min-w-[620px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="sticky top-0 z-50 flex px-3 py-2 bg-white border-b border-gray-200">
        <h2 className="text-lg font-bold cursor-pointer sm:text-xl">Home</h2>
        <div className="flex items-center justify-center px-0 ml-auto hoverEffect w-9 h-9">
          <SparklesIcon className="h-5"/>
        </div>
      </div>
      <Input />
      <AnimatePresence>
      {posts.map((post) => (
        <motion.div key={post.id} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}}>
        <Post key={post.id} post={post}/>
        </motion.div>
      ))}
      </AnimatePresence>
    </div>
  )
}
