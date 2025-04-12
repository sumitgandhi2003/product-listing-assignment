import "./App.css";
import { createBrowserRouter, Outlet } from "react-router-dom";

import ProductContainer from "./productContainer";
import ProductDetailPage from "./ProductDetailPage";
import Navbar from "./Navbar";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductContainer />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
    ],
  },
]);

export default App;
