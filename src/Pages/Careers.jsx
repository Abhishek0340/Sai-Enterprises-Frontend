import React from 'react';
import Navbar from '../Component/Navbar';
import Footer from '../Component/Footer';

const jobs = [
  {
    title: "Frontend Developer",
    experience: "6 months - 5 years",
    description: "Build responsive and performant UIs using React.js and Tailwind CSS.",
  },
  {
    title: "Backend Developer",
    experience: "6 months - 5 years",
    description: "Develop and maintain REST APIs with Node.js and MongoDB.",
  },
  {
    title: "Full Stack Developer",
    experience: "6 months - 5 years",
    description: "Work across frontend and backend to deliver complete solutions.",
  },
  {
    title: "UI Designer",
    experience: "6 months - 5 years",
    description: "Design engaging interfaces and ensure design consistency across the platform.",
  },
];

export default function Careers() {
  return (
    <>
      <Navbar />
      <div className="h-1/2 bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Join Our Team</h1>
          <p className="text-center mb-10 text-gray-600">Explore exciting career opportunities at Sai Enterprises</p>
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                <h2 className="text-2xl font-semibold text-blue-700 mb-2">{job.title}</h2>
                <p className="text-sm text-gray-500 mb-2">
                  Experience: {job.experience}
                </p>
                <p className="text-gray-700 mb-4">
                  {job.description}
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <a href="mailto:careers@sai-enterprises.com">Apply Now</a>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
