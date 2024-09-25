import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProjectRequest() {
  const [skills, setSkills] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const handleSkillsChange = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
  
      if (skills.trim() !== "" && !tags.includes(skills.trim())) {
        setTags(prevTags => {
          const updatedTags = [...prevTags, skills.trim()];
          console.log("Updated tags: ", updatedTags);
          return updatedTags;
        });
      }
  
      setSkills("");
    }
  };
  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFiles([file]);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Convert amount to a number
    const amountNumber = Number(amount);
    
    if (isNaN(amountNumber)) {
      console.log("Amount must be a valid number");
      return;
    }
    
    // Filter out any empty or undefined values from the tags array
    const filteredTags = tags.filter(tag => tag.trim() !== '');
    console.log(filteredTags);
    
    // Create the project object with FormData
    const formData = new FormData();
    formData.append('title', projectName);
    formData.append('description', description);
    formData.append('amount', amountNumber);
    
    filteredTags.forEach((tag) => formData.append('skillsRequired[]', tag));  // Send filtered skills
  
    if (files.length > 0) {
      formData.append('thumnail', files[0]);  // Append the file
    }
    
    try {
      const data = await axios.post('https://freelanze-backend.onrender.com/addjob', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from backend:', data);
      navigate("/marketplace");
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="p-20 max-lg:p-10 max-sm:p-1">
      <div
        className="container mx-auto p-14 flex flex-col"
        style={{ paddingTop: "30px" }}>
        <div className="flex justify-between gap-8">
          <div className="w-1/2">
            <h1 className="text-3xl font-bold text-blue-500 mb-4 text-left">
              Tell us what you need done.
            </h1>
            <p className="text-gray-600 mb-8 text-left">
              Provide us the proper specification regarding the project.
            </p>

            <div className="mb-4 text-left">
              <label
                htmlFor="skills"
                className="block text-gray-700 text-sm font-bold mb-2">
                What kind of skills do you require?
              </label>
              <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex flex-wrap">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-gray-800 rounded-full px-3 py-1 mr-2 mb-2 text-sm flex items-center">
                    {tag}
                    <button
                      type="button"
                      className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
                      onClick={() => removeTag(index)}>
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 8.586L15.293 3.293a1 1 0 011.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 011.414-1.414L10 8.586z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                <input
                  id="skills"
                  className="focus:outline-none flex-grow"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  onKeyDown={handleSkillsChange}
                  placeholder="Enter your expected skills."
                />
              </div>
            </div>
            <div className="mb-4 text-left">
              <label
                htmlFor="projectName"
                className="block text-gray-700 text-sm font-bold mb-2">
                Project name
              </label>
              <input
                type="text"
                id="projectName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={projectName}
                onChange={handleProjectNameChange}
                placeholder="Add a project title."
              />
            </div>
            <div className="mb-4 text-left">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2">
                Project description
              </label>
              <textarea
                id="description"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Describe your project briefly."
              />
            </div>
          </div>
          <div className="w-1/3 flex flex-col items-center justify-center">
            <label
              htmlFor="files"
              className="flex flex-col items-center justify-center w-full h-64 bg-gray-200 cursor-pointer hover:bg-gray-300">
              {files.length === 0 ? (
                <div className="flex flex-col items-center">
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                  </svg>
                  <span className="mt-2 text-sm leading-normal">Upload</span>
                </div>
              ) : (
                <img
                  src={URL.createObjectURL(files[0])}
                  alt="Preview"
                  className="w-full h-auto"
                  style={{ aspectRatio: "4/3" }}
                />
              )}
              <input
                type="file"
                id="files"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            <p className="mt-4 text-gray-600 text-sm text-center">
              Drag and drop any images or documents that might be helpful in
              explaining your brief (Max: 25 MB).
            </p>

            <div className="w-full border-red-100 border-solid mt-5">
              <h2 className="block text-gray-700 text-md font-bold mb-2">
                Set your money value
              </h2>
              <input
                type="number"
                placeholder="Enter your amount"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleAmountChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Back
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectRequest;

