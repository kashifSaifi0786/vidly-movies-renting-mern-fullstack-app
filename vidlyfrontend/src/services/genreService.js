import http from "./httpService";

const apiEndPoint = "/genres";

export function getGenres() {
  return http.get(apiEndPoint);
}
