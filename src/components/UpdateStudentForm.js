import React, { useState } from 'react';
import { updateStudent } from '../services/api';

const UpdateStudentForm = ({ student, setEditingStudent, setStudents }) => {
    const [updatedStudent, setUpdatedStudent] = useState(student);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateStudent(updatedStudent._id, updatedStudent);
            setStudents((prevStudents) =>
                prevStudents.map((s) => 
                    s._id === updatedStudent._id ? response.data.data : s
                )
            );
            setEditingStudent(null); 
            alert('student updated successfully!');
        } catch (error) {
            console.error('error update student:', error);
        }
    };

    const handleCancel = () => {
        setEditingStudent(null); 
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Student</h2>
            <input
                type="text"
                name="Name"
                placeholder="Name"
                value={updatedStudent.Name}
                onChange={handleChange}
            />
            <input
                type="number"
                name="Roll"
                placeholder="Roll"
                value={updatedStudent.Roll}
                onChange={handleChange}
            />
            <input
                type="date"
                name="Birthday"
                value={updatedStudent.Birthday?.split('T')[0]}
                onChange={handleChange}
            />
            <input
                type="text"
                name="Address"
                placeholder="Address"
                value={updatedStudent.Address}
                onChange={handleChange}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
    );
};

export default UpdateStudentForm;
