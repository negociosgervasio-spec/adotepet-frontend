import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/pages/Home.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import Profile from "./components/pages/User/Profile.jsx";
import Login from "./components/pages/Auth/Login.jsx";
import Register from "./components/pages/Auth/Register.jsx";
import PetsMine from "./components/pages/Pet/PetsMine.jsx";
import PetRegister from "./components/pages/Pet/PetRegister.jsx";
import PetInfo from "./components/pages/Pet/PetInfo.jsx";
import PetMineInfo from "./components/pages/Pet/PetMineInfo.jsx";
import PetEdit from "./components/pages/Pet/PetEdit.jsx";
import MyAdoptions from "./components/pages/Pet/MyAdoptions.jsx";

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
        element: <Profile />
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/pets/mine",
        element: <PetsMine/>
      },
      {
        path: "/pets/register",
        element: <PetRegister/>
      },
      {
        path: "pets/:id",
        element: <PetInfo/>
      },
      {
        path: "pets/mine/:id",
        element: <PetMineInfo/>
      },
      {
        path: "pets/edit/:id",
        element: <PetEdit/>
      },
      {
        path: "pets/adoptions",
        element: <MyAdoptions/>
      }

    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
