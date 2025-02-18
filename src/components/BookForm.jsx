/* eslint-disable react/prop-types */
import { useState } from 'react';

function BookForm({ onAddBook }) {
  const [bookName, setBookName] = useState(''); // state for the book name
  const [bookAuthor, setBookAuthor] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bookName.trim()) return; // if the book name is empty, return
    
    onAddBook(bookName.trim(), bookAuthor.trim()); // add the book name to the list
    setBookName(''); // clear the input field
    setBookAuthor('')
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-center mb-6">Book Input Form 📚</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="book-name" className="block text-sm font-medium text-gray-300">
            Book Name
          </label>
          <input
              type="text"
              id="book-name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)} // set the book name to the input value
              placeholder="Enter book name"
              required
              className="w-full mt-2 p-2 rounded-md bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          <label htmlFor="book-author" className="block text-sm font-medium text-gray-300 pt-4">
            Author
          </label>
          <input
              type="text"
              id="book-author"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)} // set the book name to the input value
              placeholder="Enter book author"
              required
              className="w-full mt-2 p-2 rounded-md bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
        <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-lg transition-all"
        >
          Add book
        </button>
      </form>
    </div>
  );
}

export default BookForm;
