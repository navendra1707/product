import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Products from "./pages/Products";
import Compare from "./pages/Compare";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Products />
      },
      {
        path: 'compare',
        element: <Compare />,
      },
    ],
  },
])

export default router;