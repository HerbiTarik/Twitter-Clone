import { SparklesIcon } from "@heroicons/react/24/outline";
import Input from "./Input";
import Post from "./Post";

export default function Feed() {
  const posts = [
    {
      id: "1",
      name: "Tarik Herbi",
      username: "clone-tiwitter",
      userImg: "https://images.unsplash.com/photo-1551617489-25aa9b1053c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZHJhZ29uJTIwYmFsbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60",
      text: "nice view!",
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      name: "Tarik Herbi",
      username: "clone-tiwitter",
      userImg: "https://images.unsplash.com/photo-1551617489-25aa9b1053c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8ZHJhZ29uJTIwYmFsbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
      img: "https://images.unsplash.com/photo-1675789358578-870c3b20d907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60",
      text: "wow",
      timestamp: "2 days ago"
    }
  ]
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[620px] lg:min-w-[620px] md:min-w-[620px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="sticky top-0 z-50 flex px-3 py-2 bg-white border-b border-gray-200">
        <h2 className="text-lg font-bold cursor-pointer sm:text-xl">Home</h2>
        <div className="flex items-center justify-center px-0 ml-auto hoverEffect w-9 h-9">
          <SparklesIcon className="h-5"/>
        </div>
      </div>
      <Input />
      {posts.map((post) => (
      <Post key={post.id} post={post}/>
  ))}
    </div>
  )
}
