import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../..";
import { toast } from "react-toastify";

const Solution = () => {
  const [solutions, setSolutions] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/solution", {
          withCredentials: true,
        });
        setSolutions(response.data.data);
      } catch (error) {
        console.error("Error fetching solutions:", error);
      }
    };

    fetchSolutions();
  }, []);

  const handleDeleteSolution = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/solution/delete/${id}`, {
        withCredentials: true,
      });
      setSolutions(solutions.filter((item) => item._id !== id));
      toast.success("Service deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page">
      <div className="flex flex-col justify-center items-center head_text text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-red-700">Solutions</h1>
      </div>
      <div className="flex items-center justify-between mt-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-8 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
              />
            </svg>
          </div>
        </div>
        <Link
          to="/create_solution"
          className="btn btn-primary bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2 ml-1 text-white"
        >
          Add Solution
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Published
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Main Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {solutions && solutions.length > 0 ? (
              solutions.map((solution) => (
                <tr key={solution._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {solution.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {solution.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {solution.createdBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {solution.published ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <img
                      src={solution.mainImage && solution.mainImage.url}
                      alt={solution.title}
                      className="w-12 h-12 object-cover rounded-full img-zoom"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <button
                      onClick={() => handleDeleteSolution(solution._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 text-center"
                >
                  No Solutions Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Solution;
