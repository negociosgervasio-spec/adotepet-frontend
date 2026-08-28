import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/pages/Home.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import Profile from "./components/pages/User/Profile.jsx";
import Login from "./components/pages/Auth/Login.jsx";
import Register from "./components/pages/Auth/Register.jsx";
import PetsMine from "./components/pages/Pet/PetsMine.jsx";
import PetRegister from "./components/pages/Pet/PetRegister.jsx";
import PetInfo from "./components/pages/Pet/PetInfo.jsx";
import PetMineInfo from "./components/pages/Pet/PetMineInfo.jsx";
import PetEdit from "./components/pages/Pet/PetEdit.jsx";
import MyAdoptions from "./components/pages/Pet/MyAdoptions.jsx";
import { Navigate, useLocation } from "react-router-dom";
import { useToken } from "./hooks/useToken.jsx";

// Componente de rota protegida
const PrivateRoute = ({ children }) => {
  const { token } = useToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "user/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/pets/mine",
        element: (
          <PrivateRoute>
            <PetsMine />
          </PrivateRoute>
        ),
      },
      {
        path: "/pets/register",
        element: (
          <PrivateRoute>
            <PetRegister />
          </PrivateRoute>
        ),
      },
      {
        path: "pets/:id",
        element: <PetInfo />,
      },
      {
        path: "pets/mine/:id",
        element: (
          <PrivateRoute>
            <PetMineInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "pets/edit/:id",
        element: (
          <PrivateRoute>
            <PetEdit />
          </PrivateRoute>
        ),
      },
      {
        path: "pets/adoptions",
        element: (
          <PrivateRoute>
            <MyAdoptions />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
