import React from 'react'
import style from './MyInput.module.scss'
import clsx from 'clsx'
const MyInput = ({handleChange, value, errorText, name, placeholder, ...args}) => {
  return (
    <>
        <label htmlFor="username">{placeholder}</label>
        <input 
            className={clsx(
                style.myInput,{
                    [style.inputError] : errorText
                }
            )}
            name={name} 
            id={name} 
            placeholder={placeholder}
            onChange={handleChange} 
            value={value} 
            type="text"
            {...args} />
            {errorText && (
        <div style={{color: 'red'}}>{errorText}</div>)}
    </>

  )
}

export default MyInput
