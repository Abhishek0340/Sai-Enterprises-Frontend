import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { MdEdit, MdDelete  } from "react-icons/md";


export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    discount: "",
    quantity: "",
    category: "",
    additionalImages: [],
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(`https://sai-enterprises-backend.onrender.com/products`);
    setProducts(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "additionalImages") {
      setProduct({
        ...product,
        additionalImages: value.split(",").map((url) => url.trim()),
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async () => {
    if (
      !product.name ||
      !product.image ||
      !product.description ||
      !product.price ||
      !product.quantity ||
      !product.category
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newProduct = {
      ...product,
      price: Number(product.price),
      discount: Number(product.discount),
      quantity: Number(product.quantity),
    };

    try {
      if (editingProductId) {
        await axios.put(`https://sai-enterprises-backend.onrender.com/update-product/${editingProductId}`,
          newProduct
        );
      } else {
        await axios.post(`https://sai-enterprises-backend.onrender.com/add-product`, newProduct);
      }
      fetchProducts();
      setProduct({
        name: "",
        image: "",
        description: "",
        price: "",
        discount: "",
        quantity: "",
        category: "",
        additionalImages: [],
      });
      setEditingProductId(null);
    } catch (err) {
      console.error("Failed to submit product:", err);
      alert("Error: " + (err.response?.data?.error || "Something went wrong"));
    }
  };

  const handleEdit = (prod) => {
    setProduct({
      ...prod,
      additionalImages: prod.additionalImages || [],
    });
    setEditingProductId(prod._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://sai-enterprises-backend.onrender.com/delete-product/${id}`);
    fetchProducts();
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-8xl mx-auto bg-white rounded-lg shadow-md border border-gray-300">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border capitalize p-3 w-full rounded-md shadow focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="border capitalize p-3 w-full rounded-md shadow focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 w-full capitalize rounded-md shadow focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="border p-3 w-full rounded-md capitalize shadow focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            placeholder="Discount (%)"
            className="border p-3 w-full rounded-md shadow focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className="border p-3 w-full rounded-md shadow focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            className="border p-3 w-full rounded-md shadow focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="additionalImages"
            value={product.additionalImages.join(",")}
            onChange={handleChange}
            placeholder="Additional Image URLs (comma separated)"
            className="border p-3 w-full rounded-md shadow focus:ring-2 focus:ring-indigo-400 col-span-3"
          />
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-all shadow-md font-semibold"
          >
            {editingProductId ? "Update Product" : "Add Product"}
          </button>
        </div>

        {product.additionalImages.length > 0 && (
          <div className="mt-6 grid grid-cols-6 gap-4">
            {product.additionalImages
              .filter((img) => img.trim() !== "")
              .map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Additional ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
          </div>
        )}
      </div>

      <div className="mt-8 max-w-5xl mx-auto">
        <input
          type="text"
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 border p-2 w-full rounded-md shadow focus:ring-2 focus:ring-indigo-400"
        />
        <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
          Product List
        </h3>
        <div className="overflow-x-auto rounded-lg  border border-gray-300">
          <table className="table table-xs w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Description</th>
                <th className="p-4">Price</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Category</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((prod) => (
                <tr key={prod._id} className="">
                  <td className="p-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-4">{prod.name}</td>
                  <td className="p-4 truncate max-w-xs">{prod.description}</td>
                  <td className="p-4">₹   {prod.price}</td>
                  <td className="p-4">{prod.discount}%</td>
                  <td className="p-4">{prod.quantity}</td>
                  <td className="p-4">{prod.category || "No Category"}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEdit(prod)}
                      className=" btn btn-sm text-blue-500"
                    >
                      <MdEdit fontSize={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(prod._id)}
                      className="btn btn-sm  text-red-500"
                    >
                      <MdDelete fontSize={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => changePage(i + 1)}
              className={`px-3 py-1 rounded-md border shadow ${
                currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}