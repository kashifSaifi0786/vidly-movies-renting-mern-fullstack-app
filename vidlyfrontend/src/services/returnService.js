import http from "./httpService";

const apiEndPoint = "/returns";

export function saveReturn(rentalReturn) {
  return http.post(apiEndPoint, rentalReturn);
}
