import {getProviders, signIn } from "next-auth/react";
export default function Signin({providers}) {
  return (
    <div className="flex justify-center mt-20 space-x-4">
        <img src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-02/ch-2-7-app-store.png.twimg.1920.png" alt="twitter image inside a phone" className="hidden object-cover md:w-44 md:h-80 rotate-6 md:inline-flex"/>
        <div className="">
            {Object.values(providers).map((provider) => (
                <div key={provider.name} className="flex flex-col items-center">
                    <img className="object-cover w-36 " src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" alt="twitter logo" />
                    <p className="my-10 text-sm italic text-center ">This app is created for learning purposes</p>
                    <button onClick={() => signIn(provider.id, {callbackUrl: "/"})} className="p-3 text-white bg-red-400 rounded-lg hover:bg-red-500">Sign in with {provider.name}</button>
                </div>
            ))}
        </div>
    
    </div>
  )
}


export async function getServerSideProps(){
    const providers = await getProviders();
    return {
        props:{
            providers,
        }
    }
}