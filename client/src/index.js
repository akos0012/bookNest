import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import Layout from "./Pages/Layout";
import HomePage from './Pages/Home';
import BookInfo from './Pages/Books/BookInfo';
import ErrorPage from './Pages/ErrorPage';
import BookList from './Pages/Books/BookList';
import AuthorList from './Pages/Authors/AuthorList';
import GenreList from './Pages/Genres/GenreList';
import BookCreator from './Pages/Books/BookCreator';
import BookUpdater from './Pages/Books/BookUpdater';
import AuthorCreator from './Pages/Authors/AuthorCreator';
import AuthorUpdater from './Pages/Authors/AuthorUpdater';
import GenreCreator from './Pages/Genres/GenreCreator';
import GenreUpdater from './Pages/Genres/GenreUpdater';
import BookFavorite from './Pages/Books/BookFavorite';
import UserRegister from './Pages/UserRegisters.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <HomePage />,
      },
      {
        path: '/favorites',
        element: <BookFavorite />
      },
      {
        path: '/book/:bookId',
        element: <BookInfo />,
      },
      {
        path: '/books',
        element: <BookList />
      },
      {
        path: '/authors',
        element: <AuthorList />
      },
      {
        path: '/genres',
        element: <GenreList />
      },
      {
        path: '/book/create',
        element: <BookCreator />
      },
      {
        path: '/book/update/:id',
        element: <BookUpdater />
      },
      {
        path: '/author/create',
        element: <AuthorCreator />
      },
      {
        path: '/author/update/:id',
        element: <AuthorUpdater />
      },
      {
        path: '/genre/create',
        element: <GenreCreator />
      },
      {
        path: '/genre/update/:id',
        element: <GenreUpdater />
      },
      {
        path: '/register',
        element: <UserRegister />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
