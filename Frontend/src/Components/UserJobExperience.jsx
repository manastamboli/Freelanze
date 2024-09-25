import axios from "axios";
import React, { useState,useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function UserJobExperience() {
  const navigate = useNavigate()
    useEffect(()=>{
        console.log(Cookies.get('accessToken'))
      },[])
  const [roles, setRoles] = useState({
    role1: {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      isCurrentlyWorking: false,
    },
  });

  const handleAddRole = () => {
    const newRoleKey = `role${Object.keys(roles).length + 1}`;
    setRoles({
      ...roles,
      [newRoleKey]: {
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        isCurrentlyWorking: false,
      },
    });
  };

  const handleRoleChange = (roleKey, field, value) => {
    setRoles({
      ...roles,
      [roleKey]: {
        ...roles[roleKey],
        [field]: value,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      console.log(Cookies.get('accessToken'));
      
        const response = await axios.post('http://localhost:3000/api/getExperience', {roles}, {
         
            headers: {
                'Content-Type': 'application/json'
            }
        });
        navigate('/')
        // Check if the request was successful
        if (response.data && response.data.success) {
            console.log("Experience added successfully:", response.data);
        } else {
            console.error("Error adding experience:", response.data.message || "Unknown error");
        }
    } catch (error) {
        // Log any error that occurred during the API call
        if (error.response) {
            // Server responded with a status other than 200 range
            console.error("Error response from server:", error.response.data);
            console.error("Status code:", error.response.status);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No response received:", error.request);
        } else {
            // Something happened in setting up the request
            console.error("Error in setting up the request:", error.message);
        }
    }
    
    console.log("Submitted roles:", roles);
};

  return (
    <div className="p-20 max-lg:p-10 max-sm:p-1">
      <div className="container px-14 py-8 w-5/6 max-lg:w-full max-sm:w-full">
        <h1 className="text-4xl font-bold mb-4 text-left text-blue-500 max-sm:text-xl">
          Add your experience
        </h1>
        <p className="text-gray-800 mb-2 text-left">
          You can change and add more experience later in your profile page.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {Object.keys(roles).map((roleKey, index) => (
            <div key={roleKey} className="border-t border-gray-300 pt-4 mt-4">
              {Object.keys(roles).length > 1 && (
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {`Experience ${index + 1}`}
                </h2>
              )}
              <div className="flex gap-6 max-sm:block">
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor={`title-${roleKey}`}
                    className="text-gray-700 text-md font-medium">
                    Title
                  </label>
                  <input
                    type="text"
                    id={`title-${roleKey}`}
                    className="border border-gray-300 px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={roles[roleKey].title}
                    onChange={(e) =>
                      handleRoleChange(roleKey, "title", e.target.value)
                    }
                    placeholder="Enter your Position or title"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor={`company-${roleKey}`}
                    className="text-gray-700 text-md font-medium">
                    Company
                  </label>
                  <input
                    type="text"
                    id={`company-${roleKey}`}
                    className="border border-gray-300 px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={roles[roleKey].company}
                    onChange={(e) =>
                      handleRoleChange(roleKey, "company", e.target.value)
                    }
                    placeholder="Enter Company Name"
                  />
                </div>
              </div>

              <div className="flex gap-6 max-sm:block">
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor={`startDate-${roleKey}`}
                    className="text-gray-700 text-md font-medium">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id={`startDate-${roleKey}`}
                    className="border border-gray-300 px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={roles[roleKey].startDate}
                    onChange={(e) =>
                      handleRoleChange(roleKey, "startDate", e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor={`endDate-${roleKey}`}
                    className="text-gray-700 text-md font-medium">
                    End Date
                  </label>
                  <input
                    type="date"
                    id={`endDate-${roleKey}`}
                    className="border border-gray-300 px-4 py-2 mb-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    value={roles[roleKey].endDate}
                    onChange={(e) =>
                      handleRoleChange(roleKey, "endDate", e.target.value)
                    }
                    disabled={roles[roleKey].isCurrentlyWorking}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id={`isCurrentlyWorking-${roleKey}`}
                  className="form-checkbox h-5 w-5 text-blue-600 max-sm:h-4 max-sm:w-4"
                  checked={roles[roleKey].isCurrentlyWorking}
                  onChange={(e) =>
                    handleRoleChange(
                      roleKey,
                      "isCurrentlyWorking",
                      e.target.checked
                    )
                  }
                />
                <label
                  htmlFor={`isCurrentlyWorking-${roleKey}`}
                  className="text-gray-700 font-bold max-lg:text-md max-sm:text-sm">
                  I am Currently Working with this Role
                </label>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddRole}
            className="text-blue-500 font-semibold mt-4">
            + Add New Role
          </button>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="bg-gray-200 text-gray-700 font-semibold py-2 px-8 rounded-full border border-gray-300 hover:bg-gray-300">
              Back
            </button>
            <div className="flex gap-4">
              <button
                type="button"
                className="bg-gray-200 text-gray-700 font-semibold py-2 px-8 rounded-full border border-gray-300 hover:bg-gray-300">
                Skip
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-8 rounded-full hover:bg-blue-600">
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserJobExperience;