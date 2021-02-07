import '../styles/Textfield.css';
import React, { useState, useEffect } from 'react';

const TextField = ({ name, id, placeholder, label, type, value, onChange }) => {
    
    return (
        <div className="form__group field">
            <input type={type} className="form__field" placeholder={placeholder} name={name} id={id} onChange={onChange} value={value} />
            <label htmlFor={id} className="form__label">{label}</label>
        </div>
    );
}

export default TextField;

// Styles and html copied from https://codepen.io/lucasyem/pen/ZEEYKdj