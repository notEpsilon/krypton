import { User } from 'firebase/auth';
import { Card, ListGroup } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { firestore } from '../../firebase/firebase.util';
import { query, where, collection, getDocs } from 'firebase/firestore';
import StudentEditor from '../../components/StudentEditor/StudentEditor.component';

interface IProps {
    navHeight: number;
    user: User | null;
};

const getCourses = async (user: User | null): Promise<Array<any>> => {
    if (!user) return [];
    const q = query(collection(firestore, 'professors'), where('email', '==', user.email));
    return (await getDocs(q)).docs[0].data().courses;
};

const ProfessorPage: React.FC<IProps> = ({ navHeight, user }) => {
    const [students, setStudents] = useState<Array<any>>([]);
    const [crss, setCrss] = useState<Array<any>>([]);

    useEffect(() => {
        async function go() {
            if (!user) return;
            const profCourses = await getCourses(user);
            profCourses.forEach(async (course: string) => {
                const allStudents = (await getDocs(collection(firestore, 'students'))).docs.map(docu => docu.data());
                const toAdd: any[] = [];
                allStudents.forEach(s => {
                    if (!s.courses) return;
                    const hisCourses = s.courses;
                    for (let i = 0; i < hisCourses.length; i++) {
                        if (profCourses.includes(hisCourses[i].name)) {
                            toAdd.push(s);
                            setCrss(prev => [...prev, hisCourses[i].name]);
                            break;
                        }
                    }
                });
                setStudents(prev => ([...prev, ...toAdd]));
            });
        }
        go().catch(err => console.error(err));
    }, [user]);

    return (
        <Card style={{ height: `calc(100vh - ${navHeight})` }}>
            <Card.Header className="text-center">Your Students</Card.Header>
            <ListGroup variant="flush">
                {
                    students.map((student, idx) => (<ListGroup.Item key={idx}>
                        <StudentEditor student={student} crs={crss[idx]} />
                    </ListGroup.Item>))
                }
            </ListGroup>
        </Card>
    );
};

export default ProfessorPage;
