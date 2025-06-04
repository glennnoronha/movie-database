import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import NotFoundPage from "./NotFoundPage.jsx";
import MovieInfo from "./MovieInfo.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      loader: () => {
        window.scrollTo(0, 0);
        return null;
      },
    },
    {
      path: "/movie/:id",
      element: <MovieInfo />,
      loader: () => {
        window.scrollTo(0, 0);
        return null;
      },
    },
    { path: "*", element: <NotFoundPage /> },
  ],
  {
    scrollRestoration: "manual",
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
