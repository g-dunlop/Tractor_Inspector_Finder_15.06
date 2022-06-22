import React, {useEffect, useState} from "react";
import {Rating} from 'react-simple-star-rating';
import AdminInspectorNotes from "./AdminInspectorNotes";
import Notes from '../../static/notes-icon.png';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';


const AdminInspectorItem = ({inspector, index, handleDeleteButtonClick, handleUpdateButtonClick, updateInspector}) => {

    const [inspectorEmail] = useState(`mailto:${inspector.email}`)
    const [inspectorPhoneNumber] = useState(`tel:${inspector.phoneNumber}`)
    const [rating, setRating] = useState(inspector.rating);
    const [inspectorToUpdate, setInspectorToUpdate] = useState(null)
    const [isNotes, setIsNotes] = useState(false);

    
    const handleRating = (number) => {
        setRating(number)
        let temp =inspector
        temp.rating = number
        setInspectorToUpdate(temp)
    } 

    const handleNotes = (notes) => {
        let temp = inspector
        temp.notes = notes
        setInspectorToUpdate(temp)
    }

    useEffect(() => {
        if (inspectorToUpdate !== null){
            updateInspector(inspectorToUpdate)
        }
    }, [inspectorToUpdate])

    const handleNotesClick = (evt) => {
        setIsNotes(!isNotes)
    }

    const handleUpdate = () => {
        handleUpdateButtonClick(inspector.id)
    }

    const handleDelete = () => {
        handleDeleteButtonClick(inspector.id)
    }

    return (
        <>
            <tr>
                <td>{inspector.name}</td>
                <td>{inspector.address}</td>  
                <td><a href={inspectorPhoneNumber}>{inspector.phoneNumber}</a></td>
                <td><a href={inspectorEmail}>{inspector.email}</a></td>
                <td><Rating onClick={handleRating} allowHalfIcon={true} size={20} ratingValue={rating} /></td>
                <td><div className="table-buttons">
                    <button className="notes" onClick={handleNotesClick}><img src={Notes} height="33px" width="40px" alt="a notebook" /></button></div>
                    {isNotes ? <AdminInspectorNotes handleNotesClick={handleNotesClick} inspector={inspector} index={index} handleNotes={handleNotes} /> : null}</td>
                   <td><Nav.Link href={`admin/${inspector.id}`}><Button  size="sm" onClick={handleUpdate} value={inspector.id}>Update</Button></Nav.Link><Button variant="danger" size="sm"  onClick={handleDelete} value={inspector.id}>Delete</Button></td> 
            </tr>
        </>
    )
}
export default AdminInspectorItem;