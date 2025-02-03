const API_BASE_URL = 'http://localhost:3000'

export const bookApi = {
  // Fetch all books
  getAllBooks: async () => {
    const res = await fetch(`${API_BASE_URL}/book`)
    const data = await res.json()
    return data[0].books
  },

  // Add a new book
  addBook: async (bookName) => {
    const res = await fetch(`${API_BASE_URL}/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ book_name: bookName }),
    })
    return await res.json()
  },

  // Update a book
  updateBook: async (id, bookName) => {
    const res = await fetch(`${API_BASE_URL}/book`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, book_name: bookName }),
    })
    if (!res.ok) throw new Error('Failed to update book')
    return await res.json()
  },

  // Delete a book
  deleteBook: async (id) => {
    const res = await fetch(`${API_BASE_URL}/book`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    if (!res.ok) throw new Error('Failed to delete book')
    return await res.json()
  }
} 