# Forex Trading Journal

A modern and feature-rich **Forex Trading Journal** web application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with **Google Sign-In authentication**, **private user journals**, and beautiful UI with animated particle background.

**screenshots**

<a href="https://postimg.cc/Zvd5TM21" target="_blank"><img src="https://i.postimg.cc/j28whVXd/screenshot-1.png" alt="screenshot-1"/></a><br/><br/>
<a href="https://postimg.cc/bs1wW4Qn" target="_blank"><img src="https://i.postimg.cc/MKFfMSH9/screenshot-2.png" alt="screenshot-2"/></a><br/><br/>
<a href="https://postimg.cc/75VYY7tY" target="_blank"><img src="https://i.postimg.cc/nL8s2Gv7/screenshot-3.png" alt="screenshot-3"/></a><br/><br/>
<a href="https://postimg.cc/HjqLST7H" target="_blank"><img src="https://i.postimg.cc/DyZbwZvW/Screenshot-4.png" alt="Screenshot-4"/></a><br/><br/>


---

## 🚀 Features

* 🔐 **Google Authentication** (Firebase)
* 📊 Add, Edit, Delete, Filter trades
* 📁 Export trade data to CSV
* 🌌 3D animated particle/starry background (Three.js / tsParticles)
* 🌗 Dark mode UI only
* 📈 Dashboard summary of your trades
* 🔒 User-specific data (only you can access your trades)
* ⚡ Smooth animations with Framer Motion

---

## 🛠 Tech Stack

* **Frontend:** React.js, Tailwind CSS, Framer Motion, tsParticles
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Authentication:** Firebase Google Auth
* **Hosting:** Vercel (Frontend) + Render (Backend)

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/forex-journal.git
cd forex-journal
```

### 2. Set up the Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run the server:

```bash
npm start
```

### 3. Set up the Frontend

```bash
cd ../client
npm install
```

Create `src/firebaseConfig.js` and paste your Firebase config there.
Run the app:

```bash
npm start
```

---

## 🔐 Environment & Secrets

> Ensure you never upload sensitive files:

Add this to your `.gitignore`:

```
# Server
/server/.env

# Firebase Config
/client/src/firebaseConfig.js
```

---

## 🌐 Live Demo

> [https://forex-journal.vercel.app](https://forex-journal.vercel.app) *(Replace with actual link once deployed)*

---

## ✨ Credits

**Made with** ❤️ **by [Arbind Pattnaik](mailto:arbindpattnaik1@gmail.com)**

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
