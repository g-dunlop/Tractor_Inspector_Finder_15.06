import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav'
import {useNavigate} from 'react-router-dom'

const AdminNav = ({handleComponentClick}) => {

    let navigate = useNavigate()

    const handleClick = (evt) => {
        handleComponentClick(evt.target.id)
        // console.log(evt.target.value)
        // navigate(`#${evt.target.value}`)
    }

    return(

        <>
            <h2> Admin Dashboard</h2>
            <p>Search and edit the tractor and inspector databases from here</p>
            <Row xs={1} md={2} className="g-4">
                <Col>
                    <Card className="text-center" bg="success" text="light">
                        <Card.Body>
                            <Card.Title>Add a new Inspector</Card.Title>
                            <Card.Text>
                                Use this option to add a new Tractor Inspector to the database.                            </Card.Text>
                            <Nav.Link href="#add-i"><Button onClick={handleClick} variant="dark" id="add-inspector">Add a Tractor Inspector</Button></Nav.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="text-center" bg="success" text="light">
                        <Card.Body >
                            <Card.Title >Add a new Tractor Manufacturer</Card.Title>
                            <Card.Text>
                                Use this option to add a new tractor manufacturer to the database                            </Card.Text>
                            <Nav.Link href="#add-m"><Button onClick={handleClick}  variant="dark" id="add-manufacturer" >Add a Manufacturer</Button></Nav.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="text-center" bg="success" text="light">
                        <Card.Body>
                            <Card.Title>Search for a Tractor Inspector</Card.Title>
                            <Card.Text>
                                Search for Tractor Inspectors by company name here                            </Card.Text>
                                <Nav.Link href="#search"><Button onClick={handleClick}  variant="dark" id="search-inspectors">Start Searching</Button></Nav.Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="text-center" bg="success" text="light">
                        <Card.Body>
                            <Card.Title>View all Tractor Inspectors</Card.Title>
                            <Card.Text>
A list of all Tractor Inspectors currently held in the database                            </Card.Text>
                        <Nav.Link href="#all"><Button onClick={handleClick} variant="dark" id="all-inspectors">See all Inspectors</Button></Nav.Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )

}
export default AdminNav;
