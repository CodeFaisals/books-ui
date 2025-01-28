/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

function EditModal({ isOpen, book, onClose, onSave }) {
  const [bookName, setBookName] = useState('');

  useEffect(() => {
    if (book) {
      setBookName(book.book_name);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookName.trim()) return;
    onSave(book.id, bookName.trim());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center">
      <div className="bg-gray-800 text-white p-6 rounded-lg text-center w-96">
        <h3 className="text-2xl font-semibold mb-4">Edit Book Name</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            placeholder="Enter new book name"
            className="w-full mt-2 p-2 rounded-md bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          <div className="flex justify-center mt-4 space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal; 