import { useState } from "react"

export const useUserId = () => {
    const [userId, setUserId] = useState(() => localStorage.getItem("userId"));

    const saveUserId = (data) => {
        const stored = localStorage.setItem("userId", data);
        setUserId(stored);
    };

    const removeUserId = () => {
        localStorage.removeItem("userId");
        setUserId(null);
    }

    return {
        userId,
        saveUserId,
        removeUserId
    };
};