import React from 'react'

const Note = ({ note, noteState, handleCross, handleDelete, id}) => {
    return (
        <li className={noteState ? "done" : ""}>
            <span ><i className="fa fa-trash" id={id} onClick={handleDelete}></i></span>
            <text id={id} onClick={handleCross}>{note}</text>
        </li>
    )
}

export default Note