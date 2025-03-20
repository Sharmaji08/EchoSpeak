import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-6">🌍 About Me</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg text-center">
        <h3 className="text-2xl font-semibold">Rahul Sharma</h3>
        <p className="text-gray-400 mt-2">MCA Student | Web Developer | Problem Solver</p>

        <div className="mt-4">
          <p className="text-gray-300">📍 SRM University, Delhi-NCR</p>
          <p className="text-gray-300">📧 Email: rahulsharma@email.com</p>
          <p className="text-gray-300">📞 Phone: +91 721******</p>
        </div>

        <div className="mt-4">
          <a href="https://github.com/yourgithub" target="_blank" className="text-blue-400 hover:underline">GitHub</a> |
          <a href="https://linkedin.com/in/yourlinkedin" target="_blank" className="text-blue-400 hover:underline"> LinkedIn</a>
        </div>
      </div>
    </div>
  );
};

export default About;
