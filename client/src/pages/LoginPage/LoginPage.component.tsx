import React from 'react';
import { Container } from 'react-bootstrap';

interface IProps {
    navHeight: number;
};

const LoginPage: React.FC<IProps> = ({ navHeight }) => (
    <Container className="login-page" style={{ height: `calc(100vh - ${navHeight}px)` }}>
        Login Page
    </Container>
);

export default LoginPage;
