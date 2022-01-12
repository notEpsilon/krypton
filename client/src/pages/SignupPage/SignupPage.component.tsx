import React, { useState } from 'react';
import './SignupPage.styles.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmailValidator from 'email-validator';
import {
    Container,
    Form,
    Row,
    Col,
    Button,
    Dropdown,
} from 'react-bootstrap';

interface IProps {
    navHeight: number;
};

const faculties: Record<string, string[]> = {
    "Choose Faculty": [
        
    ],
    Engineering: [
        "Civil",
        "Computer",
        "Mechanical"
    ],
    Law: [
        "Private Law",
        "Public Law"
    ],
    Medicine: [
        "Dentistry",
        "Surgery"
    ]
};

const SignupPage: React.FC<IProps> = ({ navHeight }) => {
    const [faculty, setFaculty] = useState<string>("Choose Faculty");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [dep, setDep] = useState<string>("Choose Department");
    const navigate = useNavigate();

    const handleClick1 = (e: React.MouseEvent<HTMLElement, MouseEvent>, f: string) => {
        setFaculty(prev => f);
    };

    const handleClick2 = (e: React.MouseEvent<HTMLElement, MouseEvent>, dep: string) => {
        setDep(prev => dep);
    };

    const handleNameChange = (e: React.ChangeEvent<any>) => {
        setName(prev => (e.target.value as string));
    };

    const handleEmailChange = (e: React.ChangeEvent<any>) => {
        setEmail(prev => (e.target.value as string));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (faculty === "Choose Faculty") {
            return alert("Please Choose a Faculty...");
        }

        if (dep === "Choose Department") {
            return alert("Please Choose a Department...");
        }

        if (!EmailValidator.validate(email)) {
            return alert("Please Enter a Valid Email...");
        }

        try {
            axios.post('http://localhost:4000/users/students', {
                email,
                name,
                faculty,
                department: dep,
                type: 0
            }).catch(err => console.error(err));
        }
        catch (e) {
            return alert("This Email Already Exists as a Pending Student.");
        }

        setName(prev => "");
        setEmail(prev => "");
        setFaculty(prev => "Choose Faculty");
        setDep(prev => "Choose Department");

        navigate('/login');
    };

    return (
        <Container className="signup-page" style={{ height: `calc(100vh - ${navHeight}px)` }}>
            <Form className="h-100" method="POST" onSubmit={handleSubmit}>
                <Row className="form-row h-100" xs={1} md={3}>
                    <Col className="form-col py-3 my-auto" md={{ order: 1 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Full Name" value={name} onChange={handleNameChange} required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={handleEmailChange} required></Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary">{faculty}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        Object.entries(faculties).map(([k, v]) => {
                                            return <Dropdown.Item key={k} onClick={e => handleClick1(e, k)}>{k}</Dropdown.Item>
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary">{dep}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        faculties[faculty].map(dep => (
                                            <Dropdown.Item key={dep} onClick={e => handleClick2(e, dep)}>{dep}</Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                        <Button type="submit" className="w-100" variant="primary">Register</Button>
                    </Col>
                    <Col md={{ order: 0 }} />
                    <Col md={{ order: 2 }} />
                </Row>
            </Form>
        </Container>
    );
};

export default SignupPage;
