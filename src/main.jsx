import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App, { router } from "./Component/App.jsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./Context/themeContext.jsx";
import { WishlistProvider } from "./Context/wishListContext.jsx";
router;
RouterProvider;
ThemeProvider;

createRoot(document.getElementById("root")).render(
  // <RouterProvider router={router}>
  // <StrictMode>
  <ThemeProvider>
    <WishlistProvider>
      <RouterProvider router={router} />
    </WishlistProvider>
  </ThemeProvider>
  // {/* <App /> */}
  // </StrictMode>
  // <App />
  // </RouterProvider>
);
