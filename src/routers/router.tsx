import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../components/pages/login/LoginPage"
import ErrorPage from "../components/pages/error/ErrorPage"
import OrderPage from "../components/pages/order/OrderPage"

const routes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/order/:username",
    element: <OrderPage />,
  },
  {
    path: "*", // "catch-all" route
    element: <ErrorPage />,
  },
]

export const router = createBrowserRouter(routes)
