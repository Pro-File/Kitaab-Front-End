import http from "../baseURL";

class booksServices {
  getBooks() {
    return http.get("/books");
  }

  getBook(id) {
    return http.get(`/books/${id}`);
  }

  createBook(data) {
    return http.post("/books", data);
  }

  addReview(data, id) {
    return http.post(`/books/${id}/review`, data)
  }

  update(id, data) {
    return http.put(`/books/${id}`, data);
  }

  delete(id) {
    return http.delete(`/books/${id}`);
  }
}

export default new booksServices();