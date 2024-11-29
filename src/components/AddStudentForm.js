import React, { useState } from 'react';
import { createStudent } from '../services/api';
import './AddStudentForm.css'; // Import the CSS file

const AddStudentForm = ({ onClose, onAdd }) => {
    const [student, setStudent] = useState({
        StudentID: '',
        Name: '',
        Birthday: '',
        Address: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createStudent(student);
            alert('Student added successfully!');
            onAdd(response.data);
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    return (
        <div className="add-student-form">
            <form onSubmit={handleSubmit}>
                <h2>Add Student</h2>
                <input
                    className="form-input"
                    type="number"
                    name="StudentID"
                    placeholder="Student ID"
                    value={student.StudentID}
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    type="text"
                    name="Name"
                    placeholder="Name"
                    value={student.Name}
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    type="date"
                    name="Birthday"
                    value={student.Birthday}
                    onChange={handleChange}
                />
                <input
                    className="form-input"
                    type="text"
                    name="Address"
                    placeholder="Address"
                    value={student.Address}
                    onChange={handleChange}
                />
                <div className="form-buttons">
                    <button type="submit" className="submit-button">Add Student</button>
                    <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddStudentForm;
