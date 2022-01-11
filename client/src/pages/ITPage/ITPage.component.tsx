import { Card, ListGroup } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { VerifiedStudent } from '../../types/CTypes';
import { firestore } from '../../firebase/firebase.util';
import { collection, CollectionReference, query, where, getDocs } from 'firebase/firestore';
import TuitionCard from '../../components/TuitionCard/TuitionCard.component';

const ITPage: React.FC = () => {
    const [didntPay, setDidntPay] = useState<VerifiedStudent[]>([]);

    useEffect(() => {
        const colRef = collection(firestore, 'students') as CollectionReference<VerifiedStudent>;
        const q = query(colRef, where('tuitionPaid', '==', false));
        getDocs(q).then(snapshot => {
            setDidntPay(snapshot.docs.map(dp => dp.data()));
        }).catch(err => console.error(err));
    }, []);

    return (
        <Card>
            <Card.Header>Didn't Pay Tuition</Card.Header>
            <ListGroup variant="flush">
                {
                    didntPay.map((dp, idx) => <ListGroup.Item key={idx}><TuitionCard data={dp} editDidntPay={setDidntPay} /></ListGroup.Item>)
                }
            </ListGroup>
        </Card>
    );
};

export default ITPage;
