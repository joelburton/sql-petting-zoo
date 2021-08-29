import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function SiteNavbar({ quizzes }) {
  return (
    <Navbar bg="primary" expand="lg" className="mb-5" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>🐹 SQLPettingZoo</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link href="#home">Home</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Quizzes" id="basic-nav-dropdown">
              { Object.entries(quizzes).map(([id, quiz]) => (
                <LinkContainer to={ `/${ id }/` }>
                  <NavDropdown.Item>{ quiz.title }</NavDropdown.Item>
                </LinkContainer>
              )) }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SiteNavbar;