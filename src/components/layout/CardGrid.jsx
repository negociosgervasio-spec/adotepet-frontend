import {motion} from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // intervalo entre os cards
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CardGrid = ({ children }) => {
    return (
        <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show" className='grid grid-cols-[repeat(auto-fill,minmax(244px,1fr))] gap-8'>
            {children}
        </motion.ul>
    )
}

export default CardGrid;