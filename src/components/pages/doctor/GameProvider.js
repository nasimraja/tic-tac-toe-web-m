import React, {useEffect,useRef,useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import Plot from 'react-plotly.js';
import MaterialTable from "material-table";
import Header from "../Header";
import validator from 'validator';
import { API } from "../../../Config";
import {csv} from 'd3';


const GameProvider = ()=>{
    const [namelist, setNamelist] = useState([]);
    const [data, setData] = useState([]);
    const [addformModel, setAddformModel] = useState(false);
    const addformModelToggle = () => setAddformModel(!addformModel);
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const [emailError, setEmailError] = useState('')
    const [xAxis,setXaxis] = useState([]);
    const [yAxis,setYaxis] = useState([]);
    const [plot,setPlot] = useState(null);
 
  
    useEffect(() => {
        usertype3Histroylist();
        getCsv() ; 

    }, []);


    const getCsv = () => {
        const doctor = JSON.parse(localStorage.getItem('users')).id;
        fetch(API+"/get/patient/list/" + doctor,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
               
                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    console.warn("result", resp);
                      
                        if (resp.data[0]) {
                            getData(resp.data[0].name)
                        }


                });
            }
          
            else {
                alert("network error")
            }


        })
    }
   
    async function getData(){
        let _x = [] ;
        let _y = [];
        csv('/5f7c7a23456e7signalB.csv').then(data=>{
           console.log(data);
            data.map((v,i) => {
                // _x.push(new Date(v.x));
                _x.push(new Date(parseInt(v.x)));
                _y.push(parseFloat(v.y));
                if(i == 1){
                    // alert("here");
                    setXaxis(_x);
                    setYaxis(_y);
                    // plotGraph(_x,_y);
 
                }
            })
            // console.log(data)
        })

    }
  
    const usertype3Histroylist = () => {
 
        const doctor = JSON.parse(localStorage.getItem('users')).id;
        console.log(doctor)
      
        fetch(API+"/get/patient/list/" + doctor,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                },
            }
        ).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    console.warn("result", resp);
                    let _temp = [];
                    resp.data.map((v, i) => {
                        _temp.push({
                            username: v.name,
                            email: v.email,
                            Action: <ul className="action-list">
                            <li><a href={"/gameprovider/" + v.id} className="view-patient">View</a></li>
                            <li><a href={"/doctor/edit/patient/profile/" + v.id} className="view-patient">Edit</a></li>
                            <li><a href="#" className="view-patient">Delete</a></li>
                          
                        </ul>
                        })
                    })
                    setData(_temp);


                });
            }
            


        })
    }

    const saveGameProvider = () => {
        const doctor = JSON.parse(localStorage.getItem('users')).id;
        console.log(doctor);

        let data = {};
        data['name'] = name.current.value;
        data['email'] = email.current.value;
        data['password'] = password.current.value;
        data['UserType'] = 3;
        data['doctor'] = doctor;
      


        fetch(API+"/doctor", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body:JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    // console.log("results", resp);
                    addformModelToggle();
                });
            }
            else {
                alert("network error")
            }

        })



    }
    const validateEmail = (e) => {
        var email = e.target.value

        if (validator.isEmail(email)) {
            setEmailError('Valid Email :)')
        } else {
            setEmailError('Enter valid Email!')
        }
    }

    return(
        <div className="recordlist-bg">
            <Header />
            <div className="container">
            {/* <div className="row">
                    <div className="col-lg-6">
                    <div className="chart-box">
                            {
                                xAxis.length > 0 && yAxis.length > 0 &&
                                <Plot
                                data={[
                                    {
                                        x: xAxis,
                                        y: yAxis,
                                        type: 'bar',
                                        marker: { color: 'red' },
                                    },
                                    // { type: 'bar', x: [1, 2, 3], y: [2, 6, 3] },
                                ]}
                               
                            />
                            }
  
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="chart-box">
                        <Plot style={{width: "100%", height: "240px"}}
                            data={[
                            {
                                x: [1, 2, 3],
                                y: [2, 6, 3],
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'red'},
                            },
                            {type: 'line', x: [1, 2, 3], y: [2, 5, 3]},
                            ]}
                            layout={ { 
                            showlegend: false,
                            margin: {
                                l: 30,
                                r: 0,
                                b: 20,
                                t: 10,
                                pad: 4
                            },} }
                        />
                        </div>
                    </div>
                </div> */}
                <div className="head-game-provider">
                    <div className="game-provider-child">
                        <h3>Patients</h3>
                    </div>
                    <div className="game-provider-child">
                        <a href="#" onClick={addformModelToggle}>Add patient</a>
                    </div>
                </div>
            </div>
            <div className="container">
            <div className="table-box">
            <div style={{ maxWidth: "100%" }} className="table-box">
                        <MaterialTable options={{
                                    headerStyle:{backgroundColor:'#000',color:'#fff'},
                                    search: false,
                                    showTitle: false,
                                    toolbar:false,
                            }}
                            columns={[
                               
                                { title: "User name", field: "username" },
                                { title: "Email", field: "email" },
                                { title: "Action", field: "Action" },
                                
                                
                            ]}
                            data={data}
                           
                        />
                    </div>
            </div>
            </div>
            <Modal isOpen={addformModel} toggle={addformModelToggle} centered={true} className="main-pop-box">
                <ModalHeader toggle={addformModelToggle}><span className="ml-1 modal-title2">Game Provider</span></ModalHeader>
                <ModalBody>
                    <div className="modal-p">
                    <div className="gameprovider-box">
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
                        <button onClick={saveGameProvider}>Add</button>
                        
                    </div>
                </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )

}

export default GameProvider;