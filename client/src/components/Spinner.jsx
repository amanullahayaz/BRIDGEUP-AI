import React from 'react';
import './spinner.scss';

const Spinner = ({ text = "Loading..." }) => {
    return (
        <div className="spinner-container">
            <div className="spinner"></div>
            <p className="spinner-text">{text}</p>
        </div>
    );
};

export default Spinner;
