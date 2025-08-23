# The **Phonebook** App

User-friendly contact book that allows users to store, edit, delete, and filter contacts. The project is built with **React + TypeScript** on the frontend and works with a backend API (**Express + MongoDB**).

---

## 🚀 Features

- 🔐 **User authentication**: register, login, logout, token refresh
- 📇 **Manage contacts**:
  - Add new contacts with photo upload
  - Edit existing contacts
  - Delete contacts
- 🔎 **Filter contacts** by contact fields
- 🖼️ **Cloudinary integration** for secure image storage
- ⚡ **Error handling**: validation and API-based error responses (e.g., preventing duplicates)

---

## 🛠️ Technologies

**Frontend**:

- React (with Vite)
- TypeScript
- Redux Toolkit
- React Router
- Axios
- TailwindCSS

**Backend**:

- Node.js / Express
- MongoDB + Mongoose
- Cloudinary (for photos)
- Session-based authentication

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/IvanGodPro24/phonebook-frontend.git
```

2. Navigate to the project directory:

```bash
cd phonebook-frontend
```

3. Install dependencies:

```bash
npm install
```

4. Run the project:

```bash
npm run dev
```

## 🌐 API

> Base URL (Render deployment):

````
https://phonebook-backend-n8t6.onrender.com
````

## 📁 Project Structure

```bash
src/
├── components/        # UI components (forms, contact list, etc.)
├── redux/             # Redux logic
│   └── auth/          # Auth slice
│   └── contacts/      # Contacts slice
│   └── filters/       # Filters slice
├── pages/             # Application pages (Login, Register, Contacts)
├── utils/             # Helper functions
├── App.tsx
└── main.tsx
```
