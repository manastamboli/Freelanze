import React from "react";
import { useState } from "react";
import {
  FaClock,
  FaUser,
  FaClipboardList,
  FaTags,
  FaStar,
} from "react-icons/fa";

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

const hirers = [
  {
    id: 1,
    name: "Tech Solutions Inc.",
    description: "Looking for web developers for multiple projects.",
    location: "New York, USA",
  },
  {
    id: 2,
    name: "Creative Minds",
    description: "Need content writers with SEO skills.",
    location: "London, UK",
  },
  {
    id: 3,
    name: "Design Studios",
    description: "Seeking graphic designers for long-term collaboration.",
    location: "Toronto, Canada",
  },
  // (Include more hirers)
];

const wholeProjects = [
  {
    id: 1,
    title: "Full E-commerce Website Development",
    description:
      "Build a full-featured e-commerce website with payment integration.",
    budget: "$5000",
    duration: "3-4 months",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "Custom CRM Software Development",
    description: "Develop a custom CRM solution tailored to business needs.",
    budget: "$8000",
    duration: "6 months",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "Mobile App Development for Delivery Service",
    description: "Create a cross-platform mobile app for delivery services.",
    budget: "$7000",
    duration: "4-5 months",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  // (Include more whole projects)
];

const freelancers = [
  {
    id: "1",
    name: "Aditya Sawant",
    skills: ["Web Design", "UI/UX Design"],
    rating: 4.8,
    photo: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Krish Naik",
    skills: ["Front-end Development", "JavaScript"],
    rating: 4.6,
    photo: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Yuvraj Dogra",
    skills: ["Back-end Development", "Python"],
    rating: 4.7,
    photo: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Prathmesh Patil",
    skills: ["SEO Optimization", "Content Writing"],
    rating: 4.9,
    photo: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    name: "Manas Tamboli",
    skills: ["Graphic Design", "Illustration"],
    rating: 4.5,
    photo: "https://via.placeholder.com/150",
  },
  {
    id: "6",
    name: "Anushree Chorghe",
    skills: ["Database Management", "SQL"],
    rating: 4.8,
    photo: "https://via.placeholder.com/150",
  },
  {
    id: "7",
    name: "Vishakha Gite",
    skills: ["Marketing", "Social Media"],
    rating: 4.7,
    photo: "https://via.placeholder.com/150",
  },
  {
    id: "8",
    name: "Mansi Naik",
    skills: ["Marketing", "Social Media"],
    rating: 4.7,
    photo: "https://via.placeholder.com/150",
  },
  {
    id: "9",
    name: "Paras Devrukhkar",
    skills: ["Marketing", "Social Media"],
    rating: 4.7,
    photo: "https://via.placeholder.com/150",
  },
  {
    id: "10",
    name: "New Freelancer 1",
    skills: ["Skill 1", "Skill 2"],
    rating: 4.4,
    photo: "https://via.placeholder.com/150",
  },
  {
    id: "11",
    name: "New Freelancer 2",
    skills: ["Skill 3", "Skill 4"],
    rating: 4.3,
    photo: "https://via.placeholder.com/150",
  },
  {
    id: "12",
    name: "New Freelancer 3",
    skills: ["Skill 5", "Skill 6"],
    rating: 4.2,
    photo: "https://via.placeholder.com/150",
  },
  // Add more freelancer entries as needed
];

const generateCards = () => {
  const cardData = [];
  categories.forEach((category) => {
    if (category !== "All") {
      skills.forEach((skill, index) => {
        if (skill !== "All" && index < 3) {
          // 2-3 cards per skill
          cardData.push({
            id: `${category}-${skill}-${index}`,
            title: `${skill} Project`,
            description: `This is a description for a ${skill} project in the ${category} category.`,
            price: `$${(Math.random() * 1000 + 200).toFixed(2)}`,
            category,
            skills: [skill],
            imageUrl: "https://via.placeholder.com/150",
          });
        }
      });
    }
  });
  return cardData;
};

function FreelancerMarket() {
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

  const displayCards = (section) => {
    const cardsPerSection = 10;
    return filteredCards
      .slice(0, cardsPerSection)
      .filter((card) => card.title.includes(section));
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
          {displayCards("Project").map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
              <div
                className="w-full h-40 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${card.imageUrl})`,
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

      {/* Whole Projects Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Whole Projects</h3>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {wholeProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
              <div
                className="w-full h-40 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${project.imageUrl})`,
                }}></div>
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-500 font-bold">
                    {project.budget}
                  </span>
                  <span className="text-gray-500">{project.duration}</span>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-full">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <a href="#" className="text-blue-500 hover:underline">
          See More
        </a>
      </div>

      {/* Search by Hirers Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4">Search by Hirers</h3>
        <div className="grid grid-cols-5 gap-4 mb-8">
          {hirers.map((hirer) => (
            <div
              key={hirer.id}
              className="bg-white rounded-xl shadow-md flex flex-col overflow-hidden">
              <div className="p-4 flex flex-col justify-between flex-grow">
                <h4 className="text-lg font-bold mb-2">{hirer.name}</h4>
                <p className="text-gray-700 mb-4">{hirer.description}</p>
                <p className="text-sm text-gray-500 mb-4">{hirer.location}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                  View Profile
                </button>
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
}

export default FreelancerMarket;