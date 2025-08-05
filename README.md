<!-- PROJECT LOGO -->
<p align="center">
  <img src="./client/public/logo.svg" alt="Logo" width="120">
</p>

<h1 align="center">DevFeed</h1>

<p align="center">
  <b>Where <span style="color:#F5F3B3">dev</span> connects</b><br>
  Meet, Share, and Grow Together 🚀
  <br />
  <a href="https://devfeed-e7sl.onrender.com/">View Live Demo</a>
  ·
  <a href="mailto:your.indrajeet.business01@gmail.com?subject=DevFeed%20Collaboration">Collaborate</a>
</p>

---

## ✨ About DevFeed

DevFeed is a modern, community-driven platform for developers to post updates, showcase projects, share ideas, and connect with fellow coders. Whether you're just starting out or a seasoned pro, join to grow and collaborate in a healthy, constructive environment.

### Key Features

- 💬 **Post & Share:** Express your ideas, projects, or tips with the dev community.
- 🖼️ **Drag & Drop Upload:** Instantly upload images, screenshots, or designs to your posts.
- 🤝 **Connect:** Follow others, build a network, and interact through likes and comments.
- 🔖 **Tags & Explore:** Easy categorization and discovery of trending topics.
- ✏️ **Edit & Delete:** Full control of your posts and comments.
- 🔒 **Privacy:** Only you can edit or delete your content; robust user authentication.
- ⚡ **Real-time notifications:** Toast notifications for instant feedback.

---

## 🚀 Live Demo

- Hosted at: [https://devfeed-e7sl.onrender.com/](https://devfeed-e7sl.onrender.com/)

---

## 🏗️ Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, react-toastify
- **Backend:** Node.js, Express, MongoDB, Cloudinary for media uploads
- **Auth:** JWT-based authentication, bcrypt password security

---

## 🧩 How DevFeed Works

### User Journey

1. **Sign Up / Log In** (email, username, password auth)
2. **Create/Edit Profile:** Add avatar, skills, and social links.
3. **Share Posts:** (Text, tags, images), comment and interact.
4. **Edit/Delete** your posts/comments with intuitive UI controls.
5. **Like/Comment:** Socially engage with other's content.

### Core Project Structure

| Path                | Component                    | Description                              |
|---------------------|-----------------------------|------------------------------------------|
| `/`                 | Home                        | Landing page and onboarding              |
| `/signup`, `/login` | Signup/Login                | Authentication flows                     |
| `/dashboard`        | Dashboard                   | Personalized feed + shortcuts            |
| `/posts`            | Posts                       | Explore all community posts              |
| `/create`           | Create                      | New post with drag & drop image upload   |
| `/mine`             | MyPosts                     | Manage your posted content               |
| `/edit`             | EditProfile                 | Customize your public profile            |
| `/about`, `/contact`| About/Contact               | Platform info, contact for support       |


### Backend API Highlights

Posts API: CRUD endpoints for posts (create, read, update, delete)

Comment API: Add, edit, or delete comments on posts

Like API: Toggle likes per post (one like per user/post)

User API: Profile update with avatar (using Cloudinary upload)

Secure REST: All user actions require JWT authentication


## ⚙️ Setup & Installation
```
git clone https://github.com/yourname/devfeed.git
cd devfeed
npm install
```
Create .env and configure your MongoDB, JWT, and Cloudinary details.

Start dev servers for frontend and backend.


## 🤝 Collaboration
Open for contributors and feedback!

Want to build features, fix bugs, or propose new ideas?
Reach me at: indrajeet.business01@gmail.com

Fork the repository

Create your branch (git checkout -b feature/awesome-feature)

Commit & push your changes, open a Pull Request