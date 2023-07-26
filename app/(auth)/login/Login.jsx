"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
// import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/authSlice";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const data = new FormData();
    data.append("email", loginData.email);
    data.append("password", loginData.password);

    try {
      const response = await axios.post(
        "https://app-area.bestu.com.bd/api/nextjs/user/login",
        data,
        {
          headers: {
            Authorization: `GETUPLTD2023NEXTJS`,
          },
        }
      );
      const { token, name } = response.data.data;
      // Store the token and user data in the Redux store
      dispatch(loginSuccess({ token, name }));
      // Redirect to a protected page or dashboard
      // For example, if you have a page named "/dashboard":
      // router.push('/dashboard');
      if (response.data.success === true) {
        setLoginErrors(null);
        setIsLoading(false);
        router.push("/shop");
      } else {
        setLoginErrors("Invalid login data");
      }
    } catch (error) {
      setLoginErrors(error);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Welcome Back</h1>
      <h2 className={styles.subtitle}>Please sign in to see the dashboard.</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className={styles.input}
          value={loginData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className={styles.input}
          value={loginData.password}
          onChange={handleChange}
        />

        <button className={styles.button}>Login</button>
        {loginErrors && (
          <p style={{ color: "red", fontSize: "11px" }}>{loginErrors}</p>
        )}
      </form>

      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/register">
        Create new account
      </Link>
    </div>
  );
};

export default Login;
