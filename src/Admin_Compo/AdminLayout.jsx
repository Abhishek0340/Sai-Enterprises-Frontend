import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 
import { FiHome, FiMail, FiBox, FiShoppingCart, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { useAdminAuth } from "./AdminAuthContext";

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { logout } = useAdminAuth();

    const Nav_Links = [
        { label: "Dashboard", to: "/dashboard", icon: <FiHome className="w-6 h-6 mr-3" /> },
        { label: "Inventory", to: "/inventory", icon: <FiBox className="w-6 h-6 mr-3" /> },
        { label: "Orders", to: "/adminorders", icon: <FiShoppingCart className="w-6 h-6 mr-3" /> },
        { label: "Transactions", to: "/transactions", icon: <RiMoneyRupeeCircleFill className="w-6 h-6 mr-3" /> },
        { label: "Contact", to: "/contactforms", icon: <FiMail className="w-6 h-6 mr-3" /> }
    ];

    const handleNavToggle = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleLogout = () => {
        logout();
        navigate("/adminlogin"); 
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside
                className={`bg-black p-5 text-white fixed md:relative h-full md:h-auto 
                flex flex-col w-64 transition-transform duration-300 z-50 shadow-lg
                ${isNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                {/* Close Button (Mobile) */}
                <button
                    className="text-white text-2xl self-end mb-4 md:hidden"
                    onClick={handleNavToggle}
                >
                    <FiX />
                </button>

                <nav className="w-full">
                    <h1 className="text-2xl p-2 mb-2 font-semibold">Admin Panel</h1>
                    <hr className="mb-3 p-2 border-gray-600" />
                    <ul className="w-full">
                        {Nav_Links.map((item, index) => (
                            <li key={index} className="w-full">
                                <Link
                                    to={item.to}
                                    className={`p-3 mb-2 flex items-center rounded-lg text-lg 
                                        font-semibold transition-all duration-300 
                                        ${location.pathname === item.to ?
                                            "bg-blue-600 text-white" : "hover:bg-blue-400 hover:text-white"}`}
                                    onClick={() => setIsNavOpen(false)}
                                >
                                    {item.icon}
                                    <p>{item.label}</p>
                                </Link>
                            </li>
                        ))}
                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center p-3 rounded-lg bg-red-500 
                            text-white font-semibold hover:bg-red-700 mt-4"
                        >
                            <FiLogOut className="w-6 h-6 mr-2" />
                            Logout
                        </button>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-5 transition-all duration-300">
                <header className="bg-gray-900 flex justify-between p-4 shadow items-center text-white">
                    {/* Menu Button (Mobile) */}
                    <button
                        className="text-3xl  md:hidden"
                        onClick={handleNavToggle}
                    >
                        <FiMenu />
                    </button>
                    <h1 className="text-xl font-semibold "> Admin Panel</h1>
                </header>

                {/* Page Content */}
                <div className="p-4">{children}</div>
            </main>
        </div>
    );
};

export default AdminLayout;
