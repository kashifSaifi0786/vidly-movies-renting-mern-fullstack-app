import http from "./httpService";

const apiEndPoint = "/customers";

function customerUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getCustomer(id) {
  return http.get(customerUrl(id));
}

export function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return http.put(customerUrl(customer._id), body);
  }

  return http.post(apiEndPoint, customer);
}

export function getCustomers() {
  return http.get(apiEndPoint);
}

export function deleteCustomer(customerId) {
  return http.delete(customerUrl(customerId));
}
