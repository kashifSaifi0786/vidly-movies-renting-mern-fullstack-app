import http from "./httpService";

const apiEndpoint = "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return await http.put(movieUrl(movie._id), body);
  } else {
    return await http.post(apiEndpoint, movie);
  }
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
