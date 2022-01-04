import React from 'react';
import './HomePage.styles.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Github } from 'react-bootstrap-icons';
import { ReactComponent as HomeImage } from '../../assets/home-img.svg';

interface IProps {
    navHeight: number;
};

const HomePage: React.FC<IProps> = ({ navHeight }) => {
    return (
        <Container className="home-page" style={{ height: `calc(100vh - ${navHeight}px)` }}>
            <Row className="main-row h-100" xs={1} md={2}>
                <Col className="left d-flex flex-column justify-content-center align-items-start pb-4" xs={{ order: 2 }} md={{ order: 1 }}>
                    <h1 className="title">Welcome To <span className="main gradient">Krypton</span></h1>
                    <p>Krypton is an open-source online university registration systems provider with easy-to-use user interface and cloud-based backend services that provide secure, and fast experience.</p>
                    <Row className="mt-4">
                        <Col>
                            <Button className="cta-1" variant="primary">Get Started</Button>
                            <Button className="cta-2" variant="secondary" href="https://github.com/notEpsilon/krypton" target="_blank">
                                <Github className="ico-github" />
                                <span>Github&nbsp;</span>
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col className="right d-flex align-items-center justify-content-center" xs={{ order: 1 }} md={{ order: 2 }}>
                    <HomeImage className="home-img" />
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
