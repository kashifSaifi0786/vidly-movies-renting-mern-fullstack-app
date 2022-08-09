import http from "./httpService";

const apiEndPoint = "/users";

export function register(user) {
  return http.post(apiEndPoint, {
    name: user.name,
    email: user.username,
    password: user.password,
  });
}
