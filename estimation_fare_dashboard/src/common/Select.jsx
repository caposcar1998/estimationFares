import React from 'react';

export default function Select({title, options, getValue}){

    return (
        <select class="form-select" onChange={getValue}>
        <option selected>{title}</option>
        {options.map((value, index) => {
            return <option value={value.id}>{value.name}</option>
        })}
      </select>
    )
}