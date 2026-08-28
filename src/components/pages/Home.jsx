// hooks
import { useEffect, useState } from "react";

// components
import HeroImg from "../../assets/img/hero.jpg";

// utils
import { baseUrl } from "../../utils/baseUrl";
import CardGrid from "../layout/CardGrid";
import PetsCard from "../layout/PetsCard";

const Hero = () => {

  return (
    <section className="relative flex items-center justify-start h-screen px-3">
      <img src="https://images.pexels.com/photos/13869571/pexels-photo-13869571.jpeg" alt="Imagem Ilustrativa" className="h-full w-full absolute inset-0 brightness-90" />
      {/* Conteúdo principal */}
      <div
        className="relative flex flex-col text-white p-4 max-w-sm">

        <h1 className="font-extrabold text-4xl mb-8">
          Encontre seu novo melhor amigo
        </h1>
        <p className="mb-8">
          Dê um lar cheio de amor para um pet que está esperando por você
        </p>
        <a
          href="#pets"
          className="w-max px-4 py-3 rounded-full bg-highlight hover:bg-secondary transition"
        >
          Ver pets disponíveis
        </a>
      </div>
    </section>
  );
};

const Pets = () => {
  const [pets, setPets] = useState([]);
  const userId = localStorage.getItem("userId"); // pega o id do usuário logado

  useEffect(() => {
    fetch(`${baseUrl}/pets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        // Filtra os pets para não mostrar os do próprio usuário ou já adotados por ele
        const filteredPets = data.filter((pet) => {
          const isOwner = pet.user._id === userId;
          const isAdopter = pet.adopter && pet.adopter._id === userId;
          return !isOwner && !isAdopter;
        });

        setPets(filteredPets);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  return (
    <section id="pets" className="px-6 md:px-0 py-16">
      <div className="text-center ">
        <h2 className="text-4xl mb-2">Pets em Destaque</h2>
        <p className="mb-12">Conheça alguns dos nossos pets esperando por um lar</p>
        <CardGrid>
          {pets.map((pet) => (
            <PetsCard key={pet._id} pet={pet} route={`/pets/${pet._id}`}/>
          ))}
        </CardGrid>
      </div>
    </section>
  );
};


const Home = () => {
  return (
    <>
      <Hero />
      <Pets />
    </>
  )
}

export default Home;