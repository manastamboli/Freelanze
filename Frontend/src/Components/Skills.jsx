import axios from "axios";
import React, { useState,useEffect} from "react";
import {
  FaCode,
  FaPen,
  FaImage,
  FaDatabase,
  FaIndustry,
  FaDollarSign,
  FaLightbulb,
  FaBook,
  FaTools,
  FaFileAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Skills() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    setUserSkills([...selectedSkills]);
  }, [selectedSkills]);


 async function handleNextRoute() {
    console.log(userSkills); // you will get the array of skills when user will click on Next button
   await axios.post('http://localhost:3000/api/getSkills',userSkills)
    navigator("/jobexperience");
  }

  

  const handleSkillChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const skills = {
    "Website, IT & Software": [
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
    ],
    "Writing and Content": [
      "Content Writing",
      "Copywriting",
      "Technical Writing",
      "Creative Writing",
      "Editing & Proofreading",
    ],
    "Design, Media & Architecture": [
      "Graphic Design",
      "Video Editing",
      "3D Modeling",
      "Architecture Design",
      "UI/UX Design",
    ],
    "Data Entry & Admin": [
      "Data Entry",
      "Administrative Assistance",
      "Virtual Assistance",
      "Customer Service",
      "Data Management",
    ],
    "Engineering & Science": [
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "Chemistry Research",
      "Physics Research",
    ],
    "Finance & Accounting": [
      "Accounting",
      "Financial Analysis",
      "Tax Preparation",
      "Bookkeeping",
      "Auditing",
    ],
    "Marketing & Sales": [
      "Digital Marketing",
      "Sales Management",
      "Market Research",
      "Social Media Marketing",
      "SEO & SEM",
    ],
    "Business Development": [
      "Strategic Planning",
      "Business Analysis",
      "Project Management",
      "Partnerships",
      "Growth Strategy",
    ],
    "Education & Training": [
      "Tutoring",
      "Curriculum Development",
      "Training Programs",
      "Educational Consulting",
      "Teaching",
    ],
    "Manual Labor & Services": [
      "Construction",
      "Landscaping",
      "Cleaning Services",
      "Repair Services",
      "Delivery Services",
    ],
  };

  const categories = [
    {
      icon: <FaCode className="text-2xl text-blue-500" />,
      title: "Website, IT & Software",
    },
    {
      icon: <FaPen className="text-2xl text-blue-500" />,
      title: "Writing and Content",
    },
    {
      icon: <FaImage className="text-2xl text-blue-500" />,
      title: "Design, Media & Architecture",
    },
    {
      icon: <FaDatabase className="text-2xl text-blue-500" />,
      title: "Data Entry & Admin",
    },
    {
      icon: <FaIndustry className="text-2xl text-blue-500" />,
      title: "Engineering & Science",
    },
    {
      icon: <FaDollarSign className="text-2xl text-blue-500" />,
      title: "Finance & Accounting",
    },
    {
      icon: <FaLightbulb className="text-2xl text-blue-500" />,
      title: "Marketing & Sales",
    },
    {
      icon: <FaBook className="text-2xl text-blue-500" />,
      title: "Business Development",
    },
    {
      icon: <FaTools className="text-2xl text-blue-500" />,
      title: "Education & Training",
    },
    {
      icon: <FaFileAlt className="text-2xl text-blue-500" />,
      title: "Manual Labor & Services",
    },
  ];

  return (
    <div>
      <div className="px-40 pt-24">
        <h1 className="text-4xl text-blue-500 font-bold mb-7">
          Tell us what you're greate at...
        </h1>
        <input
          type="text"
          placeholder="Search your skills here..."
          className="py-3 text-md px-10 mb-10 shadow-md bg-gray-200 text-gray-900 border border-gray-300 rounded-full w-4/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div>
          {/* Cards for Categories and Skills */}
          <div className="flex justify-between w-full max-w-[80%]">
            {/* Category Card */}
            <div className="w-[46%] h-[350px] bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
              <div className="sticky top-0 bg-gray-100 border-b border-gray-300 p-4">
                <h2 className="text-lg font-semibold text-gray-700 text-left">
                  Select a Category
                </h2>
              </div>
              <div className="h-[calc(100%-64px)] overflow-y-auto">
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li
                      key={category.title}
                      className={`flex items-center justify-between px-4 py-2 bg-white rounded-none hover:bg-gray-200 cursor-pointer ${
                        selectedCategory === category.title
                          ? "bg-blue-100"
                          : "bg-white"
                      }`}
                      onClick={() => handleCategoryChange(category.title)}>
                      <span className="flex items-center gap-2">
                        {category.icon}
                        {category.title}
                      </span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Skills Card */}
            <div className="w-[48%] h-[350px] bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden">
              <div className="sticky top-0 bg-gray-100 border-b border-gray-300 p-4">
                <h2 className="text-lg font-semibold text-gray-700 text-left">
                  Select Your Skills
                </h2>
              </div>
              <div className="h-[calc(100%-64px)] overflow-y-auto">
                <ul className="space-y-2">
                  {selectedCategory &&
                    skills[selectedCategory]?.map((skill, index) => (
                      <React.Fragment key={skill}>
                        <li
                          className="flex items-center px-4 py-2 bg-white border-none rounded-none hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSkillChange(skill)}>
                          <input
                            type="checkbox"
                            checked={selectedSkills.includes(skill)}
                            onChange={() => handleSkillChange(skill)}
                            className="mr-2"
                          />
                          {skill}
                        </li>
                        {index < skills[selectedCategory].length - 1 && (
                          <hr className="border-gray-300 my-2" />
                        )}
                      </React.Fragment>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end w-4/5">
          <button
            className="px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => handleNextRoute()}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Skills;