import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/baseUrl";
import { toast } from "sonner";
import { Balloon, Heart, HeartHandshakeIcon, Loader, Paintbrush, TrashIcon, Weight } from "lucide-react";

import { useToken } from "../../../hooks/useToken";

const PetMineInfo = () => {
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

    const removePet = async (id) => {
        if (!token) {
            return navigate("/login");
        }
        setLoading(true);
        fetch(`${baseUrl}/pets/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,

            }
        }).then((res) => {
            if (res.ok) {
                navigate("/pets/mine");
            }
            return res.json();
        }).then((data) => {
            toast.info(data.msg);
        }).catch((error) => {
            toast.error(error);
        })
    };

    if (!pet) {
        return (
            <div className="flex items-center jusfify-center gap-8 h-screen">
                <Loader size={32} className="animate-spin" />
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <section className="mb-12 px-6">
            <div className="container m-auto">
                <nav className='p-8 sticky top-20 left-0 right-0 bg-surface'>
                    <ul className='flex items-center gap-3 text-xs'>
                        <li>
                            <Link to="/" className='hover:text-highlight transition'>Adotar</Link>
                            <span className='inline ml-1'>/</span>
                        </li>
                        <li>
                            <Link to="/pets/mine" className='hover:text-highlight transition'>Meus Pets</Link>
                            <span className='inline ml-1'>/</span>
                        </li>

                        <li >
                            <p className="text-primary">Informações - {pet.name}</p>
                        </li>

                    </ul>
                </nav>

                <article className="flex flex-col gap-8">
                    {pet.images && pet.images.length > 0 && (
                        <img
                            src={`${baseUrl}/images/pets/${pet.images[previewIndex]}`}
                            alt={pet.name}
                            className={`w-full h-140 object-center object-cover rounded-2xl col-span-2 transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`}
                            onMouseEnter={() => {
                                if (pet.images.length > 1) {
                                    setFade(true);
                                    setTimeout(() => {
                                        setPreviewIndex(1);
                                        setFade(false);
                                    }, 300); // tempo da transição
                                }
                            }}
                            onMouseLeave={() => {
                                setFade(true);
                                setTimeout(() => {
                                    setPreviewIndex(0);
                                    setFade(false);
                                }, 300);
                            }}
                        />
                    )}

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
                            <strong className="text-lg font-extrabold">{pet.weight} kilos</strong>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link to={`/pets/edit/${pet._id}`} className="flex items-center justify-center p-4 bg-blue-600 hover:bg-blue-300 text-on-primary transition rounded-full">
                            <HeartHandshakeIcon size={24} />
                            <span className="ml-3">Editar</span>
                        </Link>

                        <button type="button" onClick={() => removePet(pet._id)} className="flex items-center justify-center p-4 bg-red-600 hover:bg-red-400 text-on-primary transition rounded-full">
                            {loading && <Loader className="animate-spin" />}

                            {!loading && <>
                                <TrashIcon size={24} />
                                <span className="ml-3">Remover</span>
                            </>}

                        </button>
                    </div>

                </article>
            </div>
        </section>
    );
};

export default PetMineInfo;
