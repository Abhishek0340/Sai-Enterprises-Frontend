import React, { useEffect, useState } from "react";

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`http://localhost:5000/products?search=${searchQuery}`);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>Price: ₹{product.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
