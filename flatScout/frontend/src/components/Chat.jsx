import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatComponent = () => {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connectedUsers, setConnectedUsers] = useState([]);

  // Function to create or get a direct message channel
  const createDirectChannel = async (otherUser) => {
    if (!client) return;

    try {
      // Sort IDs to ensure consistent channel ID
      const members = [client.userID, otherUser._id].sort();
      const channelId = `dm-${members.join('-')}`;

      const newChannel = client.channel('messaging', channelId, {
        members,
        name: `Chat with ${otherUser.name}`,
      });

      await newChannel.watch();
      setChannel(newChannel);
    } catch (error) {
      console.error('Error creating direct channel:', error);
      setError(error.message);
    }
  };
  
  useEffect(() => {
    const initChat = async () => {
      try {
        // Get user email from localStorage
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          throw new Error('User email not found in localStorage');
        }

        // Fetch user data from backend
        const userResponse = await fetch(`/api/user/by-email/${encodeURIComponent(userEmail)}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }

        const { user } = await userResponse.json();
        if (!user) {
          throw new Error('User not found');
        }

        console.log('User data:', user);

        // First get the token from our backend
        const response = await fetch('/api/chat/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'user': JSON.stringify(user)
          },
          body: JSON.stringify({ userId: user._id })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to get chat token');
        }

        const { token } = await response.json();
        console.log('Got token from backend');
        
        // Now connect to Stream Chat
        const chatClient = StreamChat.getInstance(STREAM_API_KEY);
        console.log('Initializing Stream Chat with API key:', STREAM_API_KEY);
        
        await chatClient.connectUser(
          {
            id: user._id,
            name: user.name || 'Anonymous',
            image: user.profilePicture || 'https://via.placeholder.com/150',
          },
          token
        );
        console.log('Connected to Stream Chat');

        // Create or get a channel
        const channel = chatClient.channel('messaging', 'general', {
          name: 'General Chat',
          members: [user._id],
        });
        
        await channel.watch();
        console.log('Channel created/watched');

        // Fetch connected users
        const connectionsResponse = await fetch(`/api/connection/connected-users/${user._id}`);
        if (!connectionsResponse.ok) {
          throw new Error('Failed to fetch connected users');
        }
        const { connectedUsers: connected } = await connectionsResponse.json();
        setConnectedUsers(connected);
        console.log('Fetched connected users:', connected);

        setChannel(channel);
        setClient(chatClient);
      } catch (error) {
        console.error('Error in chat initialization:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      const cleanup = async () => {
        if (client) {
          await client.disconnectUser();
          console.log('Disconnected from Stream Chat');
        }
      };
      cleanup();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600">Loading chat...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!client || !channel) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600">Initializing chat...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white">
      <Chat client={client} theme="messaging light">
        <div className="flex h-full">
          <div className="w-1/4 border-r border-gray-200 flex flex-col">
            {/* Connected Users Section */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2">Connected Users</h3>
              <div className="space-y-2">
                {connectedUsers.map(user => (
                  <div
                    key={user._id}
                    onClick={() => createDirectChannel(user)}
                    className="p-2 rounded hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                  >
                    <img
                      src={user.profilePicture || 'https://via.placeholder.com/32'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm text-gray-700">{user.name}</span>
                  </div>
                ))}
                {connectedUsers.length === 0 && (
                  <div className="text-sm text-gray-500 p-2">No connected users yet</div>
                )}
              </div>
            </div>

            {/* Channels List */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700">Recent Chats</h3>
              </div>
              <ChannelList
                filters={{
                  type: 'messaging',
                  members: { $in: [client.userID] }
                }}
                sort={{ last_message_at: -1 }}
                options={{ state: true, presence: true, limit: 10 }}
                List={({ loadedChannels }) => (
                  <div className="channel-list">
                    {loadedChannels?.length === 0 ? (
                      <div className="p-4 text-gray-500 text-sm">No conversations yet</div>
                    ) : (
                      loadedChannels?.map(ch => (
                        <div
                          key={ch.id}
                          onClick={() => setChannel(ch)}
                          className={`p-4 hover:bg-gray-100 cursor-pointer ${
                            ch.id === channel?.id ? 'bg-gray-100' : ''
                          }`}
                        >
                          <div className="font-medium text-gray-800">{ch.data.name}</div>
                          <div className="text-sm text-gray-500 truncate">
                            {ch.state.messages[ch.state.messages.length - 1]?.text || 'No messages yet'}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              />
            </div>
          </div>
          <div className="w-3/4">
            <Channel channel={channel}>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
};

export default ChatComponent;
