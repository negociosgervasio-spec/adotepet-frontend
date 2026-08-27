
import { Link } from 'react-router-dom'
import { PawPrint } from "lucide-react";


const Logo = ({size = 32, padding = 6}) => {
    return (
        <span className='font-[Edu_NSW_ACT_Cursive] flex items-center justify-center gap-1 hover:opacity-80'>
            <div className={`p-${padding} w-max bg-highlight/30 text-highlight rounded-full`}>
                <PawPrint size={size} className='text-center' />
            </div>
        </span>
    )
}

export default Logo