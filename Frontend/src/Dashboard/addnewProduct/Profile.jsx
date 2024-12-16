import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { FaUserEdit, FaPhoneAlt, FaLock, FaCamera, FaMedal, FaTrophy, FaCrown } from 'react-icons/fa';

const Profile = ({ handleTab, handleProfile, logouts, tab }) => {
  // const { loginDetails, userLocation, userOrders, rewards,rewardPoints,defaultLocation, cartProducts } = useSelector(state => state.cart);
  // const dispatch = useDispatch();
  // console.log(rewards)
  // const [isEditing, setIsEditing] = useState(false);
  // const [updatedDetails, setUpdatedDetails] = useState({
  //   lastname: loginDetails?.lastname,
  //   phoneNumber: loginDetails?.phoneNumber || '',
  //   password: '',
  //   profilePhoto: null,
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setUpdatedDetails(prevDetails => ({
  //     ...prevDetails,
  //     [name]: value,
  //   }));
  // };

  // const handlePhotoChange = (e) => {
  //   setUpdatedDetails(prevDetails => ({
  //     ...prevDetails,
  //     profilePhoto: e.target.files[0],
  //   }));
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append('lastname', updatedDetails.lastname);
  //   formData.append('phoneNumber', updatedDetails.phoneNumber);
  //   if (updatedDetails.password) {
  //     formData.append('password', updatedDetails.password);
  //   }
  //   if (updatedDetails.profilePhoto) {
  //     formData.append('profilePhoto', updatedDetails.profilePhoto);
  //   }

  //   // Dispatch an action or make an API call to update the user profile
  //   // dispatch(updateUserProfile(formData));

  //   setIsEditing(false); // Close the modal after submitting
  // };

  // const membershipLevel = "Gold"; // Simulating user's current membership level
  // const rewardPointss = rewardPoints;
  // const nextTierPoints = 2700; // Points required for the next tier (example)

  return (
    // <div className="w-full min-h-screen flex flex-col items-center bg-gray-50">
    //   <div className="w-full max-w-5xl p-8 bg-white rounded-3xl shadow-lg mt-10">
    //     <div className="flex gap-12 items-start mb-8">
    //       <div className="w-40 h-40 p-1 border-4 border-blue-400 rounded-full overflow-hidden">
    //         <img
    //           className="w-full h-full object-cover"
    //           src={"https://varahiorganics.onrender.com/uploads/" + loginDetails?.profilePhoto}
    //           alt="Profile"
    //           onError={(e) => {
    //             e.target.src = 'https://th.bing.com/th/id/OIP.TpqSE-tsrMBbQurUw2Su-AHaHk?rs=1&pid=ImgDetMain';
    //           }}
    //         />
    //       </div>
    //       <div className="flex-1">
    //         <div className="flex justify-between items-center mb-6">
    //           <h2 className="text-3xl font-bold text-gray-800">{loginDetails?.lastname}</h2>
    //           <button
    //             onClick={() => setIsEditing(true)}
    //             className="py-2 px-6 text-sm rounded-full font-medium bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 transition-colors"
    //           >
    //             Edit Profile
    //           </button>
    //         </div>
    //         <div className="flex justify-between text-base font-semibold text-gray-700 mb-6">
    //           <span>{userOrders.length} Orders</span>
    //           <span>0 Delivered</span>
    //           <span>{cartProducts.length} Cart Items</span>
    //         </div>
    //         <div className="text-base font-medium text-gray-800 mb-6">
    //           <span className="font-semibold">Email:</span> {loginDetails?.email}
    //         </div>
    //         {defaultLocation ? (
    //           <div className="w-full  p-6 rounded-xl shadow-md border border-gray-200">
    //             <table className="w-full text-base text-gray-600">
    //               <tbody>
    //                 <tr className="border-b">
    //                   <td className="py-2 font-medium">Village</td>
    //                   <td className="py-2 text-right">{defaultLocation.villageName}</td>
    //                 </tr>
    //                 <tr className="border-b">
    //                   <td className="py-2 font-medium">Pincode</td>
    //                   <td className="py-2 text-right">{defaultLocation.pinCode}</td>
    //                 </tr>
    //                 <tr className="border-b">
    //                   <td className="py-2 font-medium">Mandal</td>
    //                   <td className="py-2 text-right">{defaultLocation.mandalName}</td>
    //                 </tr>
    //                 <tr>
    //                   <td className="py-2 font-medium">State</td>
    //                   <td className="py-2 text-right">{defaultLocation.stateName}</td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //           </div>
    //         ) : (
    //           <div className="bg-red-100 p-4 text-center text-red-600 rounded-lg mt-4">
    //             Please add/select Your Default Address
    //           </div>
    //         )}
    //       </div>
    //     </div>

    //     <hr className="my-8 border-gray-300" />

    //     {/* Rewards Section */}
    //     <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg">
    //       <h3 className="text-2xl font-bold mb-6 text-gray-800">Your Rewards</h3>
    //       <div className="flex justify-between items-center mb-8 w-full">
    //         <div className="text-center w-[30%] flex items-center justify-center flex-col">
    //           <FaMedal className="text-yellow-400 text-6xl mb-2" />
    //           <p className="text-lg font-semibold">Points You Have</p>
    //           <p className="text-2xl font-extrabold text-gray-800">{rewardPoints}</p>
    //         </div>
    //         <div className="text-center w-[30%] flex items-center justify-center flex-col">
    //           <FaCrown className="text-yellow-500 text-6xl mb-2" />
    //           <p className="text-lg font-semibold">Membership Level</p>
    //           <p className="text-2xl font-extrabold text-gray-800">{membershipLevel} Member</p>
    //         </div>
    //         <div className="text-center w-[30%] flex items-center justify-center flex-col">
    //           <FaTrophy className="text-green-500 text-6xl mb-2" />
    //           <p className="text-lg font-semibold">Next Level In</p>
    //           <p className="text-2xl font-extrabold text-gray-800">{nextTierPoints - rewardPointss} points</p>
    //         </div>
    //       </div>
    //       {/* Progress Bar */}
    //       <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
    //         <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${(rewardPointss / nextTierPoints) * 100}%` }}></div>
    //       </div>
    //       {/* Exclusive Rewards */}
    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //         <div className="bg-white p-6 bg-green-300 rounded-xl shadow-lg text-center flex items-center justify-center flex-col hover:bg-gray-50 transition duration-300">
    //           <FaUserEdit className="text-blue-600 text-4xl mb-2" />
    //           <p className="text-lg font-semibold text-gray-800">Exclusive Discount</p>
    //         </div>
    //         <div className="bg-white p-6 bg-green-300 rounded-xl shadow-lg text-center flex items-center justify-center flex-col hover:bg-gray-50 transition duration-300">
    //           <FaUserEdit className="text-blue-600 text-4xl mb-2" />
    //           <p className="text-lg font-semibold text-gray-800">Free Shipping</p>
    //         </div>
    //         <div className="bg-white p-6 bg-green-300 rounded-xl shadow-lg text-center flex items-center justify-center flex-col hover:bg-gray-50 transition duration-300">
    //           <FaUserEdit className="text-blue-600 text-4xl mb-2" />
    //           <p className="text-lg font-semibold text-gray-800">VIP Access</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Edit Profile Modal */}
    //   {isEditing && (
    //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center mt-36 justify-center z-50">
    //       <div className="bg-white p-8 rounded-3xl shadow-lg w-[95%] md:w-[30rem]">
    //         <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
    //         <form onSubmit={handleFormSubmit} className="space-y-4">
    //           <div className="w-full">
    //             <label className="text-gray-600 font-medium mb-2">Name</label>
    //             <div className="flex items-center border rounded-lg px-3 py-2">
    //               <FaUserEdit className="text-gray-400 text-2xl" />
    //               <input
    //                 type="text"
    //                 name="lastname"
    //                 value={updatedDetails.lastname}
    //                 onChange={handleInputChange}
    //                 className="w-full outline-none border-none ml-2"
    //                 placeholder="Name"
    //               />
    //             </div>
    //           </div>
    //           <div className="w-full">
    //             <label className="text-gray-600 font-medium mb-2">Phone Number</label>
    //             <div className="flex items-center border rounded-lg px-3 py-2">
    //               <FaPhoneAlt className="text-gray-400 text-2xl" />
    //               <input
    //                 type="text"
    //                 name="phoneNumber"
    //                 value={updatedDetails.phoneNumber}
    //                 onChange={handleInputChange}
    //                 className="w-full outline-none border-none ml-2"
    //                 placeholder="Phone Number"
    //               />
    //             </div>
    //           </div>
    //           <div className="w-full">
    //             <label className="text-gray-600 font-medium mb-2">Password</label>
    //             <div className="flex items-center border rounded-lg px-3 py-2">
    //               <FaLock className="text-gray-400 text-2xl" />
    //               <input
    //                 type="password"
    //                 name="password"
    //                 value={updatedDetails.password}
    //                 onChange={handleInputChange}
    //                 className="w-full outline-none border-none ml-2"
    //                 placeholder="Password"
    //               />
    //             </div>
    //           </div>
    //           <div className="w-full">
    //             <label className="text-gray-600 font-medium mb-2">Profile Photo</label>
    //             <div className="flex items-center border rounded-lg px-3 py-2">
    //               <FaCamera className="text-gray-400 text-2xl" />
    //               <input
    //                 type="file"
    //                 name="profilePhoto"
    //                 onChange={handlePhotoChange}
    //                 className="w-full outline-none border-none ml-2"
    //               />
    //             </div>
    //           </div>
    //           <div className="w-full flex justify-between">
    //             <button
    //               type="submit"
    //               className="bg-blue-600 text-white py-2 px-6 rounded-full font-medium hover:bg-blue-700 transition-colors"
    //             >
    //               Save
    //             </button>
    //             <button
    //               type="button"
    //               onClick={() => setIsEditing(false)}
    //               className="bg-gray-300 text-gray-800 py-2 px-6 rounded-full font-medium hover:bg-gray-400 transition-colors"
    //             >
    //               Cancel
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div>
      Hello
    </div>
  );
};

export default Profile;
