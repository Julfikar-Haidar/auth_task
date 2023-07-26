"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import validator from "validator";
import axios from "axios";

const Register = () => {
  const router = useRouter();
  const [registerErrors, setRegisterErrors] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerValidator = (name, email, password, phone, address) => {
    let error = {};
    // console.log('error', error);
    if (!name) {
      error.name = "Enter your first name";
    }
    if (!email) {
      error.email = "Enter your email";
    } else if (!validator.isEmail(email)) {
      error.email = "Enter your valid email";
    }
    if (!phone) {
      error.phone = "Enter your phone";
    }

    if (!password) {
      error.password = "Enter your password";
    }
    if (!address) {
      error.address = "Enter your address";
    }

    return {
      error,
      isError: Object.keys(error).length == 0,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = registerValidator(
      formData.name,
      formData.email,
      formData.password,
      formData.phone,
      formData.address
    );
    if (!validate.isError) {
      return setRegisterErrors(validate.error);
    }
    setRegisterErrors(null);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("password", formData.password);
    console.log("data", data);
    try {
      const response = await axios.post(
        "https://app-area.bestu.com.bd/api/nextjs/user/registration",
        data,
        {
          headers: {
            Authorization: `GETUPLTD2023NEXTJS`,
          },
        }
      );
      
      if (response.data.success === true) {
        router.push("/login");
      }
    //   console.error("response:", response);
    } catch (error) {
      setRegisterErrors(error);
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create an Account</h1>
      <h2 className={styles.subtitle}>Please sign up</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className={styles.input}
          value={formData.name}
          onChange={handleChange}
        />
        {registerErrors?.name && (
          <p style={{ color: "red", fontSize: "11px" }}>
            {registerErrors?.name}
          </p>
        )}
        <input
          type="text"
          placeholder="Email"
          name="email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
        />
        {registerErrors?.email && (
          <p style={{ color: "red", fontSize: "11px" }}>
            {registerErrors?.email}
          </p>
        )}
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          className={styles.input}
          value={formData.phone}
          onChange={handleChange}
        />
        {registerErrors?.phone && (
          <p style={{ color: "red", fontSize: "11px" }}>
            {registerErrors?.phone}
          </p>
        )}
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          className={styles.input}
          value={formData.password}
          onChange={handleChange}
        />
        {registerErrors?.password && (
          <p style={{ color: "red", fontSize: "11px" }}>
            {registerErrors?.password}
          </p>
        )}
        <textarea
          type="texarea"
          placeholder="Address"
          name="address"
          className={styles.input}
          value={formData.address}
          onChange={handleChange}
        />
        {registerErrors?.address && (
          <p style={{ color: "red", fontSize: "11px" }}>
            {registerErrors?.address}
          </p>
        )}

        <button className={styles.button}>Register</button>
        {registerErrors && (
          <p style={{ color: "red", fontSize: "11px" }}>
            Something went wrong!
          </p>
        )}
      </form>
      <span className={styles.or}>- OR -</span>
      <Link className={styles.link} href="/login">
        Login with an existing account
      </Link>
    </div>
  );
};

export default Register;
