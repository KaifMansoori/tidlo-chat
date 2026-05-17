# ✨ Tidlo - Premium Real-time Chat Platform ✨

Tidlo is a modern, Apple-inspired full-stack chat application built with the MERN stack. It features a sleek glassmorphic UI, real-time messaging capabilities, and a comprehensive friend management system.

## 🌟 Key Features

- **Apple-Inspired Design:** Clean, modern, and minimalist glassmorphic interface with rounded corners, premium spacing, and the "Moirai One" font for branding.
- **Authentication & Security:** Secure JWT-based authentication and authorization.
- **Real-time Messaging:** Instant message delivery and real-time online status updates powered by Socket.io.
- **Friend Management:** Add, remove, and manage friends seamlessly.
- **Media Support:** Profile picture and image sharing integrated with Cloudinary.
- **State Management:** Efficient global state management using Zustand.
- **Responsive UI:** Fully responsive design built with Tailwind CSS and Daisy UI.
- **Robust Error Handling:** Comprehensive error handling on both client and server sides.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Zustand, Tailwind CSS, Daisy UI
- **Backend:** Node.js, Express.js, Socket.io
- **Database:** MongoDB
- **Cloud Storage:** Cloudinary (for image uploads)

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and npm installed on your machine.

### Environment Setup

Create a `.env` file in the `backend` directory with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```

### Installation

1. Clone the repository:
   ```shell
   git clone https://github.com/KaifMansoori/tidlo-chat.git
   cd tidlo-chat
   ```

2. Install dependencies and build the app:
   ```shell
   npm run build
   ```
   *(This script will automatically install both frontend and backend dependencies and build the frontend).*

3. Start the application:
   ```shell
   npm start
   ```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is licensed under the ISC License.
