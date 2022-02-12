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
}

export default new bookingServices();
