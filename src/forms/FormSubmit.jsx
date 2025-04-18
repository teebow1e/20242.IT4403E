import React from 'react';
function FormSubmit({name, type, onClick}) {
    return(
        <button className="relative font-inherit inline-block z-[1] py-[18px] px-6 bg-[#00a862] shadow-lg border-0 rounded-full text-white text-lg font-bold leading-tight overflow-hidden text-center no-underline transition-all duration-200 ease-in-out ml-auto cursor-pointer" type={type}>
            {name}
        </button>
    )
}
export default FormSubmit;
