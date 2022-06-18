import React, {useEffect, useState} from "react";
import {Rating} from 'react-simple-star-rating';


const AdminInspectorItem = ({inspector, updateInspector}) => {

    const [inspectorEmail, setInspectorEmail] = useState(`mailto:${inspector.email}`)
    const [inspectorPhoneNumber, setInspectorPhoneNumber] = useState(`tel:${inspector.phoneNumber}`)
    const [rating, setRating] = useState(inspector.rating);
    const [inspectorToUpdate, setInspectorToUpdate] = useState(null)

    
    const handleRating = (number) => {
        setRating(number)
        let temp =inspector
        temp.rating = number
        setInspectorToUpdate(temp)
    } 

    useEffect(() => {
        if (inspectorToUpdate !== null){
            updateInspector(inspectorToUpdate)
        }
    }, [inspectorToUpdate])

    return (
        <>
            <tr>
               
                <td>{inspector.name}</td>
                <td>{inspector.address}</td>  
                <td><a href={inspectorPhoneNumber}>{inspector.phoneNumber}</a></td>
                <td><a href={inspectorEmail}>{inspector.email}</a></td>
                <td><Rating onClick={handleRating} allowHalfIcon={true} size={20} ratingValue={rating} /></td>
                {/* <td><div className="table-buttons">
                    <button className="notes" onClick={handleNotesClick}><img src={Notes} height="33px" width="40px" /></button></div></td>
                    {isNotes ? <InspectorNotes handleNotesClick={handleNotesClick} inspector={inspector} index={index} handleNotes={handleNotes} /> : null}
                <button className="button small" onClick={handleUpdateButtonClick} value={inspector.id}>Update</button><button className="button small" onClick={handleDeleteButtonClick} value={inspector.id}>Delete</button> */}
            </tr>
        </>
    )
}
export default AdminInspectorItem;