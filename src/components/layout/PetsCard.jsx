import { Link } from "react-router-dom";

import { PawPrint, DotIcon } from "lucide-react";

import { baseUrl } from "../../utils/baseUrl";

const PetsCard = ({ pet, route = "/pets/", children }) => {
    return (
        <li key={pet._id} className="bg-card shadow rounded-2xl overflow-clip group hover:shadow-2xl hover:-translate-y-1 transition">
            <Link to={route}>
                <div className="overflow-hidden">
                    <img src={`${baseUrl}/images/pets/${pet.images[0]}`} alt={pet.name} className="h-80 w-full group-hover:scale-110 brightness-75 group-hover:brightness-100 trasition duration-1000" />
                </div>
                <div className="p-6 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <strong className="text-2xl">{pet.name}</strong>
                        <PawPrint size={24} className="text-primary" />
                    </div>
                    <div className="flex items-center gap-1">
                        <p>{pet.age} anos</p>
                        <DotIcon />
                        <p>{pet.weight} Kg</p>
                    </div>

                    {pet.available &&
                        < span className="bg-accent/5 text-accent px-3 py-2 rounded-full w-max">Disponível</span>
                    }

                    {!pet.available &&
                        < span className="bg-red-400/5 text-red-400 px-3 py-2 rounded-full w-max">Adotado</span>
                    }

                    {children}
                </div>
            </Link>
        </li >
    )
}

export default PetsCard