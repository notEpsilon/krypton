import React from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { TPendingStudent } from '../../types/CTypes';

interface IProps {
    data: TPendingStudent,
    editPending: React.Dispatch<React.SetStateAction<TPendingStudent[]>>
};

const PendingStudent: React.FC<IProps> = ({ data, editPending }) => {
    const handleClick = async () => {
        try {
            axios.post('http://localhost:4000/users/students/verify', data).catch(err => console.error(err));
            editPending(prev => prev.filter(elem => elem.email !== data.email));
        }
        catch (err) {
            console.error(err);
            return;
        }
    };

    return (
        <Card className="d-flex flex-row">
            <Card.Body>{data.name} | {data.email} | {data.faculty} | {data.department}</Card.Body>
            <Button variant="success" onClick={handleClick}>Accept</Button>
        </Card>
    );
};

export default PendingStudent;
