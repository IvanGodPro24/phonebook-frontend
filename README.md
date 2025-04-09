The **Phonebook** app is a user-friendly contact book that allows users to store, edit, delete, and filter contacts. The project is built using **React** on the frontend and works with a backend API.

## 🚀 Features

- User registration and login
- Add new contact
- Delete and edit existing contacts
- Filter contacts by name

## 🛠️ Technologies

- React
- Redux Toolkit
- React Router
- Axios

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/IvanGodPro24/phonebook-frontend.git
cd phonebook-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the project:

```bash
npm run dev
```

## 🌐 API

> Make sure the server is running and the API is available. Default base URL:

```
https://blended-contacts-app.onrender.com
```

Endpoints:

- `POST /users/signup` — register
- `POST /users/login` — login
- `GET /users/current` — get current user
- `POST /users/logout` — logout
- `GET /contacts` — list contacts
- `POST /contacts` — create contact
- `DELETE /contacts/:id` — delete contact

## 📁 Project Structure

```bash
src/
├── components/        # UI components
├── redux/             # Redux logic
│   └── auth/
│   └── contacts/
├── pages/             # Pages
├── App.tsx
└── main.tsx
```
