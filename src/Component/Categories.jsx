import React from "react";
import { Link } from "react-router-dom";

export function Categories() {
    const Category_info = [
        { label: "Mobile Devices", img_src: "https://i.ibb.co/0zXG47p/mobile-category.png", to: '/mobile' },
        { label: "Computing Devices", img_src: "https://i.ibb.co/cKZv15dQ/computing-category.webp", to: '/computingdevices' },
        { label: "Appliances", img_src: "https://i.ibb.co/FbG4Wx0p/appliances-category.png", to: '/appliances' },
        { label: "Audio Equipments", img_src: "https://i.ibb.co/Y7zqmRsG/audio-category.webp",  to: '/audioequipments' },
        { label: "Accessories", img_src: "https://i.ibb.co/cK83RW9T/accessories-category.jpg", to: '/accessories' },
        { label: "Smart Home Devices", img_src: "https://i.ibb.co/q3nBr4pN/smarthome-category.jpg", to: '/smarthomedevices' },
    ];

    return (
        <div
            className="w-full overflow-x-auto sm:overflow-visible"
            style={{
                scrollbarWidth: "none",           
                msOverflowStyle: "none",          
            }}
        >
            <div
                className="flex gap-4 p-4 mt-4 min-w-max sm:flex-wrap bg-gray-50 rounded"
                style={{
                    display: "flex",
                    overflowX: "auto",
                }}
            >
                {Category_info.map((item, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-32 p-2 flex flex-col items-center"
                    >
                        <img
                            className="w-20 h-20 object-contain"
                            alt={item.label}
                            src={item.img_src}
                        />
                        <span className="mt-2 font-semibold text-center">
                            <Link to={item.to}>{item.label}</Link>
                        </span>
                    </div>
                ))}
            </div>

            {/* Hide scrollbar */}
            <style>
                {`
                div::-webkit-scrollbar {
                    display: none;
                }
                `}
            </style>
        </div>
    );
}
