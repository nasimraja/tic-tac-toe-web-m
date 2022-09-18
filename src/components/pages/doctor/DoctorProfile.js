import React, {useEffect,useRef,useState} from "react";
import MaterialTable from "material-table";
import Header from "../Header";
import { API } from "../../../Config";
import { useParams } from "react-router-dom";


const DoctorProfile = ()=>{
    
    const [data, setData] = useState([]);
  
    useEffect(() => {
        getDoctor();
    }, []);

    const getDoctor = () => {
        const id = JSON.parse(localStorage.getItem('users')).id;
        const UserType = 2;
        fetch(API+"/single/doctor/" + UserType + "/" + id,
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


    return(
        <div className="doctor-profile-bg">
            <Header />
           <div className="container">
           <div className="doctor-profile-wrp">
                
                <div className="doctor-profile-head">
                    <div className="doctor-profile-head-child1">
                        <h3>Doctor Profile</h3>
                    </div>
                    <div className="doctor-profile-head-child2">
                        <a href="/edit/profile">Edit Profile</a>
                    </div>
                </div>
                
                <ul className="doctor-profile-list">
                    <li>
                        <div className="wrp-docotr-profile-input">
                            <div className="docotr-profile-input">
                                <input placeholder="Name" value={data.name} />
                            </div>
                            <div className="docotr-profile-input">
                                <input placeholder="Email" value={data.email} />
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="wrp-docotr-profile-input">
                            <div className="docotr-profile-input w-100">
                                <input placeholder="Password" type="password" value={data.password} />
                            </div>
                        </div>
                    </li>
                   
                </ul>
            </div>
           </div>
        </div>
    )

}

export default DoctorProfile;