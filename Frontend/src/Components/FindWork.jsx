import React, { useState } from "react";
import { FaClock, FaUser, FaClipboardList, FaTags } from "react-icons/fa";
import Navbar from "./Navbar";

const categories = [
  "All",
  "Website, IT & Software",
  "Writing and Content",
  "Design, Media & Architecture",
  "Data Entry & Admin",
  "Engineering & Science",
  "Finance & Accounting",
  "Marketing & Sales",
  "Business Development",
  "Education & Training",
  "Manual Labor & Services",
];

const skills = [
  "All",
  "Website Design",
  "Front-end Development",
  "Back-end Development",
  "SEO Optimization",
  "Content Management",
  "Network Administration",
  "IT Support",
  "Cybersecurity",
  "Cloud Computing",
  "Database Management",
  "Software Engineering",
  "Application Development",
  "Software Testing",
  "System Design",
  "DevOps",
  "Content Writing",
  "Copywriting",
  "Technical Writing",
  "Creative Writing",
  "Editing & Proofreading",
  "Graphic Design",
  "Video Editing",
  "3D Modeling",
  "Architecture Design",
  "UI/UX Design",
  "Data Entry",
  "Administrative Assistance",
  "Virtual Assistance",
  "Customer Service",
  "Data Management",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Chemistry Research",
  "Physics Research",
  "Accounting",
  "Financial Analysis",
  "Tax Preparation",
  "Bookkeeping",
  "Auditing",
  "Digital Marketing",
  "Sales Management",
  "Market Research",
  "Social Media Marketing",
  "SEO & SEM",
  "Strategic Planning",
  "Business Analysis",
  "Project Management",
  "Partnerships",
  "Growth Strategy",
  "Tutoring",
  "Curriculum Development",
  "Training Programs",
  "Educational Consulting",
  "Teaching",
  "Construction",
  "Landscaping",
  "Cleaning Services",
  "Repair Services",
  "Delivery Services",
];

const generateCards = () => {
  const cardData = [];
  categories.forEach((category) => {
    if (category !== "All") {
      skills.forEach((skill, index) => {
        if (skill !== "All" && index < 3) {
          // Limit to 2-3 cards per skill
          cardData.push({
            id: `${category}-${skill}-${index}`,
            title: `${skill} Project`,
            description: `This is a description for a ${skill} project in the ${category} category.`,
            price: `$${(Math.random() * 1000 + 200).toFixed(2)}`,
            category,
            skills: [skill],
            imageUrl: `"https://via.placeholder.com/150"`,
          });
        }
      });
    }
  });
  return cardData;
};

function Findwork() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedProject, setSelectedProject] = useState("All");

  const cards = generateCards();

  const filteredCards = cards.filter((card) => {
    return (
      (selectedCategory === "All" || card.category === selectedCategory) &&
      (selectedSkill === "All" || card.skills.includes(selectedSkill)) &&
      (selectedProject === "All" || card.title === selectedProject)
    );
  });

  return (
    <div className="bg-blue-50 px-20 py-8 max-sm:px-2 max-md:px-4">
      <div className="container mx-auto p-4">
        <Navbar />

        {/* Cover Image */}
        <div
          className="bg-cover bg-center h-64 mb-8"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1200x400')",
          }}>
          <h2 className="text-white text-4xl font-bold p-8">Find Work</h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-start space-x-4 mb-8">
          <div className="relative inline-block text-left">
            <button className="inline-flex justify-center items-center bg-gray-200 px-4 py-2 rounded">
              <FaClock className="mr-2" />
              Sort By
            </button>
          </div>
          <div className="relative inline-block text-left">
            <button className="inline-flex justify-center items-center bg-gray-200 px-4 py-2 rounded">
              <FaUser className="mr-2" />
              Category
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="absolute inset-0 opacity-0">
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </button>
          </div>
          <div className="relative inline-block text-left">
            <button className="inline-flex justify-center items-center bg-gray-200 px-4 py-2 rounded">
              <FaTags className="mr-2" />
              Skill
              <select
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="absolute inset-0 opacity-0">
                {skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </button>
          </div>
          <div className="relative inline-block text-left">
            <button className="inline-flex justify-center items-center bg-gray-200 px-4 py-2 rounded">
              <FaClipboardList className="mr-2" />
              Projects
              <select
                onChange={(e) => setSelectedProject(e.target.value)}
                className="absolute inset-0 opacity-0">
                {[
                  "All",
                  "Website Redesign",
                  "Mobile App",
                  "SEO Optimization",
                ].map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
            </button>
          </div>
        </div>

        {/* Filter Label */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Popular Projects</h3>
          <a href="#" className="text-blue-500 hover:underline">
            See More
          </a>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-5 gap-4 mb-8">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-md flex flex-col justify-between overflow-hidden">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-40 object-cover mb-4 rounded-t-lg"
              />
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
      </div>
    </div>
  );
}

export default Findwork;