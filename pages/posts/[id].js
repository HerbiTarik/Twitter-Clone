import Head from 'next/head'
import { Inter } from '@next/font/google'
import Sidebar from '@/../components/Sidebar'
import Widgets from '@/../components/Widgets'
import CommentModal from '@/../components/CommentModal'
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router'
import Post from './../../components/Post';
import { onSnapshot, doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import {db} from "@/firebase";

const inter = Inter({ subsets: ['latin'] })

export default function PostPage({newsResults, randomUserResults}) {
    const router = useRouter();
    const [post, setPost] = useState();
    const {id} = router.query;

    useEffect(() => onSnapshot(doc(db, "posts", id), (snapshot) => setPost(snapshot)), [db, id]);

  return (
    <div>
      <Head>
        <title>Post Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen mx-auto">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Feed */}
      <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[620px] lg:min-w-[620px] md:min-w-[620px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="sticky items-center space-x-2 top-0 z-50 flex px-3 py-2 bg-white border-b border-gray-200">
      <div className="hoverEffect" onClick={() => router.push("/")}>
        <ArrowLeftIcon className="h-5"/>
        </div>
        <h2 className="text-lg font-bold cursor-pointer sm:text-xl">Tweet</h2>
      </div>

      <Post id={id} post={post} />
    </div>

      {/* Widgets */}
      <Widgets newsResults={newsResults.articles} randomUserResults={randomUserResults.results} />
     
    
      {/* Modal */}
      <CommentModal />

      </main>
        
      
    </div>
  )
}

// https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

export async function getServerSideProps(){
  const newsResults = await fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json').then((res) => res.json());

  // Who to follow section

  const randomUserResults = await fetch('https://randomuser.me/api/?results=30&inc=name,login,picture')
  .then((res) => res.json());

  return {
    props:{
      newsResults,
      randomUserResults
    }
  }
}