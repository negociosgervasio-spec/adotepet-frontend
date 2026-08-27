
const Input = ({ type, text, name, placeholder, value, onChange, multiple }) => {
    return (
        <div>
            <label htmlFor={name} className="font-semibold block mb-1">{text} <span className="text-red-500">*</span></label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...(multiple ? { multiple } : "")}
                className="px-4 py-3 rounded-lg border border-muted/50 focus:ring-2 focus:ring-highlight transition w-full" />
        </div>
    )
};

export default Input;