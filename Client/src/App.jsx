import { Route, Routes } from 'react-router-dom'
import './App.css'

import Home from './Pages/Home'
import Visas from './Pages/Visas'

import TouristAustralia from './Pages/TouristAustralia'
import TouristCanada from './Pages/TouristCanada'
import TouristUK from './Pages/TouristUK'
import TouristUSA from './Pages/TouristUSA'
import WorkAustralia from './Pages/WorkAustralia'
import StudyAustralia from './Pages/StudyAustralia'
import VisaApplication from './Pages/VisaApplication'
import Documents from './Pages/Documents'
// import Dashboard from './Pages/Dashboard'
import BookAppointment from './Pages/BookAppointment'
import Enroll from './Pages/Enroll'
import Login from './Pages/Login'
import About from './Pages/About'
import WorkCanada from './Pages/WorkCanada'
import StudyCanada from './Pages/StudyCanada'
import StudyUK from './Pages/StudyUK'
import StudyUSA from './Pages/StudyUSA'
import WorkUSA from './Pages/WorkUSA'
import WorkUK from './Pages/WorkUk'
import AustralisPR from './Pages/AustraliaPR'
import CanadaPR from './Pages/CanadaPR'
import UKPR from './Pages/UKPR'
import USAPR from './Pages/USAPR'
import Profile from './Pages/Profile'
import Dashboard from './Pages/Dashboard'
import Payment from './Pages/Payment'
import VisaBlog from './Pages/VisaBlog'
import Countries from './components/Countries'
// import { TouristCanada } from '../../Backend/models/Austourist'

function App() {

  return (
    <>
    
    {/* <Payme/nt/> */}
    <Routes>
      
    <Route path='/' element={<Home/>}></Route>
    <Route path='/blog' element={<VisaBlog/>}/>
      <Route path='/visas/:country' element={<Visas/>}></Route>
      <Route path="/:country/tourist-australia" element={<TouristAustralia/>} />
      <Route path="/:country/work-australia" element={<WorkAustralia/>} />
      <Route path="/:country/work-canada" element={<WorkCanada/>} />
      <Route path="/:country/work-UK" element={<WorkUK/>} />
      <Route path="/:country/work-USA" element={<WorkUSA/>} />
      <Route path="/:country/tourist-Canada" element={<TouristCanada/>} />
      <Route path='/:country/tourist-UK' element={<TouristUK/>}/>
      <Route path='/:country/tourist-USA' element={<TouristUSA/>}/>
      <Route path='/:country/PR-Australia' element={<AustralisPR/>}/>
      <Route path='/:country/PR-UK' element={<UKPR/>}/>
      <Route path='/payment' element={<Payment/>}/>
      <Route path='/countries' element={<Countries/>}/>
      
      <Route path='/:country/PR-USA' element={<USAPR/>}/>
      <Route path='/:country/PR-Canada' element={<CanadaPR/>}/>
      <Route path='/:country/Study-Australia' element={<StudyAustralia/>}/>
      <Route path='/:country/Study-Canada' element={<StudyCanada/>}/>
      <Route path='/:country/Study-USA' element={<StudyUSA/>}/>
      <Route path='/:country/Study-UK' element={<StudyUK/>}/>
      <Route path="/:country/visa-application" element={<VisaApplication/>}/>
      <Route path="/documents/:id" element={<Documents/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path="/appointment" element={<BookAppointment/>}/>
      <Route path="/enroll" element={<Enroll/>}/>
      <Route path="/stepIn" element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
    </Routes>
    </>
  )
}

export default App





