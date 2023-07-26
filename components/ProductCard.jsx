"use client";
import Image from "next/image";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.card}>
      {/* product image not found that's why put url */}
      <Image
        src={`${
          product?.image === null
            ? "https://api.slingacademy.com/public/sample-photos/1.jpeg"
            : `https://api.slingacademy.com/public/sample-photos/1.jpeg`
        }`}
        height={300}
        width={220}
        alt={product.image}
      />
      <h4 className={styles.title}>{product?.name}</h4>
      <h5 className={styles.category}>{product?.category_name}</h5>
      <p>$ {product?.price}</p>
      <button className={styles.button}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
