import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import App from './App'
import { Outlet } from 'react-router-dom'
import img from './soccerimageclear.png'
import SearchIcon from '@mui/icons-material/Search';

export const Nav = (props) => {

    function handleSearchInput(event){
        event.preventDefault();
        console.log("User is searching")
    }

  return (
    <>
    <nav className='navbar soccer--background'>
        <ul className='navbar--ul'>
            <li>
                <h1>FútbolFanHub ⚽</h1>
            </li>
            <li className='search--input--container'>
                <form onSubmit={handleSearchInput}>
                <input value={props.input} onChange={props.handleChange} type='text' placeholder='Search FutbolFanHub' id='search--input' ></input>
                <span><SearchIcon/></span>
                </form>
            </li>
            <div className='home--createnewpost '>
                <li><Link to='/' className='navbar--link navbar--link--margin'>Home</Link></li>
                <li><Link to='/create' className='navbar--link'>Create New Post</Link></li>
            </div>
        </ul>
    </nav>
    <Outlet />
    </>
  )
}
