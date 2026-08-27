import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ArrowUpRight } from 'lucide-react';

import { useToken } from "../../../hooks/useToken";

import { baseUrl } from "../../../utils/baseUrl";

import CardGrid from "../../../components/layout/CardGrid.jsx";
import PetsCard from "../../../components/layout/PetsCard.jsx";
import { toast } from "sonner";

const PetsMine = () => {
  const { token } = useToken();
  const [userPets, setUserPets] = useState([]);


  useEffect(() => {

    fetch(`${baseUrl}/pets/mine`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    }).then((data) => {
      console.log("Dados recebidos: ", data, typeof data);
      setUserPets(data);
      console.log(data);
    }).catch((err) => {
      console.error(err);
    });

  }, []);


  return (
    <section className="my-12 px-6">
      <div className="relative container m-auto">
        <div className="my-8 py-4 overflow-hidden flex flex-wrap gap-6 justify-between items-center sticky top-22 z-40 bg-surface">
          <h1 className="text-accent font-extrabold text-4xl">Meus Pets</h1>
          <Link to={"/pets/register"} className="bg-primary hover:bg-highlight text-on-primary transition px-4 py-3 rounded-lg">
            <span> Cadastrar Pet </span>
            <ArrowUpRight size={24} className="inline ml-1 mb-2" />
          </Link>
        </div>

        <CardGrid>
          {userPets && userPets.map((pet) => (
            <PetsCard pet={pet} route="/pets/mine/"/>
          ))}
        </CardGrid>

        {!userPets && <p>Você ainda não cadastro nenhum pet.</p>}

      </div>
    </section>
  );
}

export default PetsMine;