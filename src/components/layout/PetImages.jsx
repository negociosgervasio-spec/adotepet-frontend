import { useState } from "react";
import { motion } from "framer-motion";
import { baseUrl } from "../../utils/baseUrl";

const PetImages = ({ pet }) => {
  const [previewIndex, setPreviewIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {pet.images && pet.images.length > 0 && (
        <motion.img
          key={previewIndex} // força re-render na troca
          src={`${baseUrl}/images/pets/${pet.images[previewIndex]}`}
          alt={pet.name}
          className="w-full h-140 object-center object-cover rounded-2xl transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}

      {/* Indicators */}
      {pet.images.length > 1 && (
        <div className="flex justify-center gap-2 mt-2">
          {pet.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setPreviewIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                previewIndex === index ? "bg-primary" : "bg-muted/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PetImages;
