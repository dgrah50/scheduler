import { ActivityFeed } from '~/components/index/ActivityFeed';
import { ProfileSection } from '~/components/index/ProfileSection';
import { MessageList } from '~/components/index/MessageList';
import { MessageComposer } from '~/components/messageComposer';

export default function Home() {
  return (
    <>
      {/* Background color split screen for large screens */}
      <div className="fixed left-0 top-0 h-full w-1/2 bg-white" aria-hidden="true" />
      <div className="fixed right-0 top-0 h-full w-1/2 bg-gray-50" aria-hidden="true" />
      <div className="relative flex flex-col lg:h-full">
        {/* <Navbar /> */}
        <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
          <div className="min-w-0 flex-1 bg-white lg:h-screen xl:flex">
            <ProfileSection />
            <MessageList />
            <MessageComposer />
          </div>
          <ActivityFeed />
        </div>
      </div>
    </>
  );
}
