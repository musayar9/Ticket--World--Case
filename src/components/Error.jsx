import React from "react";

const Error = ({ message }) => {
  return (
    <div className="flex items-center justify-center mx-auto h-[100vh]">
      <p className="px-4 py-3 bg-red-700 text-gray-50 rounded-lg">{message}</p>
    </div>
  );
};

export default Error;
