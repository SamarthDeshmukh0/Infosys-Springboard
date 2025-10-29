import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/users';

class UserService {
  // Register new user
  registerUser(userData) {
    return axios.post(`${API_BASE_URL}/signup`, userData);
  }

  // Login user
  loginUser(email, password) {
    return axios.post(`${API_BASE_URL}/login`, { email, password });
  }

  // Get all users
  getAllUsers() {
    return axios.get(API_BASE_URL);
  }

  // Get user by ID
  getUserById(id) {
    return axios.get(`${API_BASE_URL}/${id}`);
  }

  // Delete user
  deleteUser(id) {
    return axios.delete(`${API_BASE_URL}/${id}`);
  }
}

export default new UserService();