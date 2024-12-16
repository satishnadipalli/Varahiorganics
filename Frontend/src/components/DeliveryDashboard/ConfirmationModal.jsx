import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Status Update</h2>
        <p>Are you sure you want to update the order status?</p>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">Cancel</button>
          <button onClick={onConfirm} className="confirm-button">Yes, Update</button>
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
        }
        h2 {
          margin-top: 0;
          color: #333;
        }
        p {
          color: #666;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 1rem;
        }
        button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s;
        }
        .cancel-button {
          background-color: #f0f0f0;
          color: #333;
          margin-right: 0.5rem;
        }
        .cancel-button:hover {
          background-color: #e0e0e0;
        }
        .confirm-button {
          background-color: #4CAF50;
          color: white;
        }
        .confirm-button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default ConfirmationModal;
