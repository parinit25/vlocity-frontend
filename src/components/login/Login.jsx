import * as React from "react";
import styles from "./Login.module.scss";
import { useAuth } from "../../context/AuthContext";
import { Link, Navigate, useLocation } from "react-router";

export default function Login() {
  const { login, user } = useAuth();
  const { pathname } = useLocation();

  const [formData, setFormData] = React.useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <>
      {pathname === "/login" && !user ? (
        <section className={styles.section_login}>
          <div className={styles.row}>
            <div className={styles.col_1_of_2}>

              <header className={styles.header}>
                <div className={styles.header__logoBox}>
                  <img
                    src="https://cdn.prod.website-files.com/652bc0df79cbf4ed07329450/652cfb88161daabd6b4902de_logo.svg"
                    alt="Vlocity Logo"
                    className={styles.header__logo}
                  />
                </div>
                <div className={styles.header__textBox}>
                  <h1 className={styles.heading_primary}>
                    <span className={styles.heading_primaryMain}>Welcome Back</span>
                    <span className={styles.heading_primarySub}>
                      Nice to see you again
                    </span>
                  </h1>
                </div>
              </header>

            </div>
            <div className={styles.col_1_of_2}>
              <div className={styles.container_login}>
                <div className={styles.container_login_1}>
                  <h2 className={styles.login_title}>Login Account</h2>
                  <p className={styles.login_subtitle}>
                    Please enter your credentials to continue.
                  </p>
                  <form onSubmit={handleSubmit} className={styles.login_form}>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={styles.input_field}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className={styles.input_field}
                    />
                    <button type="submit" className={styles.login_button}>
                      Login
                    </button>
                  </form>
                  <p className={styles.signup_text}>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Navigate to={"/"} replace />
      )}
    </>
  );
}
