import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Course } from '../../types/CTypes';

interface IProps {
    data: Course;
};

const RenderCourse: React.FC<IProps> = ({ data }) => {
    const handleClick = () => {};

    return (
        <Card className="d-flex flex-row">
            <Card.Body>{data.name} | {data.faculty} | {data.department}</Card.Body>
            <Button variant="primary" onClick={handleClick}>Register</Button>
        </Card>
    );
};

export default RenderCourse;
