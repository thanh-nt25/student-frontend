import React from 'react';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';

function App() {
    return (
        <div className="App">
            <h1>Student Management</h1>
            {/* <AddStudentForm /> */}
            <StudentList />
        </div>
    );
}

export default App;
