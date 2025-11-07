# 🛒 Nexora – E-commerce Application

It is a fully functional, responsive e-commerce web application built with React. It demonstrates real-world e-commerce functionalities such as product browsing, detailed views, cart management, and checkout routing. This project adheres to modern development standards and emphasizes component reusability, Redux state management, routing, and performance optimizations.

# GitHub: https://github.com/akbansal765/nexora-project

# LOOM Video: https://www.loom.com/share/9b328f4d5b194008b5c91300b9a7acce

---

## 📌 Project Objective

To build a basic e-commerce application that simulates a real-world online shopping experience, incorporating core React concepts such as:

- Component-based architecture
- State management using Redux
- Data fetching with `useEffect` and thunk middleware
- Event handling
- React routing
- Responsive styling
- Lazy loading for performance optimization

---

## 🔧 Tech Stack

- **Frontend**: React, React Router, Redux, JavaScript
- **State Management**: Redux Toolkit
- **Data Fetching**: REST API (`https://dummyjson.com/products`)
- **Styling**: CSS
- **Performance Optimization**: React Lazy & Suspense

---

## 🚀 Features

### ✅ Component Structure & Props
- Modular and reusable components.
- Props and PropTypes used for component communication and validation.

### 🔄 Data Fetching (with Error Handling)
- Fetched product list from API using `useEffect` and a custom hook.
- Fetch product details dynamically based on route parameters.
- Error messages gracefully shown on failed API calls.

### 🛍️ State Management (Redux)
- Global state for cart managed using Redux Toolkit.
- Actions and reducers for:
  - Adding/removing items from the cart
  - Modifying item quantities
- Selectors used for clean access to store state.
- Product search filter implemented in Redux.

### ⚡ Performance Optimization
- Code splitting using `React.lazy()` and `Suspense` for lazy loading components.

### 💅 Styling
- Responsive CSS layout
- Mobile-friendly user interface

---

## Folder Structure

src/
├── assets/
│   ├── cart.png
│   ├── spinner.gif
│   ├── welcomeImage.jpg
|
├── Components/
│   ├── Header.jsx
│   ├── ProductList.jsx
│   ├── ProductItem.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── CartItem.jsx
│   ├── Footer.jsx
│   ├── WelcomeImage.jsx
│   └── NotFound.jsx
|
├── CSS/
│   
├── utils/
│   └── cartSlice.js
│   └── store.js
│   └── useFetch.js
|
├── App.jsx
├── index.css
├── main.jsx

## How to Run this Application

--- FRONTEND

1. npm install
2. npm run dev

--- BACKEND

1. npm install
2. npm start