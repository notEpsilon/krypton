import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { firestore } from '../../firebase/firebase.util';
import { doc, setDoc } from 'firebase/firestore';
import { Course } from '../../types/CTypes';
import axios from 'axios';

interface IProps {
    data: Course;
    mail: string | null;
};

const RenderCourse: React.FC<IProps> = ({ data, mail }) => {
    const handleClick = async () => {
        const courseDocRef = doc(firestore, `pendingCourses/${(await axios.get('http://localhost:4000/rand')).data}`);
        setDoc(courseDocRef, { ...data, studentEmail: mail}).catch(err => console.error(err));
        alert('Course Register Request Sent.')
    };

    return (
        <Card className="d-flex flex-row">
            <Card.Body>{data.name} | {data.faculty} | {data.department}</Card.Body>
            <Button variant="primary" onClick={handleClick}>Register</Button>
        </Card>
    );
};

export default RenderCourse;
