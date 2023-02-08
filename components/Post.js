import { ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Post({post}) {
  return (
    <div className="flex p-3 border-b border-gray-200 cursor-pointer ">
      {/* user image */}
      <img src={post.userImg} alt="user-img" className="mr-4 rounded-full h-11 w-11"/>
      {/* right side */}
        <div className="w-full">
          {/* header */}
            <div className="flex items-center justify-between">
              {/* post user info */}
              <div className="flex items-center space-x-1 whitespace-nowrap">
                <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post.name}</h4>
                <span className="text-sm sm:text-[15px]">@{post.username} - </span>
                <span className="text-sm sm:[15px] hover:under
                ">{post.timestamp}</span>
              </div>
              {/* dot icon*/}
              <EllipsisHorizontalIcon className="w-10 h-10 p-2 hoverEffect hover:bg-sky-100 hover:text-sky-500"/>
            </div>

          {/*post text*/}
          <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{post.text}</p>

          {/*post image*/}
          <img className="w-full  rounded-2xl" src={post.img} alt="" />

          {/*icons*/}
          <div className="flex justify-between p-2 text-gray-500">
          <ChatBubbleOvalLeftEllipsisIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100"/>
          <TrashIcon className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100"/>
          <HeartIcon className="p-2 h-9 w-9 hoverEffect hover:text-red-600 hover:bg-red-100"/>
          <ShareIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100"/>
          <ChartBarIcon className="p-2 h-9 w-9 hoverEffect hover:text-sky-500 hover:bg-sky-100"/>


          </div>
        </div>
    </div>
  )
}
