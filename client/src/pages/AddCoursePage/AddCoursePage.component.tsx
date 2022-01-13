import './AddCoursePage.styles.scss';
import React, { useState } from 'react';
import { Course } from '../../types/CTypes';
import { firestore } from '../../firebase/firebase.util';
import { setDoc, DocumentReference, doc } from 'firebase/firestore';
import { Container, Form, Row, Col, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';

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

const AddCoursePage: React.FC<IProps> = ({ navHeight }) => {
    const [courseName, setCourseName] = useState<string>("");
    const [faculty, setFaculty] = useState<string>("Choose Faculty");
    const [dep, setDep] = useState<string>("Choose Department");

    const handleNameChange = (e: React.ChangeEvent<any>) => {
        setCourseName(e.target.value as string);
    };

    const handleClick1 = (e: React.MouseEvent<HTMLElement, MouseEvent>, f: string) => {
        setFaculty(prev => f);
    };

    const handleClick2 = (e: React.MouseEvent<HTMLElement, MouseEvent>, dep: string) => {
        setDep(prev => dep);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (faculty === "Choose Faculty") {
            return alert("Please Choose a Faculty...");
        }

        if (dep === "Choose Department") {
            return alert("Please Choose a Department...");
        }

        const courseDocRef = doc(firestore, `courses/${(await axios.get('http://localhost:4000/rand')).data}`) as DocumentReference<Course>;

        setDoc<Course>(courseDocRef, {
            name: courseName,
            faculty: faculty,
            department: [dep]
        }).catch(err => console.log(err));

        setCourseName("");
        setFaculty("Choose Faculty");
        setDep("Choose Department");
    };

    return (
        <Container className="addcourse-page" style={{ height: `calc(100vh - ${navHeight + 5}px)` }}>
            <Form className="h-100" method="POST" onSubmit={handleSubmit}>
                <Row className="form-row h-100" xs={1} md={3}>
                    <Col className="form-col py-3 my-auto" md={{ order: 1 }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Course Name" value={courseName} onChange={handleNameChange} required></Form.Control>
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
                        <Button type="submit" className="w-100" variant="primary">Add Course</Button>
                    </Col>
                    <Col md={{ order: 0 }} />
                    <Col md={{ order: 2 }} />
                </Row>
            </Form>
        </Container>
    );
};

export default AddCoursePage;
