import Toast from 'react-bootstrap/toast';
import React, {useState} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ToastContainer from 'react-bootstrap/ToastContainer';


function DeleteToast({isDeleteToast}) {
    const [show, setShow] = useState(isDeleteToast);
  
    return (
      
        <ToastContainer position = "top-end">
        <Row>
        <Col xs={6}>
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast>
        </Col>
        </Row>
        </ToastContainer>
        
    );
  }
  
  export default DeleteToast;