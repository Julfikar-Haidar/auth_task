"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";
import axios from "axios";
import { useRouter  } from "next/navigation";
import { useSelector } from 'react-redux';


const Shop = () => {
    const { token, isLoggedIn } = useSelector((state) => state.auth);
  const router = useRouter();

  const [total, setTotal] = useState(0);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isLoggedIn && !token) {
      router.push('/login')
    }
  }, [token, isLoggedIn])

  const fetchProduct = () => {
    setIsLoading(true);
   
      axios.get(`https://app-area.bestu.com.bd/api/nextjs/products?page=${currentPage}`, {
  headers: {
    'Authorization': `GETUPLTD2023NEXTJS`
  },
})
      .then((res) => {
         
          console.log('27',res.data.data);
          setProduct((prev) => [...prev, ...res.data.data.data]);
        setTotal(res.data.data.total);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  useEffect(() => {
    fetchProduct();
  }, [currentPage]);



  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Products</h1>
      <div className={styles.cards}>
      
        {product?.map((product) => {
          console.log(product);
          return <ProductCard product={product} key={product.id} />;
        })}
        {/* <ProductCard />   */}
      </div>
      {product?.length < total &&
        <div className={styles.load_btn}>
          <button
            disabled={isLoading}
            className={styles.fetch_more}
            onClick={handleLoadMore}        >
            {isLoading && "Loading..."} Load more
          </button>
        </div>
      }
    </div>
  );
};

export default Shop;
