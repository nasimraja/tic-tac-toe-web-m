import React, {useEffect,useRef,useState} from "react";
import MaterialTable from "material-table";
import Header from "../Header";
import { API } from "../../../Config";
import { useParams } from "react-router-dom";


const DoctorEditpatienthistory = ()=>{
    const {doctoreditpatienthistory} = useParams();
    const name = useRef();
    const email = useRef();
    const result = useRef();
    const dates = useRef();
    
    const [data, setData] = useState([]);
  
    useEffect(() => {
        getPatientHistory();
    }, []);

    const getPatientHistory = () => {
        
        fetch(API+"/single/patient/history/" + doctoreditpatienthistory,
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
    const UpdatePatientHistory = () => {
        let data = {};

        data['name'] = name.current.value;
        data['email'] = email.current.value;
        data['result'] = result.current.value;
        data['date'] = dates.current.value;


        fetch(API+"/updatepatient/byowner/" + doctoreditpatienthistory, {
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
                            <div className="docotr-profile-input">
                                <input placeholder="Password" defaultValue={data.result} ref={result} />
                            </div>
                            <div className="docotr-profile-input">
                                <input placeholder="Password" defaultValue={data.date} ref={dates} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="wrp-docotr-profile-input">
                            <div className="docotr-profile-input w-100">
                               <button onClick={UpdatePatientHistory}>Update</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
           </div>
        </div>
    )

}

export default DoctorEditpatienthistory;