import React, { Component } from "react"; //class-based component (to place function of auth)
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import StripeWrapper from "./StripeWrapper";

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li>
            <a href="/auth/google">
              Log in
            </a>
          </li>;
      default:
        return [<li key="3" style={{margin: '0 10px'}}>
            Credits: {this.props.auth.credits}
          </li>,<li key="1">
            <StripeWrapper />
          </li>, <li key="2">
            <a href="/api/logout">Logout</a>
          </li> ];
    }
  }

  render() {
    return <nav>
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/surveys' : '/'} 
            className="brand-logo left">
            Emaily
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>;
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);
