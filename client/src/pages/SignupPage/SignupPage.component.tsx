import React from 'react';
import { Container } from 'react-bootstrap';

interface IProps {
    navHeight: number;
};

const SignupPage: React.FC<IProps> = ({ navHeight }) => (
    <Container className="signup-page" style={{ height: `calc(100vh - ${navHeight}px)` }}>
        SignUp Page
    </Container>
);

export default SignupPage;
