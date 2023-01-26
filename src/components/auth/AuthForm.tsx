import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Link, useSearchParams } from "react-router-dom";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthHandler() {
    setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  }

  return (
    <>
      <Form method="post" className="auth-form">
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className="auth-actions">
          <button onClick={switchAuthHandler} type="button">
            {isLogin ? "Create new user" : "Login"}
          </button>
          <button>Save</button>
        </div>
      </Form>
    </>
  );
};

export default AuthForm;
