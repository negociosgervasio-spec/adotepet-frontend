// hooks
import { useEffect, useState } from "react";

// components
import HeroImg from "../../assets/img/hero.jpg";
import LoaderComponent from "../layout/LoaderComponent";

// utils
import { baseUrl } from "../../utils/baseUrl";
import CardGrid from "../layout/CardGrid";
import PetsCard from "../layout/PetsCard";
import { useToken } from "../../hooks/useToken";
import { toast } from "sonner";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch(`${baseUrl}/pets`, { method: "GET" });
        const data = await res.json();

        if (!res.ok) {
          if ("msg" in data) {
            toast.error(data.msg);
          }
          return;
        }
        console.log(data);
        setPets(data);
      } catch (error) {
        console.error("Erro ao carregar pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return <LoaderComponent text="Carregando seus pets..." />;
  }

  console.log("Pets cadastrado: ", pets);

  return (
    <section id="pets" className="px-6 md:px-0 py-16">
      <div className="text-center ">
        <h2 className="text-4xl mb-2">Pets em Destaque</h2>
        <p className="mb-12">Conheça alguns dos nossos pets esperando por um lar</p>
        {pets.length > 0 ? (
          <CardGrid>
            {pets.map((pet) => (
              <PetsCard key={pet._id} pet={pet} route={`/pets/${pet._id}`} />
            ))}
          </CardGrid>
        ) : (
          <p className="text-muted">Nenhum pet cadastrado.</p>
        )}

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