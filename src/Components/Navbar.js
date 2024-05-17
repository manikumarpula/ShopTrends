import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid"> {/* Wrap navbar contents in a container for proper alignment */}
        <a className="navbar-brand font-weight-bold" href="/home"><b>ShopTrends</b></a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto"> {/* Use ms-auto for right alignment */}
            <li className="nav-item">
              <a className="nav-link" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='/login'>Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register">Register</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
