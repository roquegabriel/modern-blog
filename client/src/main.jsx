import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Home from './pages/HomePage.jsx'
import Blogs from './pages/BlogsPage.jsx'
import About from './pages/AboutPage.jsx'
import Services from './pages/ServicesPage.jsx'
import Contact from './pages/ContactPage.jsx'
import CreateBlogPage from './pages/CreateBlogPage.jsx'
import EditBlogPage from './pages/EditBlogPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import { UserContextProvider } from './contexts/UserContext.jsx'
import PostPage from './pages/PostPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/blogs',
        element: <Blogs />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/services',
        element: <Services />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/create-post',
        element: <CreateBlogPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignupPage />
      },
      {
        path: '/post/:id',
        element: <PostPage />
      },
      {
        path: '/edit-post/:id',
        element: <EditBlogPage />
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>,
)
