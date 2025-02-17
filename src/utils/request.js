const API_BASE_URL = 'http://localhost:8080'

export const bookApi = {
  // Fetch all books
  getAllBooks: async () => {
    try {
      console.log('Fetching from:', `${API_BASE_URL}/book`);
      const res = await fetch(`${API_BASE_URL}/book`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        const errorText = await res.text();
        console.error('API Error:', errorText);
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json()
      return data[0].books
    } catch (error) {
      console.error('Detailed fetch error:', error)
      throw error
    }
  },

  // Add a new book
  addBook: async (bookName, author) => {
    const res = await fetch(`${API_BASE_URL}/book`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ book_name: bookName, author: author }),
    })
    console.log(bookName,author)
    return await res.json()
  },

  // Update a book
  updateBook: async (id, bookName, author) => {
    try {
      const res = await fetch(`${API_BASE_URL}/book`, {
        method: 'PUT',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ id, book_name: bookName, author: author }),
      })
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Update failed:', errorText);
        throw new Error(`Failed to update book: ${res.status} ${errorText}`);
      }
      
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Update error:', error);
      throw error;
    }
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