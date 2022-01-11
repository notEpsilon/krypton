import { Card, ListGroup } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { TPendingStudent } from '../../types/CTypes';
import { firestore } from '../../firebase/firebase.util';
import { collection, CollectionReference, getDocs } from 'firebase/firestore';
import PendingStudent from '../../components/PendingStudent/PendingStudent.component';


const PendingStudents: React.FC = () => {
    const [pending, setPending] = useState<TPendingStudent[]>([]);

    useEffect(() => {
        const colRef = collection(firestore, 'pendingStudents') as CollectionReference<TPendingStudent>;
        getDocs(colRef).then(snapshot => {
            setPending(snapshot.docs.map(ps => ps.data()));
        }).catch(err => console.error(err));
    }, []);

    return (
        <Card>
            <Card.Header>Pending Students</Card.Header>
            <ListGroup variant="flush">
                {
                    pending.map((ps, idx) => <ListGroup.Item key={idx}><PendingStudent data={ps} editPending={setPending} /></ListGroup.Item>)
                }
            </ListGroup>
        </Card>
    );
};

export default PendingStudents;
