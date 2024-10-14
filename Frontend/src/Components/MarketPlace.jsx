import React, { useEffect, useState } from "react";
import axios from "axios";

const Marketplace = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch project data from the backend API using axios
    axios
      .get("https://freelanze-backend.onrender.com/api/getjobs",{
        withCredentials: true // This ensures cookies are sent in cross-origin requests
      })
      .then((response) => {
        // Update state with the fetched data
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, []);

  // Placeholder function to return the formatted project data
  const displayCards = () => {
    console.log("this is from cloudinary",projects.thumnail)
    return projects.map((project, index) => ({
      id: index,
      title: project.title,
      description: project.description,
      price: `$${project.amount}`,
      imageUrl: project.thumnail,
      skills: Array.isArray(project.skillsRequired) ? project.skillsRequired : [project.skillsRequired],
    }));
  };

  return (
    <div className="container mx-auto p-4">
      {/* Cover Image */}
      <div
        className="bg-cover bg-center h-64 mb-8"
        style={{
          backgroundImage: "url('https://via.placeholder.com/1200x400')",
        }}>
        <h2 className="text-white text-4xl font-bold p-8">
          Welcome to the Marketplace
        </h2>
      </div>

      {/* New Gigs Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">New Gigs</h3>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {displayCards().map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
              <div
                className="w-full h-40 bg-cover bg-center"
                style={{
                  backgroundImage: `${card.imageUrl})`,
                }}></div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h4 className="text-lg font-bold mb-2">{card.title}</h4>
                <div className="flex flex-wrap gap-2 mb-2">
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{card.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-500 font-bold">{card.price}</span>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <a href="#" className="text-blue-500 hover:underline">
          See More
        </a>
      </div>
    </div>
  );
};

export default Marketplace;
