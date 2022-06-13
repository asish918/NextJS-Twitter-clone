import TimeAgo from 'react-timeago'
import { Comment, Tweet } from "../typings";
import {
    ChatAlt2Icon,
    HeartIcon,
    SwitchHorizontalIcon,
    UploadIcon
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments';
import { useState, useEffect } from 'react'

interface Props {
    tweet: Tweet
}

const Tweet = ({ tweet }: Props) => {
    const [comments, setComments] = useState<Comment[]>([]);

    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id)
        setComments(comments);
    }

    useEffect(() => {
        refreshComments();
    }, [])
    
    return (
        <div className='flex flex-col space-x-3 border-y p-5 border-gray-100'>
            <div className='flex space-x-3'>
                <img className='h-10 w-10 rounded-full object-cover' src={tweet.profileImage} alt='profile' />

                <div>
                    <div className='flex items-center space-x-1'>
                        <p className='mr-1 font-bold'>{tweet.username}</p>
                        <p className='hidden text-sm text-gray-500 sm:inline'>@{tweet.username.replace(/\s+/g, '').toLowerCase()} &#x2022; </p>

                        <TimeAgo
                            className='text-sm text-gray-500'
                            date={tweet._createdAt}
                        />
                    </div>

                    <p className='pt-1'>{tweet.text}</p>

                    {tweet.image && (
                        <img className='m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm' src={tweet.image} alt='content' />
                    )}
                </div>
            </div>

            <div className='flex justify-between mt-5'>
                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <ChatAlt2Icon className='h-5 w-5' />
                    <p>5</p>
                </div>

                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <SwitchHorizontalIcon className='h-5 w-5' />
                </div>

                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <HeartIcon className='h-5 w-5' />
                </div>

                <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
                    <UploadIcon className='h-5 w-5' />
                </div>
            </div>

            {comments.length > 0 && (
                <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5'>
                    {comments.map((comment) => (
                        <div key={comment._id} className='flex space-x-2'>
                            <hr className='absolute '/>
                            <img className='h-7 w-7 object-cover rounded-full' src={comment.profileImg} alt='comment-pic' />
                            <div>
                                <div className='flex items-center space-x-1'>
                                    <p className='mr-1 font-bold'>{comment.username}</p>
                                    <p className='hidden text-sm text-gray-500 lg:inline'>@{comment.username.replace(/\s+/g, '').toLowerCase()} &#x2022; </p>
                                    <TimeAgo
                                        className='text-sm text-gray-500'
                                        date={comment._createdAt}
                                    />
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Tweet;