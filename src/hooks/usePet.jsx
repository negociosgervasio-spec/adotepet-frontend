import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "sonner";
import { baseUrl } from "../utils/baseUrl";


export const usePet = () => {
    const [pets, setPets] = useState({});
    const [userPets, setUserPets] = useState({});
    const [petStatus, setPetStatus] = useState("idle");

    console.log(pets, userPets);

    const { token } = useContext(AuthContext);


    useEffect(() => {
        async function getAll() {
            try {
                setPetStatus("loading"); // status correto antes da requisição

                const res = await fetch(`${baseUrl}/pets`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await res.json();
                console.log("GET ALL: ", data);

                if (!res.ok) {
                    setPetStatus("error");
                    toast.error(data.error || "Erro ao buscar pets");
                    return;
                }

                setPets(data);
                setPetStatus("success");
            } catch (error) {
                setPetStatus("error");
                toast.error(error.message || "Erro inesperado");
            }
        }

        getAll();
    }, []);

    useEffect(() => {
        fetch(`${baseUrl}/pets/mine`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((data) => {
            setUserPets(data);
            setPetStatus("success")
        }).catch((error) => {
            toast.error(error);
        });
    }, []);

    const register = async (pet) => {
        setPetStatus("loading");
        try {
            const res = await fetch(`${baseUrl}/pets/register`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`

                },
                body: pet
            });

            const data = await res.json()

            if (!res.ok) {
                setPetStatus("error");

                if ("errors" in data) {
                    toast.error(data.errors[0]);
                } else if ("msg" in data) {
                    toast.error(data.msg);
                }
                return;
            }
            setPetStatus("success")
            toast.success(data.msg);
        } catch (error) {
            toast.error(error);
        }
    };

    return {
        userPets,
        pets,
        register,
    }
};

