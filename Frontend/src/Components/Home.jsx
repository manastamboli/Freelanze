import React from "react";
import WorkingRemotely from "../Images/WorkingRemotely.png";
import Navbar from "./Navbar";
import FeatureSteps from "./FeatureSteps";
import FreelancerSection from "./FreelancerSection";

function Home() {
  return (
    <div className="bg-blue-50 px-20 py-8 max-sm:px-2 max-md:px-4">
      <Navbar />
      <div className="h-full flex items-center justify-center py-3 px-20 bg-transparent mb-5">
        <div className="flex flex-col">
          <div className="mb-28 max-lg:mb-10">
            <h1 className="text-6xl font-bold mb-5">
              Are you looking for Freelancers?
            </h1>
            <p className="text-xl text-slate-800">
              Hire great Freelancers, Fast. Spacelance helps you hire elite
              freelancers at a movement's notice
            </p>
          </div>
          <div>
            <button className="py-3 px-5 bg-blue-500 text-white mb-5 rounded-lg font-semibold text-lg mr-4 shadow-md">
              Hire a freelancer
            </button>
            <input
              type="text"
              placeholder="Search freelance work"
              className="py-3 px-5 rounded-lg shadow-md w-80"
            />
          </div>
        </div>
        <div className="justify-start max-lg:hidden">
          {" "}
          <img
            src={WorkingRemotely}
            alt="Description of the image"
            style={{ width: "700px", height: "500px" }}
          />{" "}
        </div>
      </div>
      {/* <FeatureSteps />
      <FreelancerSection /> */}
    </div>
  );
}

export default Home;