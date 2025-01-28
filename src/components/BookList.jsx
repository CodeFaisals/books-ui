/* eslint-disable react/prop-types */
function BookList({ books, onEdit, onDelete, message }) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-center mb-4 text-orange-500">Books List</h2>
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        {books && books.length > 0 ? ( // if there are books, display them
          <ul className="divide-y divide-gray-700">
            {books.map((book) => ( // map over the books
              <div key={book.id} className="flex justify-between px-8 py-4">
                <li className="flex-grow">{book.book_name}</li>
                <div className="space-x-8">
                  <button
                    onClick={() => onEdit(book)}
                    className="hover:scale-190 transition-transform scale-150"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(book.id)}
                    className="hover:scale-190 transition-transform scale-150"
                  >
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </ul>
        ) : ( // if there are no books, display this message    
          <p className="text-center text-gray-400 py-4">No books available. Add a book to get started!</p>
        )}
      </div>
      {message && <p className="mt-4 text-center text-sm text-gray-400">{message}</p>}
    </div>
  );
}

export default BookList;
