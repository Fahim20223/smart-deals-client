import React, { Suspense } from "react";
import LatestProducts from "../LatestProducts/LatestProducts";
const latestProductsPromise = fetch(
  "http://localhost:3000/latest-products"
).then((res) => res.json());
const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <Suspense
        fallback={<span className="loading loading-bars loading-xl"></span>}
      >
        <LatestProducts
          latestProductsPromise={latestProductsPromise}
        ></LatestProducts>
      </Suspense>
    </div>
  );
};

export default Home;
