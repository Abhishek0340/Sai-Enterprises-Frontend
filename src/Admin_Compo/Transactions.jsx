import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";
import { MdEdit, MdDelete, MdSave  } from "react-icons/md";


function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    setLoading(true);
    axios
      .get(`https://sai-enterprises-backend.onrender.com/stored-transactions`)
      .then((res) => {
        const uniqueTxns = Array.from(
          new Map(res.data.map((txn) => [txn._id, txn])).values()
        );
        setTransactions(uniqueTxns);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching transactions:", err);
        setLoading(false);
      });
  };

  const handleEdit = (id, currentStatus) => {
    setEditId(id);
    setEditedStatus(currentStatus);
  };

  const handleSave = (id) => {
    axios
      .put(`https://sai-enterprises-backend.onrender.com/stored-transactions/${id}`, { status: editedStatus })
      .then(() => {
        setEditId(null);
        fetchTransactions();
      })
      .catch((err) => console.error("Error updating transaction:", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://sai-enterprises-backend.onrender.com/stored-transactions/${id}`)
      .then(() => fetchTransactions())
      .catch((err) => console.error("Error deleting transaction:", err));
  };

  const filteredTransactions = transactions.filter((txn) =>
    txn.name?.toLowerCase().includes(search.toLowerCase()) ||
    txn.email?.toLowerCase().includes(search.toLowerCase()) ||
    txn.phone?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  
  return (
    <AdminLayout>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Transactions</h2>
          <input
            type="text"
            placeholder="Search by name, email or phone"
            className="input input-bordered input-sm w-64"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset page on search
            }}
          />
        </div>

        <div className="overflow-auto rounded">
          <table className="table table-xs capitalize1qaq w-full">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((txn) => (
                <tr key={txn._id}>
                  <td>{txn.name || "N/A"}</td>
                  <td>{txn.email || "N/A"}</td>
                  <td>{txn.phone || "N/A"}</td>
                  <td>₹ {txn.amount.toFixed(2)}</td>
                  <td>
                    {editId === txn._id ? (
                      <input
                        className="input input-sm input-bordered"
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                      />
                    ) : (
                      txn.status
                    )}
                  </td>
                  <td>{new Date(txn.created).toLocaleString()}</td>
                  <td className="space-x-1">
                    {editId === txn._id ? (
                      <button
                        className="btn btn-sm text-green-500"
                        onClick={() => handleSave(txn._id)}
                      >
                        <MdSave fontSize={18} />
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm text-blue-500"
                        onClick={() => handleEdit(txn._id, txn.status)}
                      >
                        <MdEdit fontSize={18} />

                      </button>
                    )}
                    <button
                      className=" btn btn-sm text-red-500"
                      onClick={() => handleDelete(txn._id)}
                    >
                      <MdDelete fontSize={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              className="btn btn-xs"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`btn btn-xs ${currentPage === index + 1 ? "btn-primary" : ""}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="btn btn-xs"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Transactions;
