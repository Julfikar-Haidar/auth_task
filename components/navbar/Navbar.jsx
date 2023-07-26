"use client";
import Link from "next/link";
import React from "react";
import styles from "./navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess } from "@/redux/authSlice";
import { useRouter } from "next/navigation";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  }
];

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { name, isLoggedIn } = useSelector((state) => state.auth);

  const logOut = () => {
    dispatch(logoutSuccess());
    router.push('/login')
  };
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Julfikar
      </Link>
      <div className={styles.links}>
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        {isLoggedIn ? (
          <>
            <button className={styles.logout}>{name}</button>
            <button className={styles.logout} onClick={logOut}>
              Logout
            </button>
          </>
        ) : (
          <button
            className={styles.logout}
            onClick={() => {
              router.push("/login");
            }}
          >
            Sign-in
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
