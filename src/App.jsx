import './App.css'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Brockers from './pages/Brokers/Brockers'
import Dashboard from './pages/Dashboard/Dashboard'
import StratagyPage from './pages/Stratagy page/StratagyPage'
import GraphComponent from './components/GraphComponent'
import TradingWindow from './pages/TradingWinfow/TradingWindow'
import HomePage from './pages/HomePage/HomePage'
import SideBar from './components/sideBar/SideBar'
import { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import styled from 'styled-components'
import Login from './pages/Auth/Login page/Login'
import { useDispatch, useSelector } from 'react-redux'
import Register from './pages/Auth/register page/Register'
import SettingsPage from './pages/Setting/SettingsPage'
import {checkSession_API, ws} from "./API/api"
import { SocketConnect, SocketDisconnect, Socketclose } from './redux/SocketSlice'
import Test from './pages/Test'
import { LogoutUser } from './redux/UserSlice'
import { toast } from 'react-toastify'
import error from './assets/sound/default_error.mp3'


const PrivateRoutes = () => {
  const user = useSelector(r => r.user.info)
  return !user ? <Outlet/> : <Navigate to="/login"/>
}
const PublicRoutes = () => {
    const user = useSelector(r => r.user.info)
    return !user ? <Outlet/> : <Navigate to="/tables"/>
}


function App() {
  const dispatch = useDispatch()
  const user = useSelector(r => r.user.info)
  const socketRedux = useSelector(r => r.socket)
  const [SideBarIsOpen, setSlideBarIsOpen] = useState(false)

  const connectWebSocket = () => {
    if(!user) return;
    console.log({user})

    let interval;
    clearTimeout(interval)
   
    const socket = new WebSocket(ws + "/ws/ticker");

    socket.onopen = () => {
        dispatch(SocketConnect(socket)); console.log("connected to sssssocker")
        socket.send(JSON.stringify({"op": "subscribe", "args": ["orderBookL2_25:XBTUSD"]}));
    }
    socket.onerror = () => setInterval(connectWebSocket(),1000)

    socket.onclose = () => {
      if(!user) return 
      dispatch(Socketclose())
      interval = setTimeout(() => {
        if(socketRedux.status){
          connectWebSocket()
        } else clearTimeout(interval)
      }, 2000);
    }
  }
      
  useEffect(() => {
    connectWebSocket()
    return () => {
      dispatch(SocketDisconnect())
    }
  },[user])
 
  //check session
  const checkSession = async () => {
    const audio = new Audio(error);
    try {
      const {data} = await checkSession_API()
      if(data.status !== "success") {
        dispatch(LogoutUser())
        toast.info("Your Session has been expired!!")
        audio.play();
      }
    } catch (error) {
        // dispatch(LogoutUser())
        // toast.info("Your Session has been expired!!")
        // audio.play();
    }
  }
  
  useEffect(() => {
    if(!user) return 
    const interval = setInterval(checkSession, 60000);
    return () => clearInterval(interval)
  },[user])
  
  
  return (
    <>  
    <Container>
      {user && <div style={{minWidth: "55px"}}><SideBar isOpen={SideBarIsOpen} set={setSlideBarIsOpen} /> </div> }
      <Wrapper>
        {user && <NavBar setSideBar={setSlideBarIsOpen} isSideBarOpen={SideBarIsOpen} />}
        <Routes>
            <Route element={<PublicRoutes/>}>
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/*' element={<HomePage/>} />
            </Route>

            <Route element={<PrivateRoutes/>}>
                <Route path='/chart' element={<GraphComponent/>} />
                <Route path='/brokers' element={<Brockers/>} />
                <Route path='/strategy' element={<Dashboard/>} />
                <Route path='/strategy/:id' element={<StratagyPage/>} />
                <Route path='/tables' element={<TradingWindow/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/settings' element={<SettingsPage/>} />
                <Route element={<Test/>} path="/test"/>
            </Route>
        </Routes>
      </Wrapper>
    </Container>
    </>
  )
}

export default App


const Container = styled.div`
  display: flex;
`
const Wrapper = styled.div`
  width: 100%;
  >div { width: 100%}
`



