import React, { useRef } from 'react';
import './Navigation.styles.scss';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';

interface IProps {
    sendHeight: React.Dispatch<React.SetStateAction<number>>;
};

const Navigation: React.FC<IProps> = ({ sendHeight }) => {
    const navRef = useRef<HTMLDivElement>(null);

    return (
        <Navbar ref={navRef} collapseOnSelect className="site-navigation" expand="lg" sticky="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/" href="/">
                    <Logo className="logo" />
                </Navbar.Brand>
                <Navbar.Toggle onClick={() => sendHeight(prev => (214 - navRef.current!.offsetHeight))} />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to="/signup" href="/signup">Sign Up</Nav.Link>
                        <Nav.Link as={Link} to="/login" href="/login">Log In</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
