import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { VictoryPie } from "victory-pie";
import MaterialTable from "material-table";
import Header from "../Header";
import { API } from "../../../Config";



const PatientHistory = () => {
    const [graphLoader, setgraphLoader] = useState(false)
    const [pieLoader, setpieLoader] = useState(false)
    const [data, setData] = useState([]);
    const [xAxis, setXaxis] = useState([]);
    const [yAxis, setYaxis] = useState([]);
    const [dateArray, setDateArray] = useState([]);
    const [lossArray, setLossArray] = useState([]);
    const [winAraay, setWinAraay] = useState([]);

    const { patient } = useParams();


    useEffect(() => {
        ShowHistory();
        getWinUser();
        getLossUser();
        getwinDaybyid();

    }, []);

 const myData = [
        { x: "Won", y: xAxis },
        { x: "Loss", y: yAxis },

    ];
    const getWinUser = () => {
        setpieLoader(true)


        fetch(API + "/win/by/" + patient,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                },
            }
        ).then((response) => {
            setpieLoader(false)
            if (response.status == 200) {
                response.json().then((resp) => {
                    console.warn("result", resp);
                    setXaxis(resp.result);
                });
            }



        })
    }
    const getLossUser = () => {
        setpieLoader(true)

        

        fetch(API + "/loss/by/" + patient,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                },
            }
        ).then((response) => {
            setpieLoader(false)
            if (response.status == 200) {
                response.json().then((resp) => {
                    console.warn("result", resp);
                    setYaxis(resp.result);
                });
            }



        })
    }

    const getwinDaybyid = () => {
        setgraphLoader(true)

        fetch(API + "/get/winday/" + patient,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',

                },
            }
        ).then((response) => {
            setgraphLoader(false)
            if (response.status == 200) {
                response.json().then((resp) => {
                    console.warn("result", resp);
                    setDateArray(resp.dateArray);
                    setWinAraay(resp.winAraay);
                    setLossArray(resp.lossArray);
                });
            }

        })
    }

    const ShowHistory = () => {

        fetch(API + "/get/single/user/history/list/" + patient,
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
                            Date: new Date(v.date).toLocaleString(),
                            Result: v.result,
                            Action: <ul className="action-list">
                                <li><a href={"/doctor/edit/patient/history/" + v.id} className="view-patient">Edit</a></li>
                                <li><a href="#" className="view-patient">Delete</a></li>
                            </ul>
                        })
                    })
                    setData(_temp);


                });
            }



        })
    }

    return (
        <div className="recordlist-bg">
            <Header />

            <div className="container">
            <div className="row">
                    <div className="col-lg-6">
                        <div className="chart-box">
                            {
                                dateArray.length > 0 && lossArray.length > 0 && winAraay.length > 0 &&
                                <Bar data={{
                                    labels: dateArray,
                                    datasets: [{
                                        label: 'Won',
                                        data: winAraay,
                                        backgroundColor: "green"
                                    },
                                    {
                                        label: 'Loss',
                                        data: lossArray,
                                        backgroundColor: "red"
                                    }
                                    ]
                                }}
                                    options={{
                                        scales: {
                                            yAxis: [
                                                {

                                                    ticks: {
                                                        beginAtZero: true
                                                    }
                                                }
                                            ]
                                        }
                                    }}

                                />
                            }

                            {
                                 graphLoader &&

                                <div className="wrp-chart-loader">
                                    <div class="loading">
                                        <div class="loading-1"></div>
                                        <div class="loading-2"></div>
                                        <div class="loading-3"></div>
                                        <div class="loading-4"></div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="chart-box">
                           
                               
                                    <VictoryPie
                                    data={myData}
                                    colorScale={["blue", "red"]}
                                    radius={100}
                                />
                               
                            
                           
                        </div>
                    </div>
                </div>
                <div className="table-box">
                    <div style={{ maxWidth: "100%" }} className="table-box">
                        <MaterialTable options={{
                            headerStyle:{backgroundColor:'#000',color:'#fff'},
                            search: false,
                            showTitle: false,
                            toolbar: false,
                        }}
                            columns={[

                                { title: "User name", field: "username" },
                                { title: "Date", field: "Date" },
                                { title: "Email", field: "email" },
                                { title: "Result", field: "Result" },
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

export default PatientHistory;