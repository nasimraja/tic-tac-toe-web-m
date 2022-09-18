import React, { useEffect, useRef, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { VictoryPie } from "victory-pie";
import MaterialTable from "material-table";
import Header from "../Header";
import { API } from "../../../Config";



const Dashboard = () => {
    const [graphLoader, setgraphLoader] = useState(false)
    const [pieLoader, setpieLoader] = useState(false)
    const [namelist, setNamelist] = useState([]);
    const [data, setData] = useState([]);
    const [xAxis, setXaxis] = useState([]);
    const [yAxis, setYaxis] = useState([]);
    const [sAxis, setSaxis] = useState([]);
    const [dateArray, setDateArray] = useState([]);
    const [lossArray, setLossArray] = useState([]);
    const [winAraay, setWinAraay] = useState([]);
    const [tieAraay, setTieAraay] = useState([]);

    useEffect(() => {
        ShowHistory();
        getUserlistByid();
        getWinUser();
        getLossUser();
        getwinDaybyid();
        getTiedUser();

    }, []);

    const getUserlistByid = () => {
        const id = JSON.parse(localStorage.getItem('users')).id;

        fetch(API + "/user/list/by/" + id,
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
                    setNamelist(resp.data[0]);

                });
            }


        })
    }

    
    const getWinUser = () => {
      

        const uid = JSON.parse(localStorage.getItem('users')).id;

        fetch(API + "/win/by/" + uid,
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
                    setXaxis(resp.result);
                });
            }



        })
    }
    const getLossUser = () => {
        
        const uid = JSON.parse(localStorage.getItem('users')).id;

        fetch(API + "/loss/by/" + uid,
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
                    setYaxis(resp.result);
                });
            }



        })
    }
    const getTiedUser = () => {
        
        const uid = JSON.parse(localStorage.getItem('users')).id;

        fetch(API + "/tied/by/" + uid,
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
                    setSaxis(resp.result);
                });
            }



        })
    }


    const myData = [
        { x: "Won", y: xAxis },
        { x: "Loss", y: yAxis },
        { x: "Tied", y: sAxis },
        

    ];
    const ShowHistory = () => {

        const name = JSON.parse(localStorage.getItem('users')).name;
        const uid = JSON.parse(localStorage.getItem('users')).id;
        console.log(name)

        fetch(API + "/history/list/" + uid,
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

                        })
                    })
                    setData(_temp);


                });
            }



        })
    }


    const getwinDaybyid = () => {
        setgraphLoader(true)
        const uid = JSON.parse(localStorage.getItem('users')).id;

        fetch(API + "/get/winday/" + uid,
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
                    setTieAraay(resp.tiedArray)
                });
            }

        })
    }
    console.log(xAxis)
    return (
        <div className="recordlist-bg">
            <Header />
            <div className="container">
                <div className="heading-dashboard">
                    {
                        <h3>Welcome {namelist.name},</h3>
                    }
                </div>
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
                                    },
                                    {
                                        label: 'Tied',
                                        data: tieAraay,
                                        backgroundColor: "yellow"
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
                                <div className="wrp-label-winLoss"><span className="loss-label"></span> <label>Loss</label> <span className="won-label"></span> <label>Won</label>  <span className="tied-label"></span> <label>Tied</label></div>
                                <VictoryPie
                                data={myData}
                                colorScale={["green", "red","yellow"]}
                                radius={100}
                                padding={10}
                                // width={400} height={400}
                                style={{
                                    
                                    labels: {
                                      fontSize: 25
                                    }
                                  }}
                            /> 
                           
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="table-box">
                    <div style={{ maxWidth: "100%" }} className="table-box">
                        <MaterialTable options={{
                            headerStyle: { backgroundColor: '#000', color: '#fff' },
                            search: false,
                            showTitle: false,
                            toolbar: false,
                        }}
                            columns={[

                                { title: "User name", field: "username" },
                                { title: "Date", field: "Date" },
                                { title: "Email", field: "email" },
                                { title: "Result", field: "Result" },



                            ]}
                            data={data}

                        />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Dashboard;