import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";

export default function ContactForm() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.BACKEND_URL}/contacts`);
        setContacts(res.data);
      } catch (error) {
        console.error("Error fetching contact submissions:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Contact Form Submissions</h2>
        {contacts.length === 0 ? (
          <p>No contact submissions found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-xs w-full">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={index}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
