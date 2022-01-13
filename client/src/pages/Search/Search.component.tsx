import { query, collection, where, getDocs } from 'firebase/firestore';
import React, { useState } from 'react';
import { Card, Form, Container } from 'react-bootstrap';
import { firestore } from '../../firebase/firebase.util';
import RenderData from '../../components/RenderData/RenderData.component';

const Search: React.FC<{ navHeight: number }> = ({ navHeight }) => {
    const [mail, setMail] = useState<string>("");
    const [data, setData] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<any>) => {
        setMail(prev => (e.target.value as string));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const q1 = query(collection(firestore, 'students'), where('email', '==', mail));
        const q2 = query(collection(firestore, 'professors'), where('email', '==', mail));
        const q3 = query(collection(firestore, 'it'), where('email', '==', mail));

        const awaited = await Promise.all([q1, q2, q3].map(q => getDocs(q)));

        if (awaited[0].size > 0) {
            setData(awaited[0].docs[0].data());
        }
        else if (awaited[1].size > 0) {
            setData(awaited[1].docs[0].data());
        }
        else if (awaited[2].size > 0) {
            setData(awaited[2].docs[0].data());
        }
        else {
            alert('User Not Found!');
        }
    };

    return (
        <Container fluid style={{ height: `calc(100vh - ${navHeight + 5}px)` }} className="d-flex vw-100 justify-content-center align-items-center">
            <Card style={{ width: '18rem', minHeight: '20rem' }}>
                <Card.Body className="text-center">Search Users</Card.Body>
                {
                    data ? <RenderData data={data} /> : null // TODO: Support Course Rendering
                }
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Control type="search" placeholder="Enter Email" value={mail} onChange={handleChange} required />
                    </Form.Group>
                </Form>
            </Card>
        </Container>
    );
};

export default Search;
