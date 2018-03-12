import React from 'react';
import $ from 'jquery';
//  reduxForm == connect helper, Field == any type of HTML <input>

// {input} == const input = props.input ES2016
const SurveyField = ({ input, label, meta: { error, touched } }) => {

    // label animation
    $(document).ready(function () {
        $("input").focus(function () {
            $(this).parent().find("label").addClass("active");
        })

        $('input').blur(function () {
            if ($(this).val().length === 0) {
                $(this).parent().find("label").removeClass("active");
            }
        });

        if ($('input').val().length > 0) {
            $('input').parent().find("label").addClass("active");
        }

        // console.log(input);
    });

    // console.log(error); 
    // ...input == (key = value object) to component
    return (
        <div className="input-field">
            <label style={{ marginTop: '5px' }}>{label}</label>
            <input {...input} style={{ marginBottom: '10px' }} />
            <div className="red-text" style={{ marginBottom: '5px' }}>
                {touched && error ? error : ""}
            </div>
        </div>
    );
};

export default SurveyField;