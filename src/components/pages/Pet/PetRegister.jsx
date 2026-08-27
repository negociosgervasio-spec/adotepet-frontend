import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Input from '../../form/Input'
import { Loader } from 'lucide-react';
import Select from '../../form/Select';
import { toast } from "sonner";
import { baseUrl } from '../../../utils/baseUrl';
import { useToken } from '../../../hooks/useToken';


const PetRegister = () => {
    const [form, setForm] = useState({ name: "", age: "", weight: "", color: "", images: [] });
    const [preview, setPreview] = useState([]);

    const colorOptions = ["Branco", "Preto", "Marrom", "Cinza", "Caramelo", "Mesclado"];

    const [petStatus, setPetStatus] = useState("idle");

    const { token } = useToken();

    const navigate = useNavigate();

    const register = async (pet) => {
        setPetStatus("loading");
        try {
            const res = await fetch(`${baseUrl}/pets/register`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: pet
            });

            const data = await res.json();

            if (!res.ok) {
                setPetStatus("error");

                if ("errors" in data) {
                    toast.error(data.errors[0]);
                } else if ("msg" in data) {
                    toast.error(data.msg);
                }
                return false;
            }
            setPetStatus("success")
            toast.success(data.msg);
            return true;
        } catch (error) {
            toast.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onFileChange = (e) => {
        const files = Array.from(e.target.files);
        setForm((prev) => ({ ...prev, images: files }));

        // gera URLs temporárias para preview
        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreview(previewUrls);
    };

    const handleColorChange = (e) => {
        setForm((prev) => ({ ...prev, color: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Dados dos pets: ", form);
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("age", form.age);
        formData.append("weight", form.weight);
        formData.append("color", form.color);

        form.images.forEach((file) => {
            formData.append("images", file);
        });

        const success = await register(formData);
        if (success) {
            navigate("/pets/mine");
        }
    };

    return (
        <section>
            <nav className='my-6'>
                <ul className='flex items-center gap-3 text-xs'>
                    <li>
                        <Link to="/" className='hover:text-highlight transition'>Adotar</Link>
                        <span className='inline ml-1'>/</span>
                    </li>
                    <li>
                        <Link to="/pets/mine" className='hover:text-highlight transition'>Meus Pets</Link>
                        <span className='inline ml-1'>/</span>
                    </li>
                    <li>
                        <strong className='text-primary'>Cadastrar Pet</strong>
                    </li>
                </ul>
            </nav>

            <div className="max-w-md m-auto px-6 py-12 bg-card rounded-2xl shadow-2xl mb-6">
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-8">
                        <h1 className='text-3xl font-bold block text-accent'>Cadastrar Pet</h1>

                        <div>
                            <label htmlFor="images" className='block mb-2'>
                                Imagem do Pet <span className='text-red-400'>*</span>
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                name="images"
                                id="images"
                                onChange={onFileChange}
                                multiple
                                className="block w-full text-sm text-muted 
                  file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0 
                  file:text-sm file:font-semibold 
                  file:bg-secondary file:text-white 
                  hover:file:bg-highlight transition border border-muted/50 px-4 py-3 rounded-lg"
                            />

                            {/* Preview das imagens */}
                            {preview.length > 0 && (
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {preview.map((src, index) => (
                                        <img
                                            key={index}
                                            src={src}
                                            alt={`Preview ${index}`}
                                            className="w-24 h-24 object-cover rounded-lg border"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <Input
                            type="text"
                            name="name"
                            placeholder="Nome do Pet"
                            value={form.name}
                            onChange={handleChange}
                            text="Nome"
                        />

                        <Input
                            type="number"
                            name="age"
                            placeholder="Idade do Pet"
                            value={form.age}
                            onChange={handleChange}
                            text="Idade"
                        />

                        <Input
                            type="number"
                            name="weight"
                            placeholder="ex: 5"
                            value={form.weight}
                            onChange={handleChange}
                            text="Peso"
                        />

                        <Select
                            text="Cor"
                            name="color"
                            options={colorOptions}
                            handleChange={handleColorChange}
                            value={form.color}
                        />

                        <button
                            type="submit"
                            className="flex items-center justify-center px-4 py-3 rounded-lg bg-secondary hover:bg-highlight transition font-semibold"
                        >
                            {petStatus === "loading" ? (
                                <Loader className="animate-spin" />
                            ) : (
                                <span>Cadastrar</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default PetRegister;
