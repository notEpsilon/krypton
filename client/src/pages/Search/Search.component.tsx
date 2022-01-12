import React, { useState } from 'react';
import { Card, Form, Container } from 'react-bootstrap';

const Search: React.FC<{ navHeight: number }> = ({ navHeight }) => {
    const [mail, setMail] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<any>) => {
        setMail(prev => (e.target.value as string));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <Container fluid style={{ height: `calc(100vh - ${navHeight + 5}px)` }} className="d-flex vw-100 justify-content-center align-items-center">
            <Card style={{ width: '18rem' }}>
                <Card.Body>Search Users</Card.Body>
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
