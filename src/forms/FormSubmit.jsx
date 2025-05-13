import React from 'react';
function FormSubmit({name, type, onClick}) {
    return(
        <button className="relative inline-block z-10 px-6 py-4.5 bg-[#00a862] shadow-lg border-0 rounded-full text-white text-lg font-bold leading-tight overflow-hidden text-center transition-all duration-200 ease-in-out ml-auto cursor-pointer hover:shadow-xl hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" type={type}>
            {name}
        </button>
    )
}
export default FormSubmit;
