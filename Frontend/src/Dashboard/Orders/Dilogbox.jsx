import React from 'react';
import { FaWhatsapp, FaEnvelope, FaFacebook, FaTwitter } from 'react-icons/fa';

const ShareDialog = ({ product, onClose }) => {
  const shareLink = `${window.location.origin}/product/${product.productId}`;
  const encodedLink = encodeURIComponent(shareLink);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-96 max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition duration-300"
        >
          &times;
        </button>
        <div className="bg-gray-200 p-4 rounded-t-lg">
          <h3 className="text-2xl font-semibold text-gray-800">Share this product</h3>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <a
            href={`https://wa.me/?text=${encodedLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg py-2 px-4 transition duration-300"
          >
            <FaWhatsapp className="mr-2" size={24} />
            WhatsApp
          </a>
          <a
            href={`mailto:?subject=Check this product&body=${encodedLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg py-2 px-4 transition duration-300"
          >
            <FaEnvelope className="mr-2" size={24} />
            Email
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg py-2 px-4 transition duration-300"
          >
            <FaFacebook className="mr-2" size={24} />
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodedLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-lg py-2 px-4 transition duration-300"
          >
            <FaTwitter className="mr-2" size={24} />
            Twitter
          </a>
          {/* Add more platforms as needed */}
        </div>
      </div>
    </div>
  );
};

export default ShareDialog;
