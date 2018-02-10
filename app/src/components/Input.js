import React from 'react'

const Input = ({ handleChange, submit, shown, valueField }) => {
    return (
        <div>
            <form onSubmit={submit}>
                <input id={shown ? "" : "hide"} type="text" placeholder="Add New Todo" value={valueField} onChange={handleChange}  />
            </form>
        </div>
    )
    
}

export default Input