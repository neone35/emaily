import _ from 'lodash';
import React, { Component } from 'react';
//  reduxForm == connect helper, Field == any type of HTML <input>
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

import FIELDS from './formFields';

class SurveyForm extends Component {

    renderFields() {
        // lodash function to apply key=value pairs
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field component={SurveyField} label={label} name={name} key={name} />
            );
        });
    }

    renderButtons() {
        return (
            <div>
                <Link to="/surveys" className="waves-effect waves-light btn-flat left red white-text">
                    Cancel
                </Link>
                <button type="submit" className="waves-effect waves-light btn-large right">
                    Next
                    <i className="material-icons right">arrow_forward</i>
                </button>
            </div>
        );
    }

    render() {
        return (
            // handleSubmit provided by reduxForm
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                {this.renderFields()}
                {this.renderButtons()}
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    // redux-form automatically matches object values to error fields
    errors.recipients = validateEmails(values.recipients || "");

    _.each(FIELDS, ({name, hint}) => {
        if (!values[name]) {
            errors[name] = hint;
        }
    });

    // if empty, good!
    return errors;
}

export default reduxForm({
    form: 'surveyForm',
    validate,
    destroyOnUnmount: false
})(SurveyForm);