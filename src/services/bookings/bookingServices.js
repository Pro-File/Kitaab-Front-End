import http from "../baseURL";

class bookingServices {
  getBookings() {
    return http.get("/bookings");
  }

  getBooking(id) {
    return http.get(`/bookings/${id}`);
  }

  createBooking(data) {
    return http.post("/bookings", data);
  }

  update(id, data) {
    return http.put(`/bookings/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bookings/${id}`);
  }
}

export default new bookingServices();