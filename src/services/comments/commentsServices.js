import http from "../baseURL";

class commentsServices {
  getComments() {
    return http.get("/comments");
  }

  createComment(data) {
    return http.post("/comments", data);
  }

  editComment(data) {
    return http.put(`/comments/${data._id}`, data);
  }

  delete(_id) {
    return http.delete(`/comments/${_id}`);
  }
}

export default new commentsServices();
