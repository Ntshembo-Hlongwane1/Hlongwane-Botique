import React, { Component } from "react";
import image from "../../images/auth.svg";
import { Link } from "react-router-dom";
export class UserSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      verifyPassword: "",
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
    console.log(this.state);
  }
  render() {
    return (
      <div className="base-container">
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={image} alt="Login Cover" />
          </div>
          <div className="form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                onChange={this.handleForm}
                id="email"
              />
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                onChange={this.handleForm}
                id="username"
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={this.handleForm}
                id="password"
              />
              <label>Verify Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={this.handleForm}
                id="verifyPassword"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <button className="btn" onClick={this.submitForm}>
            SignUp
          </button>
        </div>
        <h3>Already have an account?</h3>
        <Link to="/user-auth/login" className="auth">
          Sign in
        </Link>
      </div>
    );
  }
}
