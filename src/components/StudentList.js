import React, { useState, useEffect } from 'react';
import { getAllStudents, deleteStudent } from '../services/api';
import UpdateStudentForm from './UpdateStudentForm';
import AddStudentForm from './AddStudentForm'; 
import './StudentList.css'; 

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [editingStudent, setEditingStudent] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1); 
    const studentsPerPage = 3; 
    const [searchQuery, setSearchQuery] = useState(''); 

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await getAllStudents();
                setStudents(response.data.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteStudent(id);
            setStudents(students.filter((student) => student._id !== id)); 
            alert('Student deleted successfully!');
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleEdit = (student) => {
        setEditingStudent(student); 
    };

    const reformatDate = (value) => {
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleAddStudent = (newStudent) => {
        setStudents([...students, newStudent]);
        setIsAddModalOpen(false); 
    };

    
    const filteredStudents = students.filter((student) =>
        student.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.StudentID.toString().includes(searchQuery)
    );

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

    
    const currentStudents = filteredStudents.slice(
        (currentPage - 1) * studentsPerPage,
        currentPage * studentsPerPage
    );

    
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); 
    };

    return (
        <div className="student-list-container">
            <h2 className="student-list-header">Student List</h2>
            <div className="content-container">
                <div className="button-search-container">                    
                    <div className="search-container">
                        <input 
                            type="text" 
                            placeholder="Search by Name or Student ID..." 
                            value={searchQuery} 
                            onChange={handleSearchChange} 
                            className="search-input"
                        />
                        <span className="search-icon">🔍</span> 
                    </div>
                    
                    <button 
                        className="add-button" 
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        Add student
                    </button>
                </div>
                
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>StudentID</th>
                            <th>Name</th>
                            <th>Birthday</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((student) => (
                            <tr key={student._id}>
                                <td>{student.StudentID}</td>
                                <td>{student.Name}</td>
                                <td>{reformatDate(student.Birthday)}</td>
                                <td>{student.Address}</td>
                                <td>
                                    <button className="delete-button" onClick={() => handleDelete(student._id)}>Delete</button>
                                    <button className="edit-button" onClick={() => handleEdit(student)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="pagination">
                    {[...Array(totalPages)].map((_, index) => (
                        <button 
                            key={index} 
                            className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {editingStudent && (
                <UpdateStudentForm 
                    student={editingStudent} 
                    setEditingStudent={setEditingStudent} 
                    setStudents={setStudents}
                />
            )}

            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <AddStudentForm onClose={() => setIsAddModalOpen(false)} onAdd={handleAddStudent} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentList;
