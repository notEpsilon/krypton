import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Card, ListGroup } from 'react-bootstrap';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase.util';

interface IProps {
    navHeight: number;
    user: User | null;
};

interface CourseMinified {
    name: string;
    absenceCount: number;
};

const AbsencePage: React.FC<IProps> = ({ navHeight, user }) => {
    const [courses, setCourses] = useState<CourseMinified[]>([]);

    useEffect(() => {
        if (!user) return;
        const q = query(collection(firestore, 'students'), where('email', '==', user.email));
        getDocs(q).then(snapshot => {
            setCourses(snapshot.docs[0].data().courses);
        }).catch(err => console.error(err));
    }, [user]);

    return (
        <Card style={{ height: `calc(100vh - ${navHeight})` }}>
            <Card.Header className="text-center">Your Courses Absence</Card.Header>
            <ListGroup variant="flush">
                {
                    courses.map((course, idx) => {
                        return (
                            <ListGroup.Item key={idx} className="d-flex flex-row align-items-center justify-content-around">
                                <span><span className="text-primary">Course Name:</span> {course.name}</span>
                                <span><span className="text-danger">Absence Count:</span> {course.absenceCount}</span>
                            </ListGroup.Item>
                        );
                    })
                }
            </ListGroup>
        </Card>
    );
};

export default AbsencePage;
