import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../..";

const CreateSolution = () => {
    const { mode } = useContext(Context);

    const [solutionData, setSolutionData] = useState({
      category: "",
      mainImage: "",
      intro: "",
      paraOneTitle: "",
      paraOneImage: "",
      paraOneDescription: "",
      paraTwoTitle: "",
      paraTwoImage: "",
      paraTwoDescription: "",
      paraThreeTitle: "",
      paraThreeImage: "",
      paraThreeDescription: "",
      mainImagePreview: "",
      paraOneImagePreview: "",
      paraTwoImagePreview: "",
      paraThreeImagePreview: "",
      title: "",
      published: true,
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSolutionData({ ...solutionData, [name]: value });
    };
    
    const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setSolutionData({ ...solutionData, [name]: checked });
    };
    
    const handleFileChange = (e, imageType, previewType) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSolutionData({
          ...solutionData,
          [imageType]: file,
          [previewType]: reader.result,
        });
      };
    };
    
    const handleCreate = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      for (const key in solutionData) {
        formData.append(key, solutionData[key]);
      }
      try {
        const { data } = await axios.post(
          `http://localhost:4000/api/solution`,
          formData,
          { withCredentials: true }
        );
        toast.success(data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className="update-blog">
        <h3 className="text-xl font-bold mb-4">Create SOLUTION</h3>
        <form className="max-w-lg">
          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={solutionData.category}
              onChange={handleChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value="">Select Solution Category</option>
              <option value="lo hoi">lo hoi</option>
              <option value="Technology">Technology</option>
              <option value="Sports">Sports</option>
              <option value="Travel">Travel</option>
              <option value="Business">Business</option>
              <option value="Economy">Economy</option>
            </select>
          </div>
          {/* Title */}
          <label htmlFor="caption" className="block font-medium">
            Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Solution Main Title"
            value={solutionData.title}
            onChange={handleChange}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {/* Main Image */}
          <div className="flex flex-col gap-4 mt-4">
            <label className="block text-gray-700">Solution Main Image</label>
            <img
              src={solutionData.mainImagePreview || (solutionData.mainImage ? solutionData.mainImage : "/imgPL.webp")}
              alt="mainImage"
              className="w-full h-auto"
            />
            <input
              type="file"
              onChange={(e) => handleFileChange(e, "mainImage", "mainImagePreview")}
              className="block w-full"
            />
          </div>
          <label htmlFor="caption" className="block font-medium">
            Intro(Solution intro must contain at least 10 characters!):</label>
          <textarea
            rows="5"
            name="intro"
            placeholder="Solution Intro..... (Must contain at least 250 characters!)"
            value={solutionData.intro}
            onChange={handleChange}
            className="block w-full mt-4 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
          {/* Paragraphs */}
          <label htmlFor="caption" className="block font-medium">
          Paragraphs:</label>
          {[1, 2, 3].map((index) => (
            <div key={index} className="sub-para mt-8">
              <input
                type="text"
                placeholder={`Paragraph ${index} title`}
                name={`para${index}Title`}
                value={solutionData[`para${index}Title`]}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            <img
                src={solutionData[`para${index}ImagePreview`] || (solutionData[`para${index}Image`] ? solutionData[`para${index}Image`].url : "/imgPL.webp")}
                alt={`Paragraph ${index}`}
                className="w-full h-auto"
                />
              <input
                type="file"
                onChange={(e) => handleFileChange(e, `para${index}Image`, `para${index}ImagePreview`)}
                className="block w-full"
              />
                Paragraphs
              <textarea
                rows="5"
                placeholder={`Solution ${index} Sub Paragraph Comes Here...`}
                name={`para${index}Description`}
                value={solutionData[`para${index}Description`]}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
          ))}
          {/* Published */}
          <div className="mt-8">
            <label className="block text-gray-700">Published?</label>
            <select
              name="published"
              value={solutionData.published}
              onChange={handleCheckboxChange}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          {/* Update Button */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
            onClick={handleCreate}
          >
            Create
          </button>
        </form>
      </section>
    </article>
  );
};

export default CreateSolution;