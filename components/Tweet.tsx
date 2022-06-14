import TimeAgo from 'react-timeago'
import { Comment, CommentBody, Tweet } from "../typings";
import {
    ChatAlt2Icon,
    HeartIcon,
    SwitchHorizontalIcon,
    UploadIcon
} from '@heroicons/react/outline'
import { fetchComments } from '../utils/fetchComments';
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Props {
    tweet: Tweet
}

const Tweet = ({ tweet }: Props) => {
    const [comments, setComments] = useState<Comment[]>([]);

    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');

    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id)
        setComments(comments);
    }

    const {data: session } = useSession()

    const postComment = async () => {
        const commentBody: CommentBody = {
            comment: input,
            username: session?.user?.name || "Unkown User",
            profileImg: session?.user?.image || 'https://picsum.photos/200/200',
            tweetId: tweet._id
        }

        const result = await fetch(`/api/addComments`, {
            body: JSON.stringify(commentBody),
            method: 'POST'
        })

        const json = await result.json();

        refreshComments();  
        
        toast('Comment Posted', {
            icon: '🗒'
        })

        return json
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        postComment();
        setInput('');
        setCommentBoxVisible(false);
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
                <div className='flex items-center space-x-3 text-gray-400'>
                    <ChatAlt2Icon onClick={() => session && setCommentBoxVisible(!commentBoxVisible)} className='h-5 w-5 cursor-pointer' />
                    <p>{comments.length}</p>
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

            {commentBoxVisible && (
                <form onSubmit={handleSubmit} className='mt-3 flex space-x-3'>
                    <input value={input} onChange={(e) => setInput(e.target.value)} className='flex-1 rounded-lg bg-gray-100 p-2 outline-none' type='text' placeholder='Write a comment...' />
                    <button type='submit' disabled={!input} className='text-twitter disabled:text-gray-200'>Post</button>
                </form>
            )}

            {comments.length > 0 && (
                <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5'>
                    {comments.map((comment) => (
                        <div key={comment._id} className='relative flex space-x-2'>
                            <hr className='absolute left-5 top-10 h-8 border-x border-twitter/30'/>
                            <img className='mt-2 h-7 w-7 object-cover rounded-full' src={comment.profileImg} alt='comment-pic' />
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