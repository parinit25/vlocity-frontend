import * as React from "react";
import styles from "../login/Login.module.scss";
import { useAuth } from "../../context/AuthContext";
import { Link, Navigate, useLocation } from "react-router";

export default function Signup() {
    const { signup, user } = useAuth(); // Changed login to signup assuming there's a signup function
    const { pathname } = useLocation();

    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    };

    return (
        <>
            {pathname === "/signup" && !user ? (
                <section className={styles.section_login}>
                    <div className={styles.row}>
                        <div className={styles.col_1_of_2}>
                            <div className={styles.container_login_2}>
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
                                            <span className={styles.heading_primaryMain}>Join Us Today</span>
                                            <span className={styles.heading_primarySub}>
                                                Create your account and get started
                                            </span>
                                        </h1>
                                    </div>
                                </header>
                            </div>
                        </div>
                        <div className={styles.col_1_of_2}>
                            <div className={styles.container_login}>
                                <div className={styles.container_login_1}>
                                    <h2 className={styles.login_title}>Create Account</h2>
                                    <p className={styles.login_subtitle}>
                                        Fill in your details to sign up.
                                    </p>
                                    <form onSubmit={handleSubmit} className={styles.login_form}>
                                        <input
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className={styles.input_field}
                                        />
                                        <input
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className={styles.input_field}
                                        />
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
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            className={styles.input_field}
                                        />
                                        <button type="submit" className={styles.login_button}>
                                            Sign Up
                                        </button>
                                    </form>
                                    <p className={styles.signup_text}>
                                        Already have an account? <Link to="/login">Log In</Link>
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