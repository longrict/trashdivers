import './login.css';
import React, {useState} from 'react';
import {Validation} from './LoginValidation.js';

function Login(){
    const [values,setValues] = useState({
        username:'',
        password:''
    });
    const [errors, setErrors] = useState({})


    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
    }

    return (
        <div className="loginBody">
            <div className="loginBox">
                <div className="text">LOGIN</div>
                <form id="loginData" action="" onSubmit={handleSubmit}>
                    <input type="text" id="username" name="username" 
                    placeholder="Enter username" onChange={handleInput}></input>
                    {errors.username && <span>{errors.username}</span>}

                    <input type="text" id="password" name="password"
                    placeholder="Enter password" onChange={handleInput}></input>
                    {errors.password && <span>{errors.password}</span>}

                    <input type="submit" id="submit" value="Login"/>
                </form>
            </div>
        </div>
    )
};

export {Login};