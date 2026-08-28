import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { useToken } from "../../../hooks/useToken";
import { baseUrl } from "../../../utils/baseUrl";

import CardGrid from "../../../components/layout/CardGrid.jsx";
import PetsCard from "../../../components/layout/PetsCard.jsx";
import { toast } from "sonner";
import { refreshPage } from "../../../utils/refreshPage.jsx";

const MyAdoptions = () => {
    const { token } = useToken();
    const [adoptions, setAdoptions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdoptions = async () => {
            try {
                const res = await fetch(`${baseUrl}/pets/adoptions`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                if (res.ok) {
                    setAdoptions(data);
                } else {
                    toast.error(data.msg || "Erro ao carregar adoções");
                }
            } catch (err) {
                console.error(err);
                toast.error("Erro de conexão");
            }
        };

        fetchAdoptions();
    }, [token]);


    const handleConcludeAdoptions = async (id) => {
        fetch(`${baseUrl}/pets/conclude/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((data) => {
            toast.success(data.msg);
            refreshPage();
        }).catch((error) => {
            toast.error(error);
        })
    };

    return (
        <section className="px-6 md:p-0">
            <div className="relative container m-auto">
                <div className="my-8 py-4 overflow-hidden flex flex-wrap gap-6 justify-between items-center sticky top-22 z-40 bg-surface">
                    <h1 className="font-extrabold text-4xl">Minhas Adoções</h1>
                    <Link
                        to={"/"}
                        className="bg-primary hover:bg-highlight text-on-primary transition px-4 py-3 rounded-lg"
                    >
                        <span> Adotar um Pet </span>
                        <ArrowUpRight size={24} className="inline ml-1 mb-2" />
                    </Link>

                </div>

                <CardGrid>
                    {adoptions && adoptions.length > 0 ? (
                        adoptions.map((pet) => (
                            <PetsCard key={pet._id} pet={pet} route={`/pets/adoptions`}>
                                {pet.available &&
                                    <button type="button" onClick={() => { handleConcludeAdoptions(pet._id) }} className="px-3 py-2 bg-highlight hover:bg-primary transition text-on-primary rounded-lg">Concluir Adoção</button>
                                }
                            </PetsCard>
                        ))
                    ) : (
                        <p>Você ainda não adotou nenhum pet.</p>
                    )}
                </CardGrid>
            </div>
        </section>
    );
};

export default MyAdoptions;
