import React from 'react';
import { VerifiedStudent } from '../../types/CTypes';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

interface IProps {
    data: VerifiedStudent;
    editDidntPay: React.Dispatch<React.SetStateAction<VerifiedStudent[]>>;
};

const TuitionCard: React.FC<IProps> = ({ data, editDidntPay }) => {
    const handleClick = async () => {
        try {
            await axios.put(`http://localhost:4000/users/students/${data.email}`, {
                ...data,
                tuitionPaid: true
            });

            editDidntPay(prev => prev.filter(elem => elem.email !== data.email));
        }
        catch (err) {
            console.error(err);
            return;
        }
    };

    return (
        <Card className="d-flex flex-row">
            <Card.Body>{data.name} | {data.email} | {data.faculty} | {data.department}</Card.Body>
            <Button variant="success" onClick={handleClick}>Declare as Paid</Button>
        </Card>
    );
};

export default TuitionCard;
