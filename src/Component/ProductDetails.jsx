import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from '../Component/Navbar';
import Footer from './Footer';
import { MdKeyboardArrowRight, MdHome } from "react-icons/md";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";


export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomOpen, setIsZoomOpen] = useState(false);
    const [zoomImage, setZoomImage] = useState(null);
    const { dispatch } = useCart();

    const { dispatch: wishlistDispatch } = useWishlist();
    useEffect(() => {
        axios.get(`https://sai-enterprises-backend.onrender.com/products/${id}`)
            .then((res) => {
                setProduct(res.data);
                if (res.data.images && res.data.images.length > 0) {
                    setSelectedImage(0);
                }
            })
            .catch((err) => console.error("Error fetching product:", err));
    }, [id]);

    const openZoom = (img) => {
        setZoomImage(img);
        setIsZoomOpen(true);
    };

    const closeZoom = () => {
        setIsZoomOpen(false);
        setZoomImage(null);
    };

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        );
    }

    const hasMultipleImages = product.images && product.images.length > 1;

    return (
        <>
            <Navbar />

            <div className="text-md  mb-6 ml-4 text-gray-600">
                <ul className="flex gap-2">
                    <li>
                        <a href="/"
                            className="hover:text-primary cursor-pointer transition">
                            <MdHome size={24} />
                        </a>
                    </li>
                    <span className="">
                        <MdKeyboardArrowRight size={24} fontSize={900} />

                    </span>
                    <li className="font-semibold cursor-pointer">{product.name}</li>
                </ul>
            </div>

            <div className="min-h-screen mb-10 py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* Image Gallery */}
                        <div className="w-full lg:w-1/2">
                            <div className="sticky top-4">
                                <div className="p-4 rounded-xl shadow cursor-zoom-in" onClick={() => openZoom(hasMultipleImages ? product.images[selectedImage] : product.image)}>
                                    <img
                                        src={hasMultipleImages ? product.images[selectedImage] : product.image}
                                        alt={product.name}
                                        className="rounded-xl w-full h-[400px] object-contain transition-transform duration-300 hover:scale-105"
                                        onError={(e) => e.target.src = 'https://via.placeholder.com/600x600?text=Product+Image'}
                                    />
                                </div>

                                {/* Additional Images */}
                                {product.additionalImages && product.additionalImages.length > 0 && (
                                    <div className="mt-6">
                                        <h4 className="font-medium text-gray-700 mb-2">More Images</h4>
                                        <div className="flex gap-3 flex-wrap">
                                            {product.additionalImages
                                                .filter((img) => img.trim() !== "")
                                                .map((img, index) => (
                                                    <div key={index} className="relative overflow-hidden rounded-lg border w-20 h-20 group cursor-pointer" onClick={() => openZoom(img)}>
                                                        <img
                                                            src={img}
                                                            alt={`Additional ${index + 1}`}
                                                            className="w-full h-full cursor-zoom-in object-cover transition-transform duration-300 group-hover:scale-125"
                                                            onError={(e) => e.target.src = "https://via.placeholder.com/100?text=Image"}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="w-full lg:w-1/2 space-y-6">
                            <div className="p-6">
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    {product.name}
                                </h1>
                                {product.category && (
                                    <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-md mt-2 inline-block">
                                        {product.category}
                                    </span>
                                )}
                                {product.quantity && (
                                    <p className={`text-sm mt-2 ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {product.quantity > 0 ? `${product.quantity} items in stock` : 'Out of stock'}
                                    </p>
                                )}
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-2">Description</h3>
                                <p className="text-gray-600">{product.description}</p>
                            </div>

                            {product.features && (
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-2">Features</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                                        {product.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="p-6 flex flex-wrap items-center gap-4">
                                <button
                                    className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition"
                                    onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
                                >
                                    Add to Cart
                                </button>

                                <button
                                    className="px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary/10 transition"
                                    onClick={() => wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: product })}
                                >
                                    ❤️ Wishlist
                                </button>
                            </div>

                            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <h4 className="font-semibold text-gray-500">Shipping</h4>
                                    <p>Free shipping</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Screen Image Zoom Modal */}
            {isZoomOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
                    onClick={closeZoom}
                >
                    <img
                        src={zoomImage}
                        alt="Zoomed View"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()} // Prevent modal close on image click
                    />
                    <button
                        className="absolute top-6 right-6 text-white text-3xl font-bold bg-gray-800 bg-opacity-70 rounded-full p-2"
                        onClick={closeZoom}
                    >
                        &times;
                    </button>
                </div>
            )}

            <Footer />
        </>
    );
}
