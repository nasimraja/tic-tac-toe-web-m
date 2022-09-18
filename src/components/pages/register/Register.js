import React, { useEffect, useRef,useState } from "react";
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { API } from "../../../Config";


const Register = () => {
    const [Loader, setLoader] = useState(false)
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('')

    const validateEmail = (e) => {
        var email = e.target.value

        if (validator.isEmail(email)) {
            setEmailError('Valid Email :)')
        } else {
            setEmailError('Enter valid Email!')
        }
    }

    useEffect(()=>{
        
        const auth = localStorage.getItem('users');
        if(auth){
            navigate("/dashboard");
        }
    })


    const saveRegister = () => {
        setLoader(true)
        let data = {};

        data['name'] = name.current.value;
        data['email'] = email.current.value;
        data['password'] = password.current.value;
        data['UserType'] = 2;
      


        fetch(API+"/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body:JSON.stringify(data)
        }).then((response) => {
            setLoader(false)
            if (response.status == 200) {
                response.json().then((resp) => {
                    // console.log("results", resp);
                    localStorage.setItem("users",JSON.stringify(resp))
                    navigate("/game/provider");
                });
            }
            else {
                alert("network error")
            }

        })



    }

    return (
        <div>
            <div className="register-bg">
                <div className="regidter-box">
                    <ul className="register-list">
                        <li>
                            <input placeholder="Enter Name" ref={name} />
                        </li>
                        <li>
                            <input type="text" id="userEmail"
                                onChange={(e) => validateEmail(e)} placeholder="Enter Email" ref={email} />
                            <span style={{
                                fontWeight: 'bold',
                                color: 'red',
                            }}>{emailError}</span>
                        </li>
                        <li>
                            <input placeholder="Enter Password" type="password" ref={password} />
                        </li>
                    </ul>
                    <div className="register-btn">
                        <button onClick={saveRegister}>Register
                        {
                                Loader && 
                                <div id="loader"></div>
                            }
                        </button>
                        <p className="login-p">You have account <a href="/">please login</a></p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;