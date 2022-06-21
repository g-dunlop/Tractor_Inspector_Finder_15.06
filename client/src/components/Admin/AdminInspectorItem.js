import React, {useEffect, useState} from "react";
import {Rating} from 'react-simple-star-rating';
import AdminInspectorNotes from "./AdminInspectorNotes";
import Notes from '../../static/notes-icon.png';


const AdminInspectorItem = ({inspector, index, handleDeleteButtonClick, handleUpdateButtonClick, updateInspector}) => {

    const [inspectorEmail, setInspectorEmail] = useState(`mailto:${inspector.email}`)
    const [inspectorPhoneNumber, setInspectorPhoneNumber] = useState(`tel:${inspector.phoneNumber}`)
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
                    <button className="notes" onClick={handleNotesClick}><img src={Notes} height="33px" width="40px" /></button></div>
                    {isNotes ? <AdminInspectorNotes handleNotesClick={handleNotesClick} inspector={inspector} index={index} handleNotes={handleNotes} /> : null}</td>
                <button className="button small" onClick={handleUpdate} value={inspector.id}>Update</button><button className="button small" onClick={handleDelete} value={inspector.id}>Delete</button>
            </tr>
        </>
    )
}
export default AdminInspectorItem;