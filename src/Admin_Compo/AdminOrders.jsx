
import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import { MdEdit, MdDelete, MdSave  } from "react-icons/md";


export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const ordersPerPage = 15;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.BACKEND_URL}/orders`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleEdit = (orderId, currentStatus) => {
    setEditingOrderId(orderId);
    setNewStatus(currentStatus);
  };

  const handleSaveStatus = async (orderId) => {
    try {
      await axios.put(`${import.meta.env.BACKEND_URL}/orders/${orderId}`, {
        status: newStatus,
      });
      setEditingOrderId(null);
      fetchOrders();
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${import.meta.env.BACKEND_URL}/orders/${orderId}`);
      fetchOrders();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.shippingAddress?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          
        <h2 className="text-2xl font-bold mb-4">Orders</h2>

        <input
          type="text"
          placeholder="Search by Order ID or Name"
          className="input input-bordered capitalize mb-4 w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        </div>

        {currentOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-xs capitalize w-full">
              <thead>
                <tr>
                  <th className="hidden">Order ID</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Shipping</th>
                  <th>Products</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.shippingAddress.email}</td>
                    <td className="hidden">{order._id}</td>
                    <td>₹{order.totalAmount}</td>
                    <td>
                      {editingOrderId === order._id ? (
                        <input
                          className="input input-xs"
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                        />
                      ) : (
                        order.status
                      )}
                    </td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      {order.shippingAddress ? (
                        <>
                          {order.shippingAddress.name}, {order.shippingAddress.phone},{order.shippingAddress.email}
                          <br />
                          {order.shippingAddress.address}, {order.shippingAddress.city} -{" "}
                          {order.shippingAddress.pincode}
                        </>
                      ) : (
                        <span className="text-red-500">Shipping info not available</span>
                      )}
                    </td>
                    <td>
                      <ul className="list-decimal">
                        {order.cart.map((item, idx) => (
                          <li key={idx} className="">
                            {item.name} - ₹{item.price} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="space-y-1">
                      {editingOrderId === order._id ? (
                        <button
                          className="btn btn-sm text-green-500"
                          onClick={() => handleSaveStatus(order._id)}
                        >
                           <MdSave fontSize={18} />
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm text-blue-500"
                          onClick={() => handleEdit(order._id, order.status)}
                        >
                          <MdEdit fontSize={18} />
                        </button>
                      )}
                      <button
                        className="btn btn-sm text-red-600  "
                        onClick={() => handleDelete(order._id)}
                      >
                        <MdDelete fontSize={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`btn btn-xs ${currentPage === index + 1 ? "btn-primary" : "btn-outline"}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
