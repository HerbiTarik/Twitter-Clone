import { MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import News from './News';
import { useState } from "react";

export default function Widgets({newsResults}) {
    const [articleNum, setArticleNum] = useState(3);
  return (
    <div className="xl:w-[80%] lg:w-[30%] hidden lg:inline ml-10 space-y-5">
        <div className="xl:w-[70%] lg:w-[90%] sticky top-0 bg-white py-1.5 z-50">
            <div className="relative flex items-center p-3 rounded-full">
                <MagnifyingGlassIcon className="z-50 h-5 text-gray-500"/>
                <input type="text" placeholder="Search Twitter" className="absolute inset-0 w-full text-gray-700 bg-gray-100 border-gray-500 rounded-full pl-11 focus:shadow-lg focus:bg-white" />
            </div>
            </div>
            <div className="xl:w-[70%] lg:w-[90%] space-y-3 text-gray-700 bg-gray-100 rounded-xl pt-2">
                <h4 className="px-4 text-xl font-bold">What s happening</h4>
                {newsResults.slice(0,articleNum).map((article) => (
                    <News key={article.title} article={article} />
                    ))}
                    <button onClick={()=>setArticleNum(articleNum + 3)} className="pb-3 pl-4 text-blue-300 hover:text-blue-400">Show more</button>
            </div>
    </div>
  )
}
