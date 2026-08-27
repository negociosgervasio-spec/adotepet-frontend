import { useState } from "react";

export const useToken = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const saveItem = (value) => {
    localStorage.setItem("token", value);
    setToken(value);
  };

  const removeItem = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, saveItem, removeItem };
};
