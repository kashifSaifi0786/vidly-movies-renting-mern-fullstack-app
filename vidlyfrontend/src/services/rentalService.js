import http from "./httpService";

const apiEndPoint = "/rentals";

export function saveRental(rental) {
  return http.post(apiEndPoint, rental);
}

export function getRentals() {
  return http.get(apiEndPoint);
}
