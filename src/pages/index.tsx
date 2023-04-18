import { ActivityFeed } from '~/components/index/ActivityFeed';
import { ProfileSection } from '~/components/index/ProfileSection';
import { MessageList } from '~/components/index/MessageList';
import { MessageComposer } from '~/components/messageComposer';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>HBD-GPT - Send Birthday Messages with AI</title>
      </Head>
      {/* Background color split screen for large screens */}
      {/* <div className="fixed flex w-full flex-col lg:h-full"> */}

      {/* <div className="fixed left-0 top-0 col-span-5 h-full bg-white" aria-hidden="true" />
      <div className="fixed right-0 top-0 col-span-5 h-full bg-gray-50" aria-hidden="true" /> */}

      <div className="app-wrapper">
        <ProfileSection />
        <MessageList />
        <ActivityFeed />
      </div>
      <MessageComposer />
    </>
  );
}
