import React, { useState } from 'react';
import './LoginPage.styles.scss';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../../firebase/firebase.util';
import {
    Container,
    Form,
    Row,
    Col,
    Button,
} from 'react-bootstrap';

interface IProps { navHeight: number };

const checkUserType = async (userEmail: string | null) => {
    const qIT = query(collection(firestore, 'it'), where('email', '==', userEmail));
    const qStudent = query(collection(firestore, 'students'), where('email', '==', userEmail));
    const qProfessor = query(collection(firestore, 'professors'), where('email', '==', userEmail));

    const awaitedQueries = await Promise.all([qIT, qStudent, qProfessor].map(q => getDocs(q)));

    if (awaitedQueries[0].size > 0) return 2;
    if (awaitedQueries[1].size > 0) return 0;
    if (awaitedQueries[2].size > 0) return 1;

    return -1;
};

const LoginPage: React.FC<IProps> = ({ navHeight }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const creds = await signInWithEmailAndPassword(auth, email, password);
            const userType = await checkUserType(creds.user.email);

            if (userType === 2) navigate('/it');
        }
        catch (e) {
            return alert("Error Logging In, Consider Checking Your Email & Password.");
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<any>) => {
        setEmail(prev => (e.target.value as string));
    };

    const handlePasswordChange = (e: React.ChangeEvent<any>) => {
        setPassword(prev => (e.target.value as string));
    };

    return (
        <Container className="login-page" style={{ height: `calc(100vh - ${navHeight}px)` }}>
            <Form className="h-100" method="POST" onSubmit={handleSubmit}>
                <Row className="form-row h-100" xs={1} md={3}>
                    <Col className="form-col py-3 my-auto" md={{ order: 1 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={handleEmailChange} required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={handlePasswordChange} required></Form.Control>
                        </Form.Group>
                        <Button type="submit" className="w-100" variant="primary">Login</Button>
                    </Col>
                    <Col md={{ order: 0 }} />
                    <Col md={{ order: 2 }} />
                </Row>
            </Form>
        </Container>
    );
};

export { checkUserType };
export default LoginPage;
