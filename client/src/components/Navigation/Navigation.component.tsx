import './Navigation.styles.scss';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from '../../types/CTypes';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Navbar, Container, Nav } from 'react-bootstrap';
import SignoutCard from '../SignoutCard/SignoutCard.component';

interface IProps {
    sendHeight: React.Dispatch<React.SetStateAction<number>>;
    overallHeight: number;
    homeNav?: boolean;
    userEmail?: string | null;
    userType?: number;
};

const getNavLinks = (userType: number | undefined): Array<NavLink> => {
    if (userType === -1) {
        return [
            {
                title: 'Sign Up',
                path: '/signup'
            },
            {
            title: 'Log In',
            path: '/login'
            }
        ];
    }
    else if (userType === 0) {
        return [];
    }
    else if (userType === 1) {
        return [];
    }
    else {
        return [
            {
                title: 'Pending',
                path: '/it/pending'
            }
        ];
    }
};

const Navigation: React.FC<IProps> = ({ sendHeight, overallHeight, homeNav, userEmail, userType }) => {
    const navRef = useRef<HTMLDivElement>(null);
    const homePath = userType === -1 ? '/' : (userType === 0 ? '/student' : (userType === 1 ? 'professor' : 'it'));

    return (
        <Navbar ref={navRef} collapseOnSelect className="site-navigation" expand="lg" sticky="top" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to={homePath} href={homePath}>
                    <Logo className="logo" />
                </Navbar.Brand>
                <Navbar.Toggle onClick={() => sendHeight(prev => (overallHeight - navRef.current!.offsetHeight))} />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="align-items-center">
                        {
                            getNavLinks(userType).map((navLink, idx) => <Nav.Link key={idx} as={Link} to={navLink.path} href={navLink.path}>{navLink.title}</Nav.Link>)
                        }
                        {
                            !homeNav && <Nav.Item className="cta-item"><SignoutCard name={userEmail} /></Nav.Item>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
