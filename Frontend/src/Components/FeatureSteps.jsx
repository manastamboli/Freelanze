import React from "react";

const FeatureSteps = () => {
  console.log(Cookies.get('accessToken'))
  return (
    <div className="flex justify-around align-middle p-5 bg-white shadow-lg rounded-lg max-lg:flex-wrap mb-4">
      <div className="text-center p-5 max-w-xs">
        <div className="mb-2 flex justify-center">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/lock.png"
            alt="Create Account"
            className="w-12 h-12"
          />
        </div>
        <h3 className="text-lg mb-2">Create Account</h3>
        <p className="text-base text-gray-500 break-words">
          First you have to create an account here
        </p>
      </div>
      <div className="text-center p-5 max-w-xs">
        <div className="mb-2 flex justify-center">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/search.png"
            alt="Search Work"
            className="w-12 h-12"
          />
        </div>
        <h3 className="text-lg mb-2">Search Work</h3>
        <p className="text-base text-gray-500 break-words">
          Search the best freelance work here
        </p>
      </div>
      <div className="text-center p-5 max-w-xs">
        <div className="mb-2 flex justify-center">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/checked.png"
            alt="Save and Apply"
            className="w-12 h-12"
          />
        </div>
        <h3 className="text-lg mb-2">Save and Apply</h3>
        <p className="text-base text-gray-500 break-words">
          Apply or save and start your work
        </p>
      </div>
    </div>
  );
};

export default FeatureSteps;