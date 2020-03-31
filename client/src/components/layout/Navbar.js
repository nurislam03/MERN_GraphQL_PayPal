import React from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/auth-context';

// const authLinks = (
//   <ul className="navbar-nav ml-auto">
//     <li className="nav-item">
//       <Link className="nav-link" to="/dashboard">
//         Dashboard
//       </Link>
//     </li>
//     <li className="nav-item">
//       <a
//         href=""
//         // onClick={this.onLogoutClick.bind(this)}
//         onClick={null}
//         className="nav-link"
//       >
//         Logout
//       </a>
//     </li>
//   </ul>
// );

// const guestLinks = (
//   <ul className="navbar-nav ml-auto">
//     <li className="nav-item">
//       <Link className="nav-link" to="/register">
//         Sign Up
//       </Link>
//     </li>
//     <li className="nav-item">
//       <Link className="nav-link" to="/login">
//         Login
//       </Link>
//     </li>
//   </ul>
// );

const Navbar = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <b>M Y S H O P</b>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/products">
                    {' '}
                    Products
                  </Link>
                </li>
                {(context.token && context.userRole === "Business") && (
                <React.Fragment>
                    <li className="nav-item">
                      <Link className="nav-link" to="/create-product">
                        Create Product
                      </Link>
                    </li>
                </React.Fragment>
                )}
              </ul>



              {context.token && (
                <React.Fragment>
                  <ul className="navbar-nav ml-auto">
                    {/* <li className="nav-item">
                      <Link className="nav-link" to="/create-product">
                        Create Product
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" onClick={context.logout}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </React.Fragment>
              )}

              {!context.token && (
                <React.Fragment>
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Sign Up
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                  </ul>
                </React.Fragment>
              )}
            </div>
          </div>
        </nav>
      );
    }}
  </AuthContext.Consumer>
);

export default Navbar;