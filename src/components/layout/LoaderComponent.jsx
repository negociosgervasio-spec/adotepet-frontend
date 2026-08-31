// src/components/Loader.jsx
import { Loader } from "lucide-react";

const LoaderComponent = ({ text = "Carregando..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader className="animate-spin w-10 h-10 text-secondary mb-4" />
      <span className="text-muted">{text}</span>
    </div>
  );
};

export default LoaderComponent;
