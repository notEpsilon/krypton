import React, { useState } from 'react';
import { VerifiedStudent } from '../../types/CTypes';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const StudentEditor: React.FC<{ student: VerifiedStudent, crs: string }> = ({ student, crs }) => {
    const [clicked, setClicked] = useState<boolean>(false);
    const [grd, setGrd] = useState<number>(0);

    const handleChange = (e: React.ChangeEvent<any>) => {
        setGrd((e.target.value as number));
    }

    const handleGrade = () => {
        setClicked(!clicked);
    };

    const handleAbsent = async () => {
        const currStudent = (await axios.get(`http://localhost:4000/users/students/${student.email}`)).data;
        let oldCourses = currStudent.courses;
        if (!oldCourses) return;
        for (let i = 0; i < oldCourses.length; i++) {
            if (oldCourses[i].name === crs) oldCourses[i].absenceCount += 1;
        }
        axios.put(`http://localhost:4000/users/students/${student.email}`, { ...currStudent, courses: oldCourses });
        alert('Student Absence Count Increased.');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const currStudent = (await axios.get(`http://localhost:4000/users/students/${student.email}`)).data;
        let oldCourses = currStudent.courses;
        if (!oldCourses) return;
        for (let i = 0; i < oldCourses.length; i++) {
            if (oldCourses[i].name === crs) oldCourses[i].grade = grd;
        }
        axios.put(`http://localhost:4000/users/students/${student.email}`, { ...currStudent, courses: oldCourses });
        setClicked(false);
    };

    return (
        <Card className="d-flex flex-row">
            <Card.Body className="d-flex flex-row align-items-center justify-content-between">
                <span>{student.name} | {student.email} | {student.faculty} | {student.department}</span>
                <span>
                    {clicked ? <Form style={{ marginBottom:'10px' }} onSubmit={handleSubmit}><Form.Control value={grd} onChange={handleChange} type="number" /></Form> : null}
                    <Button style={{ marginRight: '0.6rem' }} onClick={handleGrade}>Edit Grade</Button>
                    <Button variant="secondary" onClick={handleAbsent}>Make Absent</Button>
                </span>
            </Card.Body>
        </Card>
    );
};

export default StudentEditor;
