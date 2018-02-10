import React from 'react'
import Note from './Note';

const Notes = ({ notes, handleCross, handleDelete }) => {
    return (
        <ul id="cont">
            {notes.map(n => 
            <Note key={n.id} 
                id={n.id} 
                note={n.content} 
                noteState={n.noteState} 
                handleCross={handleCross}
                handleDelete={handleDelete}
            />
            )}
        </ul>
    )
}

export default Notes