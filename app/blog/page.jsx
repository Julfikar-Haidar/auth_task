import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

async function getData() {
  const res = await fetch("https://api.slingacademy.com/v1/sample-data/photos", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
// console.log('res', res);
  return res.json();
}

const Blog = async () => {
  const data = await getData();
  return (
    <div className={styles.mainContainer}>
      {data?.photos.map((item) => (
        <Link href={`/blog/${item.id}`} className={styles.container} key={item.id}>
          <div className={styles.imageContainer}>
            <Image
             src={item.url}
              alt=""
              width={400}
              height={250}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>{item.title}</h1>
            <p className={styles.desc}>{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
