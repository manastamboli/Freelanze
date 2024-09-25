import React, { useState } from "react";
// import Skill from "../Images/Skill.png";

function AboutYourself() {
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Job Title:", jobTitle);
    console.log("Description:", description);
  };
  return (
    <div className="p-20 flex">
      <div className="w-3/5 px-14">
        <h1 className="text-4xl font-bold text-blue-500 mt-6 mb-14">
          Tell us a bit about yourself...
        </h1>
        <div className="px-9">
          <form onSubmit={handleSubmit}>
            <div className="mb-12">
              <label
                htmlFor="job-title"
                className="block text-gray-700 font-normal mb-2 text-3xl">
                What do you do?
              </label>
              <input
                type="text"
                id="job-title"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Eg: Web Developer"
                value={jobTitle}
                onChange={handleJobTitleChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-normal mb-2 text-3xl">
                Describe Yourself
              </label>
              <textarea
                id="description"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                placeholder="Showcase your top skills, strengths, and experiences, highlighting the unique services you offer. Let us know what sets you apart..."
                value={description}
                onChange={handleDescriptionChange}></textarea>
            </div>

            <div className="flex justify-between">
              <button className="bg-gray-300 hover:bg-gray-400 text-blue-500 font-bold py-2 px-10 rounded-full focus:outline-none focus:shadow-outline">
                Back
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full focus:outline-none focus:shadow-outline">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-8">
        <div className=" rounded-md">
          {/* <img src={Skill} /> */}
        </div>
      </div>
    </div>
  );
}

export default AboutYourself;