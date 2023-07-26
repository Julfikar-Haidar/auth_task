import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(id) {
  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/photos/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const post = await getData(params.id);
  return {
    title: post.photo.title,
    description: post.photo.description,
  };
}

const BlogPost = async ({ params }) => {
  const data = await getData(params.id);
  console.log("data", data);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data?.photo.title}</h1>
          <p className={styles.desc}>{data?.photo.description}</p>
          <div className={styles.author}>
            <Image
              src={data.photo.url}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>John doe</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={data?.photo.url}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{data?.photo.description}</p>
      </div>
    </div>
  );
};

export default BlogPost;
