import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Input from "../../form/Input";
import { Loader } from "lucide-react";
import { useToken } from "../../../hooks/useToken";
import { baseUrl } from "../../../utils/baseUrl";

const Profile = () => {
  const { token } = useToken(); // corrigido: hook precisa ser chamado
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
    return null;
  }

  const { user, status, editUserById } = useAuth();
  const [form, setForm] = useState(user || {});


  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm({ ...form, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    });

    await editUserById(user._id, formData);
  };

  return (
    <section className="p-6">
      <div className="max-w-md m-auto px-6 py-12 bg-card rounded-2xl shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8">
            <h1 className="text-3xl font-bold block text-accent text-center">
              Atualizar Perfil
            </h1>

            {/* Campo para upload de imagens */}
            <div className="flex flex-col items-center justify-center gap-2">
              {/* Preview da imagem */}
              {form.avatar && (
                <img
                  src={
                    typeof form.avatar === "string"
                      ? `${baseUrl}/images/users/${form.avatar}` // imagem já existente no servidor
                      : URL.createObjectURL(form.avatar) // nova imagem selecionada
                  }
                  alt={form.name}
                  className="mt-2 w-32 h-32 object-cover rounded-full"
                />
              )}

              <label htmlFor="avatar" className="font-semibold">
                Foto de Perfil
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-muted 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0 
                  file:text-sm file:font-semibold 
                  file:bg-secondary file:text-white 
                  hover:file:bg-highlight transition border border-muted/50 px-4 py-3 rounded-lg"
              />
            </div>

            <Input
              type="text"
              name="name"
              placeholder="Seu nome"
              value={form.name || ""}
              onChange={handleChange}
              text="Nome"
            />

            <Input
              type="text"
              name="email"
              placeholder="seu@email.com"
              value={form.email || ""}
              onChange={handleChange}
              text="Email"
            />

            <Input
              type="tel"
              name="phone"
              placeholder="11987654321"
              value={form.phone || ""}
              onChange={handleChange}
              text="Telefone (Whatsapp)"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                type="password"
                name="password"
                placeholder="Mínimo 6 caracteres"
                value={form.password || ""}
                onChange={handleChange}
                text="Senha"
              />

              <Input
                type="password"
                name="confirmPassword"
                placeholder="Repita a senha"
                value={form.confirmPassword || ""}
                onChange={handleChange}
                text="Confirmar Senha"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center px-4 py-3 rounded-lg bg-secondary hover:bg-highlight transition font-semibold"
            >
              {status === "loading" ? (
                <Loader className="animate-spin" />
              ) : (
                <span>Atualizar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
