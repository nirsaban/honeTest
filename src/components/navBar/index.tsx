import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavBar = () => {
  return (
    <Navbar bg="primary" expand="lg">
      <Container>
        <Navbar.Brand className="text-light">Data Reports</Navbar.Brand>
      </Container>
    </Navbar>
  );
};
