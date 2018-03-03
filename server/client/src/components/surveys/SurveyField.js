import React from 'react';
//  reduxForm == connect helper, Field == any type of HTML <input>

// {input} == const input = props.input ES2016
const SurveyField = ({ input, label, meta: {error, touched}}) => {
    // console.log(meta); 
    // ...input == pass key = value object to component
    return (
        <div>
            <label>{label}</label>
            <input {...input} autoComplete="email"/>
            {touched && error ? error : ""}
        </div>
    );
};

export default SurveyField;