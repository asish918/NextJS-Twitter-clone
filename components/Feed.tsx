import React from "react";
import { RefreshIcon } from '@heroicons/react/outline'
import Tweetbox from "./Tweetbox";
import { Tweet } from "../typings";
import TweetComponent from './Tweet'
import { fetchTweets } from "../utils/fetchTweets";
import { useState } from 'react'
import toast from "react-hot-toast";

interface Props {
    tweets: Tweet[]
}

const Feed = ({ tweets: TweetsProp }: Props) => {
    const [tweets, setTweets] = useState<Tweet[]>(TweetsProp);
    
    const handleRefresh =async () => {
        const refreshToast = toast.loading("Refreshing....")
        
        const tweets = await fetchTweets();
        setTweets(tweets);

        toast.success("Feed Updated!!", {
            id: refreshToast
        })
    }
    
    return (
        <div className="col-span-7 lg:col-span-5 border-x">
            <div className="flex justify-between items-center">
                <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
                <RefreshIcon className="h-8 w-8 cursor-pointer text-twitter mr-5 mt-5 transition-all duration-500 ease-out hover:rotate-180 active:scale-125" onClick={handleRefresh}/>
            </div>

            {/* Tweetbox */}
            <div>
                <Tweetbox setTweets={setTweets}/>
            </div>

            {/* Feed */}
            <div>
                {tweets.map((tweet) => (
                    <TweetComponent key={tweet._id} tweet={tweet} />
                ))}
            </div>
        </div>
    )
}

export default Feed;