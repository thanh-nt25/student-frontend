import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getAllStudents = async () => {
    return await axios.get(`${API_URL}/`);
};

export const createStudent = async (studentData) => {
    return await axios.post(`${API_URL}/`, studentData);
};

export const updateStudent = async (id, studentData) => {
    return await axios.put(`${API_URL}/${id}`, studentData);
};

export const deleteStudent = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
