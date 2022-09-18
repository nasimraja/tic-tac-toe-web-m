import React from 'react';
import {BrowserRouter, Routes ,Route,Switch} from 'react-router-dom';
import './components/css/style.css';
import './App.css';

import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login'
import Register from './components/pages/register/Register';
import Game from './components/pages/game/Game';
import Dashboard from './components/pages/recordlisting/Dashboard';
import GameStart from './components/pages/game/GameStart';
import Private from './components/component/Privateroute'
import ResetPassword from './components/pages/resetpassword/ResetPassword'
import GameProvider from './components/pages/doctor/GameProvider';
import DoctorPatientHistory from './components/pages/doctor/PatientHistory';
import Ownerdashboard from './components/pages/ownerdashboard/Ownerdashboard';
import PatientList from './components/pages/ownerdashboard/PatientList';
import PatientHistory from './components/pages/ownerdashboard/PatientHistory';
import DoctorProfile from './components/pages/doctor/DoctorProfile';
import EditDoctorProfile from './components/pages/doctor/EditDoctorProfile';
import OwnerEditDoctorProfile from './components/pages/doctor/OwnerEditDoctorProfile';
import OwnereditPatient from './components/pages/ownerdashboard/OwnereditPatient';
import OwnereditPatientHistory from './components/pages/ownerdashboard/OwnereditPatientHistory';
import DoctorEditPatientList from './components/pages/doctor/DoctorEditPatientList';
import DoctorEditpatienthistory from './components/pages/doctor/DoctorEditpatienthistory';
import PatientProfile from './components/pages/patients/PatientProfile';
import EditPatientProfile from './components/pages/patients/EditPatientProfile';

function App(){
	return(
		<BrowserRouter>			
			<Routes>
					<Route element={<Private />}>
						<Route path="/game" element={<Game />} />
						<Route path="/game/start" element={<GameStart />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/game/provider" element={<GameProvider />} />
						<Route path="/gameprovider/:patient" element={<DoctorPatientHistory />} />
						<Route path="/owner/dashboard" element={<Ownerdashboard />} />
						<Route path="/patient/list/:patientlist" element={<PatientList />} />
						<Route path="/patient/history/:Patienthistory" element={<PatientHistory />} />
						<Route path="/doctor/profile" element={<DoctorProfile />} />
						<Route path="/edit/profile" element={<EditDoctorProfile />} />
						<Route path="/owner/edit/profile/:ownereditdoctor" element={<OwnerEditDoctorProfile />} />
						<Route path="/owner/edit/patient/:ownereditpatient" element={<OwnereditPatient />} />
						<Route path="/owner/edit/patient/history/:ownereditpatienthistory" element={<OwnereditPatientHistory />} />
						<Route path="/doctor/edit/patient/profile/:doctoreditpatient" element={<DoctorEditPatientList />} />
						<Route path="/doctor/edit/patient/history/:doctoreditpatienthistory" element={<DoctorEditpatienthistory />} />
						<Route path="/patient/profile" element={<PatientProfile />} />
						<Route path="/edit/patient/profile" element={<EditPatientProfile />} />
						<Route path="/reset/password/:token" element={<ResetPassword />} />
					</Route>
					
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<Register />} />
					
					
			</Routes>
	</BrowserRouter>
	)
}

export default App;
