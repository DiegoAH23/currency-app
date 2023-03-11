import React from "react";
import "./ResultForm.scss";


const ResultForm = ({currency}) => {
    return (
        <p className="result">{currency}</p>
    );
};

export default ResultForm;
