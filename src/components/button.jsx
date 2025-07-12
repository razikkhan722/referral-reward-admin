import React from 'react'

const Button = ({ btn_title, btn_class, onClick, disabled }) => {
    return (
        <>
            <button type='submit' className={` py-2 font-14 montserrat-medium rounded-pill ${btn_class}`}
                onClick={onClick}
                disabled={disabled}
            >
                {btn_title}
            </button>
        </>
    );
};

export default Button;