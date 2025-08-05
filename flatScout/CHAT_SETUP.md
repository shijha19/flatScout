# Chat Feature Setup Guide

## Prerequisites

The chat feature uses Stream Chat for real-time messaging. To enable it, you'll need to:

1. **Get Stream Chat API Keys**
   - Go to [getstream.io](https://getstream.io) and sign up for a free account
   - Create a new app in your dashboard
   - Copy your API Key and Secret

2. **Configure Backend Environment**
   Create a `.env` file in the `backend` folder with:
   ```env
   STREAM_API_KEY=your-stream-api-key
   STREAM_API_SECRET=your-stream-api-secret
   ```

3. **Configure Frontend Environment**
   Create a `.env` file in the `frontend` folder with:
   ```env
   VITE_STREAM_API_KEY=your-stream-api-key
   ```

## Features

- **Real-time messaging** between connected users
- **Direct messaging** with one-click conversation start
- **Message history** and conversation threads
- **User presence** indicators
- **Mobile-responsive** design

## How to Use

1. **Connect with Users**: First, send connection requests to other users through the flatmate finder
2. **Access Chat**: Click the message icon (💬) in the navbar
3. **Start Conversation**: Click on any connected user to start chatting
4. **View History**: All conversations are saved and accessible in the "Recent Chats" section

## Architecture

- **Backend**: Node.js with Stream Chat SDK for token generation and user management
- **Frontend**: React with Stream Chat React components
- **Real-time**: Stream Chat handles all real-time messaging infrastructure
- **Authentication**: Integrated with existing user authentication system

## Troubleshooting

- **API Key Error**: Make sure your `.env` files have the correct Stream API key
- **Connection Issues**: Verify both backend and frontend are running
- **No Connected Users**: Make sure you have accepted connection requests with other users

## Development Notes

- Stream Chat provides 100K MAU (Monthly Active Users) free tier
- All chat data is stored on Stream's infrastructure
- Messages are end-to-end encrypted by default
- Supports file uploads, reactions, and message threading
