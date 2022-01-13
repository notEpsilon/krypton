import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Course } from '../../types/CTypes';
import { Card, ListGroup } from 'react-bootstrap';
import { query, collection, where, getDocs, CollectionReference } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase.util';
import RenderCourse from '../../components/RenderCourse/RenderCourse.component';

interface IProps {
    navHeight: number;
    user: User | null;
};

const getStudentFaculty = async (user: User | null) => {
    const q = query(collection(firestore, 'students'), where('email', '==', (user && user.email)));
    const snapshot = await getDocs(q);
    if (!snapshot.docs[0]) return;
    return snapshot.docs[0].data().faculty;
};

const getStudentDep = async (user: User | null) => {
    const q = query(collection(firestore, 'students'), where('email', '==', (user && user.email)));
    const snapshot = await getDocs(q);
    if (!snapshot.docs[0]) return;
    return snapshot.docs[0].data().department;
};

const StudentPage: React.FC<IProps> = ({ navHeight, user }) => {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        async function getCourses() {
            const fac = (await getStudentFaculty(user)) as string;
            const dep = (await getStudentDep(user)) as string;
            if (!fac || !dep) return;
            const q = query<Course>(collection(firestore, 'courses') as CollectionReference<Course>,
                        where('faculty', '==', fac),
                        where('department', 'array-contains', dep));
            const snapshot = await getDocs<Course>(q);
            setCourses(snapshot.docs.map(course => course.data()));
        }
        getCourses();
    }, [user]);

    return (
        <Card style={{ height: `calc(100vh - ${navHeight})` }}>
            <Card.Header className="text-center">Available Courses</Card.Header>
            <ListGroup variant="flush">
                {
                    courses.map((course, idx) => <ListGroup.Item key={idx}><RenderCourse data={course} /></ListGroup.Item>)
                }
            </ListGroup>
        </Card>
    );
};

export default StudentPage;
