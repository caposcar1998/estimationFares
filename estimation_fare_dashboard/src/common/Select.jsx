import React from 'react';

export default function Select({title, options}){

    return (
        <select class="form-select" aria-label="Default select example">
        <option selected>{title}</option>
        {options.map((value, index) => {
            return <option value={value}>{value.name}</option>
        })}
      </select>
    )
}