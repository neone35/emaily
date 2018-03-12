import _ from 'lodash';
import React from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import FIELDS from './formFields';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(FIELDS, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Review your input</h5>
            {reviewFields}
            <button
                onClick={onCancel}
                className="waves-effect waves-light btn-flat left red white-text">
                <i className="material-icons left">arrow_back</i>
                Back
            </button>
            <button
                onClick={() => submitSurvey(formValues, history)}
                className="waves-effect waves-light btn-large right">
                <i className="material-icons right">send</i>
                Send Survey
            </button>
        </div>
    );
};

function mapStateToProps(state) {
    // console.log(state.form.surveyForm.values);
    return {
        formValues: state.form.surveyForm.values
    };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));