import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from '../../form/Input'
import { Loader } from 'lucide-react';
import Select from '../../form/Select';
import { toast } from "sonner";
import { baseUrl } from '../../../utils/baseUrl';
import { useToken } from '../../../hooks/useToken';

const PetEdit = () => {
    const [form, setForm] = useState({ name: "", age: "", weight: "", color: "", images: [] });
    const [preview, setPreview] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    const colorOptions = ["Branco", "Preto", "Marrom", "Cinza", "Caramelo", "Mesclado"];
    const [petStatus, setPetStatus] = useState("idle");

    const { token } = useToken();
    const navigate = useNavigate();
    const { id } = useParams(); // pega o id do pet da URL

    // Carregar dados do pet
    useEffect(() => {
        const fetchPet = async () => {
            try {
                const res = await fetch(`${baseUrl}/pets/${id}`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setForm({
                        name: data.name,
                        age: data.age,
                        weight: data.weight,
                        color: data.color,
                        images: []
                    });
                    setExistingImages(data.images || []);
                } else {
                    toast.error(data.msg || "Erro ao carregar pet");
                }
            } catch (error) {
                toast.error("Erro de conexão");
            }
        };
        fetchPet();
    }, [id, token]);

    const updatePet = async (pet) => {
        setPetStatus("loading");
        try {
            const res = await fetch(`${baseUrl}/pets/${id}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: pet
            });

            const data = await res.json();

            if (!res.ok) {
                setPetStatus("error");
                toast.error(data.msg || "Erro ao atualizar pet");
                return false;
            }
            setPetStatus("success");
            toast.success(data.msg);
            return true;
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onFileChange = (e) => {
        const files = Array.from(e.target.files);
        setForm((prev) => ({ ...prev, images: files }));

        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreview(previewUrls);
    };

    const handleColorChange = (e) => {
        setForm((prev) => ({ ...prev, color: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("age", form.age);
        formData.append("weight", form.weight);
        formData.append("color", form.color);

        form.images.forEach((file) => {
            formData.append("images", file);
        });

        const success = await updatePet(formData);
        if (success) {
            navigate("/pets/mine");
        }
    };

    return (
        <section className='mb-12'>
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
                        <strong className='text-primary'>Editar Pet</strong>
                    </li>
                </ul>
            </nav>

            <div className="max-w-md px-6 py-16 bg-card rounded-2xl shadow-2xl">
                <form onSubmit={handleSubmit} >
                    <div className="grid gap-8">
                        <h1 className='text-3xl font-bold block text-accent'>Editar Pet</h1>

                        {/* Imagens já cadastradas */}
                        {existingImages.length > 0 && (
                            <div>
                                <h2 className="text-sm font-semibold mb-2">Imagens atuais</h2>
                                <div className="flex flex-wrap gap-4">
                                    {existingImages.map((src, index) => (
                                        <img
                                            key={index}
                                            src={`${baseUrl}/images/pets/${src}`}
                                            alt={`Pet ${index}`}
                                            className="w-24 h-24 object-cover rounded-lg border"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="images" className='block mb-2'>
                                Novas imagens
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

                        <Input type="text" name="name" placeholder="Nome do Pet" value={form.name} onChange={handleChange} text="Nome" />
                        <Input type="number" name="age" placeholder="Idade do Pet" value={form.age} onChange={handleChange} text="Idade" />
                        <Input type="number" name="weight" placeholder="ex: 5" value={form.weight} onChange={handleChange} text="Peso" />

                        <Select text="Cor" name="color" options={colorOptions} handleChange={handleColorChange} value={form.color} />

                        <button type="submit" className="flex items-center justify-center px-4 py-3 rounded-lg bg-secondary hover:bg-highlight transition font-semibold">
                            {petStatus === "loading" ? <Loader className="animate-spin" /> : <span>Salvar Alterações</span>}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default PetEdit;
