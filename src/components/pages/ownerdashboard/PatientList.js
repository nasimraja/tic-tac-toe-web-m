import React, {useEffect,useRef,useState} from "react";
import Plot from 'react-plotly.js';
import MaterialTable from "material-table";
import Header from "../Header";
import { API } from "../../../Config";
import { useParams } from "react-router-dom";


const PatientList = ()=>{
    const [data, setData] = useState([]);
    const {patientlist} = useParams();
  
    useEffect(() => {
        doctorList();

    }, []);


    const doctorList = () => {
        
        fetch(API+"/get/patient/list/" + patientlist,
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
                            <li><a href={"/patient/history/" + v.id} className="view-patient">View</a></li>
                            <li><a href={"/owner/edit/patient/" + v.id} className="view-patient">Edit</a></li>
                            <li><a href="#" className="view-patient">Delete</a></li>
                        </ul>
                        })
                    })
                    setData(_temp);


                });
            }
            


        })
    }

    return(
        <div className="recordlist-bg">
            <Header />
            <div className="container">
                <div className="heading-dashboard">
                   <h3>Patient List</h3>
                </div>
                
            </div>
            <div className="container">
            <div className="table-box">
            <div style={{ maxWidth: "100%" }} >
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
        </div>
    )

}

export default PatientList;