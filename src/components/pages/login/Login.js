import React, {useEffect,useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import { API } from "../../../Config";



const Login = ()=>{
    const [Loader, setLoader] = useState(false)
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const forgootEmail = useRef();
    const [forgotModal, setforgotModal] = useState(false);
    const forgotModalToggle = () => setforgotModal(!forgotModal);
    const [SuccessModal, setSuccessModal] = useState(false);
    const SuccessModalToggle = () => setSuccessModal(!SuccessModal);
    const [unsuccessModal, setUnsuccessModal] = useState(false);
    const unsuccessModalToggle = () => setUnsuccessModal(!unsuccessModal);



    useEffect(()=>{
        const auth = localStorage.getItem('users');
        if(auth){
            navigate("/dashboard");
        }
    })
    const savelogin = ()=>{
        setLoader(true)
        let data ={};

        data['email'] = email.current.value;
        data['password'] = password.current.value;
       
    
        fetch(API+"/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
        
                },
                body:JSON.stringify(data)
            }).then((response) => {
                setLoader(false)
                if (response.status == 200) {
                    response.json().then((resp) => {
                        console.log("results", resp);
                        localStorage.setItem("users",JSON.stringify(resp))
                        const UserType = JSON.parse(localStorage.getItem('users')).UserType;
                       
                        if(UserType == 3){
                            navigate("/dashboard");
                        }else if(UserType == 2){
                            navigate("/game/provider");
                        }else if(UserType == 1){
                            navigate("/owner/dashboard");
                        }
                        
                    });
                }
                else {
                    alert("invalid login")
                }
               
            })
    
          
       
    }
    const ForgotPassword = ()=>{
        let data ={};

        data['email'] = forgootEmail.current.value;
        
       
    
        fetch("http://localhost:3001/api/forgot", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
        
                },
                body:JSON.stringify(data)
            }).then((response) => {
                if (response.status == 200) {
                    response.json().then((resp) => {
                        console.log("results", resp);
                        SuccessModalToggle();
                        forgotModalToggle();
                       
                        
                    });
                }
                else {
                    unsuccessModalToggle();
                }
               
            })
    
          
       
    }

    return(
        <div>
        <div className="register-bg">
            <div className="regidter-box">
                <ul className="register-list">
                   
                    <li>
                        <input type="email" placeholder="Enter Email" ref={email} />
                    </li>
                    <li>
                        <input placeholder="Enter Password" type="password" ref={password} />
                        {/* <p className="forgot-password"><a href="#" onClick={forgotModalToggle}>Forgot Password</a></p> */}
                    </li>
                </ul>
                <div className="register-btn">
                    <button onClick={savelogin}>Login
                    {
                                Loader && 
                                <div id="loader"></div>
                            }
                    </button>
                </div>
                <p className="login-p"> <a href="/register">Register as doctor here</a></p>
            </div>
        </div>

        <Modal isOpen={forgotModal} toggle={forgotModalToggle} centered={true}>
                <ModalHeader toggle={forgotModalToggle}><span className="ml-1 roititle ">Forgot Password</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <div>
                            <div className="wrp-label">
                                <label>Email Address</label>
                                <input
                                    ref={forgootEmail}
                                    type="email"
                                    placeholder="Email"
                                />
                            </div>
                            <button className="login-btn" type="submit"  >submit 
                            
                            </button>
                        </div>
                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={SuccessModal} toggle={SuccessModalToggle} centered={true}>
                <ModalHeader toggle={SuccessModalToggle}><span className="ml-1 roititle">Submit Successfully</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <p>Please check your email and click on reset password</p>
                    </div>
                </ModalBody>

            </Modal>
            <Modal isOpen={unsuccessModal} toggle={unsuccessModalToggle} centered={true}>
                <ModalHeader toggle={unsuccessModalToggle}><span className="ml-1 roititle">UnSuccessfully</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                        <p>your email not exit my database please register</p>
                    </div>
                </ModalBody>

            </Modal>
    </div>
    )

}

export default Login;