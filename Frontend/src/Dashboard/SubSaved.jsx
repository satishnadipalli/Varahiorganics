import React from 'react';
import { ratingImage } from '../Components/HomeProducts/Functions';
import { Link } from 'react-router-dom';

const SubSaved = ({ element }) => {
  return (
    <Link to={`/ontwoproduct/${element.productId}`}>
      <div className='rounded-lg bg-white shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105'>
        <div className='relative'>
          <img
            src={`http://localhost:3000/uploads/${element.image[0]}`}
            alt={element.title}
            className='w-full h-32 object-cover'
          />
          <div className='absolute top-2 right-2 bg-white px-2 py-1 text-sm text-gray-800 rounded-lg shadow-md'>
            <span className='font-semibold text-gray-700'>{element.price}</span>
          </div>
        </div>
        <div className='p-4'>
          <h3 className='text-lg font-semibold text-gray-800 truncate'>{element.title}</h3>
          <p className='text-sm text-gray-600 truncate'>{element.description}</p>
          <div className='flex items-center mt-2'>
            <img src={ratingImage(element.avgRating)} alt="rating" className='h-4' />
            <span className='ml-2 text-sm text-gray-700'>Rating: <span className='font-semibold'>{element.avgRating}</span></span>
          </div>
          <div className='mt-2 text-sm text-gray-500'>
            <span className='text-blue-400'>Saved on {element.time}</span>
            <div className='mt-2'>
              <button className='w-full py-1 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors'>
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubSaved;
