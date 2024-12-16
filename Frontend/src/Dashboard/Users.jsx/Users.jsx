import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addTotalUsers } from '../../Redux/CartSlice';
import { EditAdmin } from '../../../Heroicons';
import UpdateAdimModel from './updateAdimModel';
// import LoadingAnimation from '../../../loadingAnimation';

const Users = () => {
  // const dispatch = useDispatch();
  // const { loginDetails, TotalUsers } = useSelector(state => state.cart);
  const [clickedUser, setClickedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, SetIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [adminFilter, setAdminFilter] = useState('all'); // Added admin filter state
  const [animation, setAnimation] = useState(false);

  console.log(TotalUsers)


  function handleOpen({ email }) {
    setClickedUser({ email });
    setIsOpen(true);
  }

  function handleDownloadCSV() {
    setAnimation(true);
    setTimeout(() => {
      const csvRows = [];
      const headers = ['Sr No', 'User Id', 'Profile Photo', 'User Name', 'User Email', 'Created On', 'Admin'];
      csvRows.push(headers.join(','));

      const filteredUsers = TotalUsers.filter(user => 
        (user._id.includes(searchTerm) || user.lastname.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (adminFilter === 'all' || (adminFilter === 'true' && user.isAdmin) || (adminFilter === 'false' && !user.isAdmin))
      );

      filteredUsers.forEach((user, index) => {
        const row = [
          index + 1,
          user._id,
          user.profilePhoto,
          user.lastname,
          user.email,
          user.createdDate,
          user.isAdmin ? 'True' : 'False'
        ];
        csvRows.push(row.join(','));
      });

      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.csv';
      a.click();
      URL.revokeObjectURL(url);
      setAnimation(false);
    }, 1000); // Delay for animation
  }

  if (loading) {
    return (
      <div className='w-full min-h-screen p-8'>
        Loading...
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen p-7 relative'>
      <h1 className='text-xl font-semibold text-gray-600'>Users</h1>
      <div className='w-full flex justify-between h-14 items-center'>
        <button 
          className={`px-7 py-1 text-sm text-white font-semibold bg-orange-600 h-7 ${animation ? 'animate-download' : ''}`} 
          onClick={handleDownloadCSV}
        >
          Download CSV
        </button>
        <div className='flex text-sm font-semibold text-gray-500 justify-center items-center gap-2'>
          <span>Search</span>
          <input 
            type="text" 
            className='border-2 border-gray-600 py-2 rounded-md text-sm h-6 px-1 outline-none' 
            placeholder='search' 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <select
            value={adminFilter}
            onChange={(e) => setAdminFilter(e.target.value)}
            className='ml-4 border-2 text-black border-gray-600 py-2 rounded-md text-sm h-6 px-2 outline-none'
            placeholder="select the Type"
            style={{color:"black"}}
            
          >
            <option value="all">All</option>
            <option value="true">Admins</option>
            <option value="false">Non-Admins</option>
          </select>
        </div>
      </div>
      <table className='w-full mt-4'>
        <thead className='w-full'>
          <tr>
            <td className='text-sm font-semibold border pl-3 border-gray-400 h-7'>Sr No</td>
            <td className='text-sm font-semibold border pl-3 border-gray-400 h-7'>User Id</td>
            <td className='text-sm font-semibold border pl-3 border-gray-400 h-7'>Profile Photo</td>
            <td className='text-sm font-semibold border pl-3 border-gray-400 h-7'>User Name</td>
            <td className='text-sm font-semibold border pl-3 border-gray-400 h-7'>User Email</td>
            <td className='text-sm font-semibold border pl-3 border-gray-400 h-7'>Created On</td>
            <td className='text-sm font-semibold border pl-3 border-gray-400 h-7'>Admin</td>
          </tr>
        </thead>
        <tbody>
          {
            TotalUsers && TotalUsers.filter(user => 
              (user._id.includes(searchTerm) || user.lastname.toLowerCase().includes(searchTerm.toLowerCase())) &&
              (adminFilter === 'all' || (adminFilter === 'true' && user.isAdmin) || (adminFilter === 'false' && !user.isAdmin))
            ).map((element, index) => (
              <tr key={element._id} className={`text-sm text-gray-700 font-semibold border border-gray-400 h-12 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                <td className='text-sm font-semibold border pl-3 border-gray-400'>{index + 1}</td>
                <td className='text-sm font-semibold border pl-3 border-gray-400'>{element._id}</td>
                <td className='text-sm flex justify-center w-full font-semibold pl-3 items-center'>
                  <img 
                    className='h-10 w-10 rounded-full' 
                    src={"https://varahiorganics.onrender.com/uploads/" + element.profilePhoto} 
                    alt="" 
                    onError={(e) => {
                      e.target.src = 'https://th.bing.com/th/id/OIP.TpqSE-tsrMBbQurUw2Su-AHaHk?rs=1&pid=ImgDetMain'; 
                    }}
                  />
                </td>
                <td className='text-sm font-semibold border pl-3 border-gray-400'>{element.lastname}</td>
                <td className='text-sm font-semibold border pl-3 border-gray-400'>{element.email}</td>
                <td className='text-sm font-semibold border pl-3 border-gray-400'>{element.createdDate}</td>
                <td className='text-sm font-semibold border pl-3 border-gray-400 gap-3'>{element.isAdmin ? 'True' : 'False'}
                  <div onClick={() => handleOpen({ email: element.email })}><EditAdmin /></div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      {isOpen && <UpdateAdimModel clickedUser={clickedUser} setClickedUser={setClickedUser} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Users;
