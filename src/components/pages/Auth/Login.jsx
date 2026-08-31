import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Loader } from 'lucide-react';
import Input from '../../form/Input';
import Logo from '../../layout/Logo';
import { toast } from 'sonner';
import { baseUrl } from '../../../utils/baseUrl';
import { useToken } from '../../../hooks/useToken';
import {refreshPage} from "../../../utils/refreshPage";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });

    const [status, setStatus] = useState();

    const { saveItem, token } = useToken();

    const navigate = useNavigate();

    if (token) {
        return navigate("/pets/mine")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const login = async (form) => {
        setStatus("loading");
        try {
            const res = await fetch(`${baseUrl}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
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

            saveItem(data.token);

            toast.success(data.msg);

            setStatus("success");

            return true;

        } catch (error) {
            setStatus("error");
            toast.error(error?.response?.msg);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(form);
        if (success) {
            navigate("/pets/mine");
            refreshPage();
        }
    };


    return (
        <section className="p-6">
            <div className="max-w-md m-auto px-6 py-12 bg-card rounded-2xl shadow-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-8">
                        <div className="grid gap-3 text-center items-center justify-center">
                            <Logo />
                            <h1 className='text-3xl font-bold block  text-center mt-3'>Bem-vindo de volta!</h1>
                            <p>Entre para continuar sua jornada de adoção</p>
                        </div>
                        <Input type="text" name={"email"} placeholder={"seu@email.com"} value={form.email} onChange={handleChange} text={"Email"} />

                        <Input type="password" name={"password"} placeholder={"Mínimo 6 caracteres"} value={form.password} onChange={handleChange} text={"Senha"} />

                        <button type="submit" className="flex items-center justify-center px-4 py-3 rounded-lg bg-secondary hover:bg-highlight transition font-semibold">
                            {status === "loading" ? (<Loader className="animate-spin" />) : (<span>Entrar</span>)}
                        </button>
                        <p className="text-center">
                            <span>Não tem um conta?</span>
                            <Link to="/register" className="text-lg inline-block ml-1 font-semibold text-accent hover:opacity-80 transition">Cadastrar</Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login