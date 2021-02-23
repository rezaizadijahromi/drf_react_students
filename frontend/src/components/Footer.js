import React from 'react'
import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import '../App.css';

function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">Copyright &copy; rij</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer