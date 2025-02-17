import { useState, useEffect } from 'react'
import BookForm from './components/BookForm'
import BookList from './components/BookList'
import EditModal from './components/EditModal'
import './App.css'
import { bookApi } from './utils/request'

function App() {
  const [books, setBooks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false) // state for the modal 
  const [editingBook, setEditingBook] = useState(null) // state for the editing book
  const [message, setMessage] = useState('') // state for the message

  const showMessage = (text) => { // show a message
    setMessage(text)
    setTimeout(() => setMessage(''), 5000) // clear the message after 5 seconds
  }

  const fetchBooks = async () => {
    try {
      const books = await bookApi.getAllBooks()
      setBooks(books)
    } catch (err) {
      console.error('Failed to fetch books:', err)
      showMessage('Failed to load books')
    }
  }

  useEffect(() => {
    fetchBooks() // fetch the books when the component mounts
  }, []) 

  const handleAddBook = async (bookName,author) => {
    try {
      const data = await bookApi.addBook(bookName,author)
      showMessage(data.message)
      fetchBooks()
    } catch (err) {
      console.error('Failed to add book:', err)
      showMessage('Failed to add book')
    }
  }

  const handleEditBook = async (id, newName, author) => {
    try {
      
      // Wait for the update to complete
      await bookApi.updateBook(id, newName, author);
      fetchBooks();
      showMessage('Book updated successfully');
      setIsModalOpen(false);
      setEditingBook(null);
    } catch (err) {
      console.error('Failed to update book:', err);
      showMessage('Failed to update book');
    }
  }

  const handleDeleteBook = async (id) => {
    try {
      await bookApi.deleteBook(id)
      showMessage('Book deleted successfully')
      fetchBooks()
    } catch (err) {
      console.error('Failed to delete book:', err)
      showMessage('Failed to delete book')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl gap-8">
        <div className="w-full md:w-1/2">
          <BookForm onAddBook={handleAddBook} message={message} /> {/* add the book form */}
        </div>
        <div className="w-full md:w-1/2">
        {/* display the book list */}
          <BookList 
            books={books} 
            onEdit={(book) => { 
              setEditingBook(book)
              setIsModalOpen(true)
            }}
            onDelete={handleDeleteBook}
            message={message}
          /> 
        </div>
      </div>
      
      <EditModal 
        isOpen={isModalOpen} // if the modal is open, display it
        book={editingBook} // the book to edit
        onClose={() => {
          setIsModalOpen(false) // close the modal  
          setEditingBook(null) // clear the editing book
        }}
        onSave={handleEditBook} // save the book
      />
    </div>
  )
}

export default App