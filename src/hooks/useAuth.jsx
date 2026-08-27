import { useState, useEffect, useContext } from "react";

import { useToken } from "./useToken";

import { toast } from "sonner";

import { AuthContext } from "../context/AuthProvider";

const BASE_URL = import.meta.env.VITE_API_URL

function useAuth() {
    const [status, setStatus] = useState("idle");
    const [user, setUser] = useState({});

    useEffect(() => {
        console.log("Status mudou", status);
    }, [status]);

    const { saveItem } = useToken();

    const { token } = useContext(AuthContext);

    useEffect(() => {

        const loadProfile = async () => {
            setStatus("loading");
            try {
                const res = await fetch(`${BASE_URL}/users/profile`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }

                });

                const data = await res.json();

                if (res.ok) {
                    setStatus("success");
                    setUser(data.user);
                    console.log(data.user);
                } else {
                    setStatus("error");
                    console.error(data);
                    toast.error(data.msg);
                }
            } catch (error) {
                console.error(error);
                setStatus("error");
                toast.error(error, "error");
            }
        };
        if (token) {
            loadProfile();
        }
    }, [token]);

    async function editUserById(id, data) {
        setStatus("loading");
        try {
            const res = await fetch(`${BASE_URL}/users/edit/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                    // NÃO coloque Content-Type aqui
                },
                body: data // data precisa ser um FormData
            });

            const payload = await res.json();

            if (!res.ok) {
                setStatus("error");

                if ("errors" in payload) {
                    toast.error(payload.errors[0].msg);
                } else if ("msg" in payload) {
                    toast.error(payload.msg);
                }
                return false;
            }

            setStatus("success");
            toast.success(payload.msg);

            return true;

        } catch (error) {
            console.error(error);
            setStatus("error");
            toast.error(error.message || "Erro inesperado");
        }
    }

    return {
        status,
        user,
        editUserById
    }
};

export default useAuth;


