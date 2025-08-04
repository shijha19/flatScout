import React from 'react';
import ChatComponent from '../components/Chat';
import Layout from '../components/Layout';

const ChatPage = () => {
  return (
    <Layout>
      <div className="h-[calc(100vh-64px)]">
        <ChatComponent />
      </div>
    </Layout>
  );
};

export default ChatPage;
