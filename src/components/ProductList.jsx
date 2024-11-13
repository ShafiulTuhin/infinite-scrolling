import React, { useEffect, useRef, useState } from "react";
import Product from "./Product";

const productLimit = 10;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const productRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${productLimit}&skip=${
          productLimit * page
        }`
      );
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setPage((prevPage) => prevPage + 1);

      if (data.products.length === 0) {
        setHasMore(false);
      }

      console.log(data.products);
    };
    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasMore) {
        fetchProducts();
      }
    };
    const observer = new IntersectionObserver(onIntersection);
    if (observer && productRef.current) {
      observer.observe(productRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasMore, page]);
  return (
    <div>
      <h2 className="h2">Product-List</h2>

      {products.map((product) => (
        <Product
          title={product.title}
          price={product.price}
          thumbnail={product.thumbnail}
          key={product.id}
        />
      ))}

      {hasMore && (
        <div className="text-red-500" ref={productRef}>
          Loading Products ...
        </div>
      )}
    </div>
  );
};

export default ProductList;
