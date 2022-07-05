import { 
    BellIcon,
    HashtagIcon,
    BookmarkIcon,
    CollectionIcon,
    DotsCircleHorizontalIcon,
    MailIcon,
    UserIcon,
    HomeIcon
 } from '@heroicons/react/outline'
import assets from '../assets/assets'
import SidebarRow from './SidebarRow';
import { signIn, signOut, useSession } from 'next-auth/react';

const Sidebar = () => {

    const { data: session } = useSession();
    console.log(assets.logo)
    
    return (
        <div className='flex flex-col col-span-2 items-center px-4 md:items-start'>
            <img className='h-10 w-10 m-3' src={assets.logo.src} alt='twitter-logo' />
            <SidebarRow Icon={HomeIcon} title='Home'/>
            <SidebarRow Icon={HashtagIcon} title='Explore'/>
            <SidebarRow Icon={BellIcon} title='Notifications'/>
            <SidebarRow Icon={MailIcon} title='Messages'/>
            <SidebarRow Icon={BookmarkIcon} title='Bookmarks'/>
            <SidebarRow Icon={CollectionIcon} title='Lists'/>
            <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? 'Sign out' : 'Sign in'}/>
            <SidebarRow Icon={DotsCircleHorizontalIcon} title='More'/>
        </div>
    )
}

export default Sidebar;