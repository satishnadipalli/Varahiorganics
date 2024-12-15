import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

const UpdateAdminModel = ({ clickedUser, handleSubmit, setClickedUser, setIsOpen }) => {
  console.log("clicked user",clickedUser)
  // const { loginDetails } = useSelector(state => state.cart);
  const [isAdminYes, setIsAdminYes] = useState(false);
  const [isAdminNo, setIsAdminNo] = useState(false);

  async function handleUpdateSubmit(email) {
    const obj = { email, isAdmin: isAdminYes };

    const response = await fetch("http://localhost:3000/updateIsAdmin", {
      method: "PATCH",
      // headers: {
      //   "Authorization": `Bearer ${loginDetails.token}`,
      //   "Content-Type" : "application/json"
      // },
      body: JSON.stringify(obj)
    });

    if (response.ok) {
      console.log("Updated successfully");
    }
  }

  function handleChange(e) {
    const { value } = e.target;

    if (value === "Yes,i want") {
      setIsAdminYes(true);
      setIsAdminNo(false);
      setIsOpen(false);
    } else if (value === "No i don't") {
      setIsAdminYes(false);
      setIsAdminNo(true);
      setIsOpen(false)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 500,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }} className='top-0 h-screen w-full flex items-center justify-center bg-red-300 absolute'>
      <div className=' font-semibold text-sm grid bg-white p-8'>
        Do you want to make this user Admin
        <div className="flex items-center mb-4 mt-3 ">
          <input
            id="default-radio-1"
            type="radio"
            checked={isAdminYes}
            onChange={() => { setIsAdminYes(true); setIsAdminNo(false); }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes, I want</label>
        </div>
        <div className="flex items-center">
          <input
            id="default-radio-2"
            type="radio"
            checked={isAdminNo}
            onChange={() => { setIsAdminYes(false); setIsAdminNo(true); }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">No, I don't</label>
        </div>

        <div className='w-full flex m-auto mt-8 rounded-xl'>
          <button className="relative inline-flex h-10 items-center justify-center p-0.5 mb-2 me-2 ...">
            <span onClick={()=>setIsOpen(false)} className="relative px-5 py-2.5 transition-all ease-in duration-75 ...">
              Cancel
            </span>
          </button>
          <button onClick={() => handleUpdateSubmit(clickedUser.email)} className="relative inline-flex h-10 items-center justify-center p-0.5 mb-2 me-2 ...">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 ...">
              Save Data
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateAdminModel;
