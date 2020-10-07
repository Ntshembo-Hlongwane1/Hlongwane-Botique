import React, { Component } from "react";
import image from "../../images/auth.svg";
import "../../StyleSheet/Auth.css";
import { Link } from "react-router-dom";
import axios from "axios";

export class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleForm = this.handleForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleForm(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  submitForm() {
    const data = new FormData();
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    const url = "http://127.0.0.1:5000/api/user-login";
    const production_url = "/api/user-login";
    axios
      .post(production_url, data)
      .then((response) => {
        localStorage.setItem("usid", response.data.token);
        window.location.replace("/");
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="base-container">
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={image} alt="Login Cover" />
          </div>
          <div className="form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                placeholder="Email"
                onChange={this.handleForm}
                id="email"
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={this.handleForm}
                id="password"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button className="btn" type="submit" onClick={this.submitForm}>
            Login
          </button>
        </div>
        <h3>Don't have an account?</h3>
        <Link to="/user-auth/register" className="auth">
          create account
        </Link>
      </div>
    );
  }
}
