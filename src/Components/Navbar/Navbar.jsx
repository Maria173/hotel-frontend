import React, { Component } from "react";

// import react-router-dom
import { Link } from "react-router-dom";

// import assets
import Logo from "../../assets/img/svg/logo.svg";
import { FaAlignRight } from "react-icons/fa";

export default class Navbar extends Component {
  state = {
    isOpen: false,
  };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            {/* app logo */}
            <Link to="/">
              <img src="/logo.png" alt="Гостиница N" />
            </Link>

            {/* navbar toggle button */}
            <button
              type="button"
              className="nav-btn"
              onClick={this.handleToggle}
            >
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          {/* navbar link */}
          <ul
            className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
          >
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/rooms">Номера</Link>
            </li>
            <li>
              <Link to="/gallery">Галерея</Link>
            </li>
            <li>
              <Link to="/about">О нас</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
