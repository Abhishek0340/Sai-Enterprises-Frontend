import AdminLayout from "./AdminLayout";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
    const [summaryData, setSummaryData] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalProducts: 0,
    });

    const [topProducts, setTopProducts] = useState([]);
    const salesTarget = 5000000; 

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/dashboard-summary`);
                setSummaryData({
                    totalRevenue: res.data.totalRevenue,
                    totalOrders: res.data.totalOrders,
                    totalCustomers: res.data.totalCustomers,
                    totalProducts: res.data.totalProducts,
                });
                setTopProducts(res.data.topProducts);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };
    
        fetchSummary();
    }, []);
    

    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                {/* Summary Section */}
                <div className="stats bg-white text-center shadow w-full mb-6">
                    <div className="stat">
                        <div className="stat-title">Total Revenue</div>
                        <div className="stat-value text-primary">₹{summaryData.totalRevenue}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Orders</div>
                        <div className="stat-value text-secondary">{summaryData.totalOrders}</div>
                        <div className="stat-desc">15% increase this month</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Customers</div>
                        <div className="stat-value text-cyan-600">{summaryData.totalCustomers}</div>
                        <div className="stat-desc">Growing customer base</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Products</div>
                        <div className="stat-value text-green-600">{summaryData.totalProducts}</div>
                        <div className="stat-desc">Active product listings</div>
                    </div>
                </div>

                {/* Sales Target Progress */}
                <div className="p-4 bg-white rounded-lg shadow mb-6">
                    <h2 className="text-lg font-semibold mb-3">Sales Target Progress</h2>
                    <progress
                        className="progress w-full"
                        value={(summaryData.totalRevenue / salesTarget) * 100}
                        max="100"
                    ></progress>
                    <p className="text-center text-black font-semibold mt-2">
                        ₹{summaryData.totalRevenue} / ₹{salesTarget}
                    </p>
                </div>

                {/* Top 5 Best-Selling Products */}
                <div className=" p-4 bg-white rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-3">Top 5 Selling Products</h2>
                    <table className="table w-full">
                        <thead>
                            <tr className="">
                                <th></th>
                                <th className=""></th>
                            </tr>
                        </thead>
                        <tbody>
                            {topProducts.length > 0 ? (
                                topProducts.map((product, index) => (
                                    <tr key={index} className="bg-base-200">
                                        <td>{product.name}</td>
                                        <td>{product.sold}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center text-gray-500">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
