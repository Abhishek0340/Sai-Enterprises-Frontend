import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userEmail = localStorage.getItem("loggedInUser");

  useEffect(() => {
    if (!userEmail) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/orders/${userEmail}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [userEmail]);

  
  const generatePDF = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Invoice - Sai Enterprises", 14, 15);
    doc.setFontSize(12);
    doc.text(`Order Date: ${new Date(order.createdAt).toLocaleString()}`, 14, 25);
    doc.text(`Order Status: ${order.status}`, 14, 32);
    doc.text(`Total Amount: ₹${order.totalAmount}`, 14, 39);

    // Shipping address
    autoTable(doc, {
      startY: 45,
      head: [["Shipping Address"]],
      body: [[
        `Name: ${order.shippingAddress.name}
         Email: ${order.shippingAddress.email}
         Phone: ${order.shippingAddress.phone}
         Address: ${order.shippingAddress.address}, ${order.shippingAddress.landmark || "-"},
         ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.pincode}, ${order.shippingAddress.country}`
      ]],
      theme: "plain"
    });

    // Products table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Product", "Price (₹)", "Quantity"]],
      body: order.cart.map(item => [item.name, item.price, item.quantity]),
    });

    doc.save(`Invoice_${order._id}.pdf`);
  };

  return (
    <>
      <Navbar />
    
      <div className="p-4">
        <h1 className="text-xl capitalize font-bold mb-4">Your Orders</h1>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="card bg-base-100 capitalize shadow-md mb-6">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h2 className="card-title text-lg">Order Summary</h2>
                  <button
                    onClick={() => generatePDF(order)}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Download Invoice
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm mt-2">
                  <p><strong>Total Amount:</strong> <span className="text-success">₹{order.totalAmount}</span></p>
                  <p><strong>Status:</strong> <span className="badge">{order.status}</span></p>
                  <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                </div>

                {/* Shipping Address */}
                <div className="mt-4">
                  <h3 className="font-semibold text-md mb-2">Shipping Address</h3>
                  <div className="overflow-x-auto">
                    <table className="table table-sm w-full">
                      <tbody>
                        <tr><th>Contact Info</th>
                          <td>
                            {order.shippingAddress.name}, &nbsp;
                            {order.shippingAddress.phone}, &nbsp;
                            {order.shippingAddress.email}
                          </td>
                        </tr>
                        <tr><th>Address</th>
                          <td>
                            {order.shippingAddress.address}, &nbsp;
                            {order.shippingAddress.landmark || "—"}, &nbsp;
                            {order.shippingAddress.pincode}, &nbsp;
                            {order.shippingAddress.city},&nbsp;
                            {order.shippingAddress.state},&nbsp;
                            {order.shippingAddress.country}
                          </td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Products Table */}
                <div className="mt-6">
                  <h3 className="font-semibold text-md mb-2">Products</h3>
                  <div className="overflow-x-auto">
                    <table className="table table-sm table-zebra w-full">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price (₹)</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.cart.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Orders;

