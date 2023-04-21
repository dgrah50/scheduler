import { ActivityFeed } from '~/components/index/ActivityFeed';
import { ProfileSection } from '~/components/index/ProfileSection';
import { MessageList } from '~/components/index/MessageList';
import { MessageComposer } from '~/components/messageComposer';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>GPT-HBD - Send Birthday Messages with AI</title>
      </Head>
      <div className="sticky top-0 flex flex-col">
        <div className="app-wrapper">
          <ProfileSection />
          <MessageList />
          <ActivityFeed />
        </div>
      </div>
      <MessageComposer />
    </>
  );
}
