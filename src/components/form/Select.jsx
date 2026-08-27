import React from 'react'

const Select = ({ text, name, options, handleChange, value }) => {
    return (
        <div>
            <label htmlFor={name} className="font-semibold block mb-1">{text} <span className="text-red-500">*</span></label>
            <select name='name' id='name' onChange={handleChange} value={value || ""} className="px-4 py-3 rounded-lg border border-muted/50 focus:ring-2 focus:ring-highlight transition w-full" >
                <option value={""}>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default Select