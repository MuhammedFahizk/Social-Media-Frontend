# Chat Hive

This is the frontend of Chat Hive, a social media platform built using the MERN stack, offering users a dynamic and interactive experience with features like real-time notifications, messaging, image posting, blogs, and stories. The project uses Vite for fast development and builds, and it incorporates a modern tech stack with various libraries for a smooth user interface.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Scripts](#scripts)
- [Routes](#routes)
- [License](#license)

## Demo

You can check out the live demo here: [Demo Link](#https://chathivemedia.vercel.app/) 

**Note:** The project is currently in the deployment stage.

## Features

- **Authentication**: Secure login and signup for both users and admins.
- **Real-Time Messaging**: Chat with other users instantly using Socket.IO.
- **Notifications**: Get real-time notifications for posts, messages, and other events.
- **Image Upload and Crop**: Post images with cropping functionality.
- **Story Feature**: Users can upload stories that are viewable by others for a limited time.
- **Blogs**: Create and read blogs, with admin controls over the content.
- **Admin Dashboard**: Manage users, posts, and reports with admin access.
- **Dark Mode**: Toggle between light and dark themes for better user experience.

## Tech Stack

- **React**: ^18.3.1
- **Vite**: ^5.3.1
- **Redux Toolkit**: ^2.2.6 for state management
- **Socket.IO Client**: ^4.7.5 for real-time features
- **Tailwind CSS**: ^3.4.4 for styling
- **Ant Design**: ^5.18.3 for UI components
- **Axios**: ^1.7.2 for API requests
- **React Router DOM**: ^6.24.0 for routing
- **Chart.js** and **D3.js**: For data visualization
- **react-toastify**: For displaying notifications

## Scripts

- **Start Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Lint Code**: `npm run lint`
- **Preview Production Build**: `npm run preview`

## Routes

Here's an overview of the application's routes:
- **Admin Routes**:
  - `/admin`: Admin dashboard (protected)
  - `/admin/users`: Manage users
  - `/admin/posts`: Manage posts
  - `/admin/reports`: View reports
  - `/admin/user/:id`: View details of a specific user
  - `/admin/blog/:id`: View a specific blog as an admin
  - `/admin/notification`: Admin notifications
  - `/admin/login`: Admin login page

- **User Routes**:
  - `/`: Home page (protected)
  - `/login`: User login page
  - `/signUp`: User sign up page
  - `/profile`: View user's profile (protected)
  - `/addPost`: Create a new post (protected)
  - `/search`: Search for users or posts (protected)
  - `/profile/:id`: View a specific user's profile
  - `/editPost/:id`: Edit a specific post
  - `/blog/:id`: View a specific blog
  - `/messages`: Messaging page (protected)
  - `/stories/:userName/:storyId`: View a specific story
  - `/profile-settings`: Edit profile settings (protected)
    - `/profile-settings/password`: Change password
    - `/profile-settings/hide-posts`: List Hide  posts
    - `/profile-settings/hide-users`: List Hide  users

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
