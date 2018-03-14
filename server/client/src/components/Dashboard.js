import React from 'react';
import { Link } from 'react-router-dom'; // for browser -dom
import SurveyList from './surveys/SurveyList';

const FixedActionBtn = () => {
    return (
        <div className="fixed-action-btn">
            <Link className="btn-floating btn-large red"
                to={'/surveys/new'}>
                <i className="large material-icons">add</i>
            </Link>
        </div>
    );
};

const Dashboard = () => {
    return (
        <div>
            Dashboard
            <SurveyList />
            <FixedActionBtn />
        </div>
    );
};



export default Dashboard;