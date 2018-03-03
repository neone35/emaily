import React from 'react';
import { Link } from 'react-router-dom'; // for browser -dom

const Dashboard = () => {
    return (
        <div>
            Dashboard
            <FixedActionBtn />
        </div>
    );
};

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

export default Dashboard;