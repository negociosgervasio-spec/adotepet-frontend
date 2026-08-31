import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
import { toast } from "sonner";
import { Balloon, Heart, HeartHandshakeIcon, Loader, Paintbrush, Weight } from "lucide-react";

import { useToken } from "../../../hooks/useToken";
import PetImages from "../../layout/PetImages";

const PetInfo = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null); // começa como null

    const [previewIndex, setPreviewIndex] = useState(0);
    const [fade, setFade] = useState(false);

    const { token } = useToken();

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${baseUrl}/pets/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Erro ao buscar pet");
            })
            .then((data) => {
                setPet(data);
                console.log("PET: ", data);
            })
            .catch((error) => {
                toast.error(error.message || "Erro inesperado");
            });
    }, [id]);

    const adoptAPet = async (id) => {
        setLoading(true);
        if (!token) {
            return navigate("/register");
        }
        setLoading(true);
        fetch(`${baseUrl}/pets/schedule/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,

            }
        }).then((res) => {
            setLoading(false);
            return res.json();
        }).then((data) => {
            toast.info(data.msg);
            navigate(`/pets/adoptions`);
        }).catch((error) => {
            setLoading(false);
            toast.error(error);
        })
    };

    if (!pet) {
        return (
            <div className="flex items-center gap-8 h-screen place-items-center">
                <Loader size={32} className="animate-spin" />
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <section className="mb-12 mx-6">
            <div className="container m-auto">
                <nav className='py-8 sticky top-20 left-0 right-0 bg-surface'>
                    <ul className='flex items-center gap-3 text-xs'>
                        <li>
                            <Link to="/" className='hover:text-highlight transition'>Adotar</Link>
                            <span className='inline ml-1'>/</span>
                        </li>
                        <li>
                            <Link to="/pets/mine" className='hover:text-highlight transition'>Pets</Link>
                            <span className='inline ml-1'>/</span>
                        </li>
                        <li>
                            <strong className='text-primary'>{pet.name}</strong>
                        </li>
                    </ul>
                </nav>

                <article className="flex flex-col gap-8">
                   <PetImages pet={pet}/>

                    <span className="">
                        <h4 className="text-2xl font-extrabold">{pet.name}</h4>
                        <span className="bg-accent/5 text-accent px-3 py-2 block mt-1 w-max rounded-full text-sm">{pet.available ? "Disponível para Adoção" : "Em processo"}</span>
                    </span>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-6 p-6 rounded-lg border border-muted/50 bg-card">
                            <span className="flex items-center gap-1 text-muted/75">
                                <Balloon size={24} />
                                <p className="mr-3 text-sm">Idade</p>
                            </span>
                            <strong className="text-lg font-extrabold">{pet.age} anos</strong>
                        </div>

                        <div className="flex flex-col gap-6 p-6 rounded-lg border border-muted/50 bg-card">
                            <span className="flex items-center gap-1 text-muted/75">
                                <Paintbrush size={24} />
                                <p className="mr-3 text-sm">Cor</p>
                            </span>
                            <strong className="text-lg font-extrabold">{pet.color}</strong>
                        </div>

                        <div className="flex flex-col gap-6 p-6 rounded-lg border border-muted/50 bg-card">
                            <span className="flex items-center gap-1 text-muted/75">
                                <Weight size={24} />
                                <p className="mr-3 text-sm">Peso</p>
                            </span>
                            <strong className="text-lg font-extrabold">{pet.weight}</strong>
                        </div>


                        {pet.available && (
                            <div className="flex flex-col gap-6 p-6 rounded-lg border border-muted/50 bg-card">
                                <span className="flex items-center gap-1 text-muted/75">
                                    <Heart size={24} />
                                    <p className="mr-3 text-sm">Status</p>
                                </span>
                                <strong className="text-lg font-extrabold">Disponível</strong>
                            </div>
                        )
                        }
                    </div>

                    <button type="button" onClick={() => adoptAPet(pet._id)} className="flex items-center justify-center p-4 bg-highlight hover:bg-primary text-on-primary transition rounded-full">
                        {!loading && <><HeartHandshakeIcon size={24} />
                            <span className="ml-3">Adotar</span></>
                        }

                        {loading &&
                            <Loader size={24} className="animate-spin" />
                        }
                    </button>
                </article>
            </div>
        </section>
    );
};

export default PetInfo;
