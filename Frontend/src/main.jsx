import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import spinnerGif from './assets/spinner.gif'
import NotFound from './Components/NotFound.jsx'

// lazy components
const App = lazy(() => import("./App.jsx"))
const WelcomeImage = lazy(() => import("./Components/WelcomeImage.jsx"))
const ProductList = lazy(() => import("./Components/ProductList.jsx"))
const ProductDetail = lazy(() => import("./Components/ProductDetail.jsx"))
const Cart = lazy(() => import("./Components/Cart.jsx"));


// lazy fallback spinner
const spinner = (
  <div style={{ textAlign: 'center', padding: '2rem'}}>
    <img src={spinnerGif} alt="Loading..." width="80" />
  </div>
);

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={spinner}><App /></Suspense>,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <>
                   <Suspense fallback={spinner}>
                      <WelcomeImage />
                      <ProductList />
                   </Suspense>
                 </>
      },
        {
          path: '/productdetail/:id',
          element: <Suspense fallback={spinner}><ProductDetail /></Suspense>
        },
        {
          path: '/cart',
          element : <Suspense fallback={spinner}><Cart /></Suspense>
        }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={appRouter} />
  </StrictMode>
)

