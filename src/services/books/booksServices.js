import http from "../baseURL";

class booksServices {
  getBooks(page) {
    return http.get(`/books/?page=${page}`);
  }

  getBook(id) {
    return http.get(`/books/${id}`);
  }

  createBook(data) {
    return http.post("/books", data);
  }

  addReview(data, id) {
    return http.post(`/books/${id}/review`, data);
  }
}

export default new booksServices();
