import { ActivityFeed } from '~/components/index/ActivityFeed';
import { ProfileSection } from '~/components/index/ProfileSection';
import { MessageList } from '~/components/index/MessageList';
import { MessageComposer } from '~/components/messageComposer';

export default function Home() {
  return (
    <>
      {/* Background color split screen for large screens */}
      {/* <div className="fixed flex w-full flex-col lg:h-full"> */}
      {/* <Navbar /> */}

      {/* <div className="fixed left-0 top-0 col-span-5 h-full bg-white" aria-hidden="true" />
      <div className="fixed right-0 top-0 col-span-5 h-full bg-gray-50" aria-hidden="true" /> */}

      <div className="mx-auto flex min-h-screen max-w-7xl xl:grid xl:grid-cols-10">
        <ProfileSection />
        <main className="col-span-5">
          <MessageList />
        </main>
        <ActivityFeed />
      </div>
      <MessageComposer />
    </>
  );
}
