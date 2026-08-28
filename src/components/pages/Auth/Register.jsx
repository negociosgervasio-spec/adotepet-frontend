import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader } from 'lucide-react';
import Input from '../../form/Input';
import Logo from '../../layout/Logo';
import { toast } from 'sonner';
import { baseUrl } from '../../../utils/baseUrl';
import { useToken } from '../../../hooks/useToken';


const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", phone: "" });

    const { token } = useToken();
    const [status, setStatus] = useState("idle");

    const navigate = useNavigate();

    if (token) {
        navigate("/pets/mine");
        return;
    }

    const register = async (user) => {
        setStatus("loading");
        try {
            const res = await fetch(`${baseUrl}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)

            });

            const data = await res.json();

            if (!res.ok) {
                setStatus("error");

                if ("errors" in data) {
                    toast.error(data.errors[0].msg);
                } else if ("msg" in data) {
                    toast.error(data.msg);
                }

                return false;
            }

            toast.success(data.msg);

            setStatus("success");
            return true;
        } catch (error) {
            setStatus("error");
            toast.error(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(form);
        if (success) {
            navigate("/login");
        }
    };


    return (

        <section className="p-6 ">
            <div className="max-w-md m-auto px-6 py-12 bg-card rounded-2xl shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-8">
                        <div className="grid gap-3 text-center items-center justify-center">
                            <Logo />
                            <h1 className='text-3xl font-bold block text-accent text-center mt-3'>Bem-vindo!</h1>
                            <p>Cadastre-se para continuar sua jornada de adoção</p>
                        </div>
                        <Input type="text" name={"name"} placeholder={"Seu nome"} value={form.name} onChange={handleChange} text={"Nome"} />
                        <Input type="text" name={"email"} placeholder={"seu@email.com"} value={form.email} onChange={handleChange} text={"Email"} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Input type="password" name={"password"} placeholder={"Mínimo 6 caracteres"} value={form.password} onChange={handleChange} text={"Senha"} />
                            <Input type="password" name={"confirmPassword"} placeholder={"Repita a senha"} value={form.confirmPassword} onChange={handleChange} text={"Confimar senha"} />
                        </div>

                        <Input type="tel" name={"phone"} placeholder={"11987654321"} value={form.phone} onChange={handleChange} text={"Telefone (Whatsapp)"} />

                        <button type="submit" className="flex items-center justify-center px-4 py-3 rounded-lg bg-secondary hover:bg-highlight transition font-semibold">
                            {status === "loading" ? (<Loader className="animate-spin" />) : (<span>Cadastrar</span>)}
                        </button>

                        <p className="text-center">
                            <span>Já tem um conta?</span>
                            <Link to="/login" className="text-lg inline-block ml-1 font-semibold text-accent hover:opacity-80 transition">Entrar</Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>

    )
};

export default Register;