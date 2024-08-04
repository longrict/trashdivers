import './login.css';
import React, {useState} from 'react';
import {Validation} from './LoginValidation.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(){
    const [values,setValues] = useState({
        username:'',
        password:''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("SUBMITTED");
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:8081/login', values)
                .then(res => {
                    if (res.data === "Success") {
                        navigate('/home');
                    } else {
                        alert("Invalid credentials");
                    }
                })
                .catch(err => console.log(err));
        }
    };

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