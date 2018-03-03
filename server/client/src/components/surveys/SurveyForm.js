import _ from 'lodash';
import React, { Component } from 'react';
//  reduxForm == connect helper, Field == any type of HTML <input>
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';

const FIELDS = [
    { label: 'Survey Title', name: 'title' },
    { label: 'Subject Line', name: 'subject' },
    { label: 'Email Body', name: 'body' },
    { label: 'Recipient List', name: 'emails' }
];

class SurveyForm extends Component {

    renderFields() {
        // lodash function to apply key=value pairs
        return _.map(FIELDS, ({ label, name }) => {
            return (
                <Field component={SurveyField} type="text" label={label} name={name} key={name} />
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
                    <i className="material-icons right">send</i>
                </button>
            </div>
        );
    }

    render() {
        return (
            // handleSubmit provided by reduxForm
            <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                {this.renderFields()}
                {this.renderButtons()}
            </form>
        );
    }
}

function validate(values) {
   const errors =  {};
   // redux-form automatically matches object values to fields
   if (!values.title) {
       errors.title = 'You must provide a title';
       errors.subject = 'You must provide a subject';
       errors.body = 'You must provide an email body';
       errors.emails = 'You must provide a comma separated list of emails';
   }
   // if empty, good!
   return errors;
}

export default reduxForm({
    form: 'surveyForm',
    validate
})(SurveyForm);