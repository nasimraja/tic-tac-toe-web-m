import React, {useEffect,useRef,useState} from "react";
import MaterialTable from "material-table";
import Header from "../Header";
import { API } from "../../../Config";
import { useParams } from "react-router-dom";


const DoctorEditPatientList = ()=>{
    const {doctoreditpatient} = useParams();
    const name = useRef();
    const email = useRef();
    const password = useRef();
    
    const [data, setData] = useState([]);
  
    useEffect(() => {
        getSinglePatient();
    }, []);

    const getSinglePatient = () => {
        let UserType = 3;
        fetch(API+"/get/single/patient/" + UserType + "/" + doctoreditpatient,
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
                    setData(resp.data[0]);
                   
                });
            }
            


        })
    }
    const UpdateDoctor = () => {
        let data = {};

        data['name'] = name.current.value;
        data['email'] = email.current.value;
        data['password'] = password.current.value;
        let UserType = 3;


        fetch(API+"/update/patient/" + UserType + "/" + doctoreditpatient, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body:JSON.stringify(data)
        }).then((response) => {
            if (response.status == 200) {
                response.json().then((resp) => {
                    console.log(resp)
                });
            }
            else {
                alert("network error")
            }

        })



    }


    return(
        <div className="doctor-profile-bg">
            <Header />
           <div className="container">
           <div className="doctor-profile-wrp">
                
                <div className="doctor-profile-head">
                    <div className="doctor-profile-head-child1">
                        <h3>Edit Profile</h3>
                    </div>
                   
                </div>
                
                <ul className="doctor-profile-list">
                    <li>
                        <div className="wrp-docotr-profile-input">
                            <div className="docotr-profile-input">
                                <input placeholder="Name" defaultValue={data.name} ref={name} />
                            </div>
                            <div className="docotr-profile-input">
                                <input placeholder="Email" defaultValue={data.email} ref={email} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="wrp-docotr-profile-input">
                            <div className="docotr-profile-input w-100">
                                <input placeholder="Password" type="password" defaultValue={data.password} ref={password} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="wrp-docotr-profile-input">
                            <div className="docotr-profile-input w-100">
                               <button onClick={UpdateDoctor}>Update</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
           </div>
        </div>
    )

}

export default DoctorEditPatientList;