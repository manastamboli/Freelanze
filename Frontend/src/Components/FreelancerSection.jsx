import React from "react";

const FreelancerSection = () => {
  return (
    <div className="flex items-center h-screen justify-between bg-blue-50 p-5">
      <div className="w-full lg:w-1/2">
        <img
          src="lady.png"
          alt="Freelancer"
          className="w-full h-auto rounded-lg"
        />
      </div>
      <div className="mt-8 lg:mt-0 lg:ml-8 max-w-xl">
        <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-5">
          Find The Best <span className="text-blue-500">Freelancers</span> Here
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat
          bibendum ornare urna, cursus eget convallis. Feugiat imperdiet posuere
          justo, ultrices interdum sed orci nunc, mattis. Lorem ipsum, dolor sit
          amet consectetur adipisicing elit. Doloribus, quae quis. Perferendis
          illo officia veritatis repellendus a, voluptatibus delectus sit,
          temporibus facere fugit, aperiam maiores! Harum adipisci praesentium
          reprehenderit optio.
        </p>
        <div className="flex gap-5">
          <div className="text-center">
            <h3 className="text-2xl text-blue-500 mb-1">500+</h3>
            <p className="text-lg text-gray-600">freelancers</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl text-blue-500 mb-1">300+</h3>
            <p className="text-lg text-gray-600">freelance work Posted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerSection;