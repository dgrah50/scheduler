import { ProfileSection, MessageList, ActivityFeed } from '~/components/index';

export default function Home() {
  return (
    <>
      {/* Background color split screen for large screens */}
      <div className="fixed top-0 left-0 h-full w-1/2 bg-white" aria-hidden="true" />
      <div className="fixed top-0 right-0 h-full w-1/2 bg-gray-50" aria-hidden="true" />
      <div className="relative flex flex-col lg:h-full">
        {/* <Navbar /> */}
        <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
          <div className="min-w-0 flex-1 bg-white lg:h-screen xl:flex">
            <ProfileSection />
            <MessageList />
          </div>
          <ActivityFeed />
        </div>
      </div>
    </>
  );
}
