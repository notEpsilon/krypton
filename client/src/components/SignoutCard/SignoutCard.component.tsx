import React from 'react';
import './SignoutCard.styles.scss';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { auth } from '../../firebase/firebase.util';

const SignoutCard: React.FC<{ name: string | null | undefined }> = ({ name }) => {
    const navigate = useNavigate();

    const handleClick = async () => {
        await signOut(auth);
        navigate('/');
    };

    return (
        <Card className="d-flex flex-row rounded" style={{ border: 'none' }}>
            <Card.Body>{name}</Card.Body>
            <Button className="rounded-right" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} variant="secondary" onClick={handleClick}>Sign out</Button>
        </Card>
    );
};

export default SignoutCard;
