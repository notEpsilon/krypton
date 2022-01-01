import React from 'react';
import { SCSSProvider } from '../../types/SCSSProvider';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const theme: SCSSProvider = {
    navBrand: {
        letterSpacing: '2.5px'
    },
    logo: {
        maxHeight: '41px',
        maxWidth: '200px'
    }
};

const Navigation: React.FC = () => (
    <Navbar collapseOnSelect expand="lg" sticky="top" bg="dark" variant="dark">
        <Container>
            <Navbar.Brand as={Link} to="/" href="/" style={theme.navBrand}>
                <Logo style={theme.logo} />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link as={Link} to="/signup" href="/signup">Sign Up</Nav.Link>
                    <Nav.Link as={Link} to="/login" href="/login">Log In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

export default Navigation;
