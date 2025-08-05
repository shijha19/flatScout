import React, { useState } from 'react';
import ChatComponent from '../components/Chat';
import DebugConnections from '../components/DebugConnections';
import Layout from '../components/Layout';

const ChatPage = () => {
  const [showDebug, setShowDebug] = useState(false);

  return (
    <Layout>
      <div className="h-[calc(100vh-64px)]">
        {/* Debug toggle button */}
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="fixed top-20 right-4 z-50 bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
        >
          {showDebug ? 'Hide Debug' : 'Show Debug'}
        </button>
        
        {showDebug && <DebugConnections />}
        
        <ChatComponent />
      </div>
    </Layout>
  );
};

export default ChatPage;
