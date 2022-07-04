// import React from 'react'
import './input.css'
import { FiSearch } from 'react-icons/fi';

const Input = ({text, submit, func}) => {
  return (
    <form className='input' onSubmit={submit}>
            <input type={'Text'} placeholder='Enter Location' className='input_value' onChange={text}/>
            <span>
                <FiSearch className='input_icon' onClick={func}/>
            </span>
    </form>
  )
}

export default Input