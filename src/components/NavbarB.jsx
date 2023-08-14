import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

export default function CustomNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the authToken from localStorage
    localStorage.removeItem("authToken");
    // Redirect to the login page
    navigate("/Login");
    console.log("logged out")
  };

 const handleCart = (e)=> {
    e.preventDefault();
    console.log("my Cart")
 }

  return (
    <Navbar bg="success" expand="lg">
      <Navbar.Brand className="fs-1 fst-italic">
        <Link to="/">GoFood</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="me-auto">
          <Nav.Link className="fs-5" as={Link} to="/">
            Home
          </Nav.Link>
          {!localStorage.getItem("authToken") && (
            <Nav.Link className="fs-5" as={Link} to="/my-orders">
              My Orders
            </Nav.Link>
          )}
        </Nav>
        <Nav>
          {!localStorage.getItem("authToken") ? (
            <>
              <Button className="bg-white text-success mx-1" as={Link} to="/Login">
                Login
              </Button>
              <Button className="bg-white text-success mx-1" as={Link} to="/create-user">
                Signup
              </Button>
            </>
          ) : (
            <>
              <Button variant="light" className="text-success mx-2" onClick={handleCart}>
                My Cart
              </Button>
              <Button onClick={handleLogout} variant="light" className="text-success">
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
