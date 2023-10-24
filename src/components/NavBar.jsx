import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import styled from 'styled-components';
import { LogoutUser } from '../redux/UserSlice';
import { useDispatch } from 'react-redux';
import { Logout_USER__API } from '../API/api';
import { SocketDisconnect } from '../redux/SocketSlice';


const Container = styled.div`
    z-index: 10;
    width: 100%;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0.5rem;
    align-items: center;
    backdrop-filter: blur(10px);
    background-color: rgba(255,255,255,0.8);

    box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);
`
const Left = styled.div`
    
`
const Right = styled.div`
    display: flex;
    gap: 1rem;
`
const NotificationWrapper = styled.div`
box-shadow: 0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05);
  position: relative;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotificationContainer = styled.div`
  right: 0;
  border-radius: 0.5rem; 
  overflow: hidden;
  width: 400px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.10) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  /* display: flex;
  justify-content: center; */
  align-items: center;
  position: absolute;   
  top: 110%; /* Up down */
  transform: translate(0, 5px); /* Left Right */
  ::before {
    content: "";
    position: absolute;
    left : 95%;
    top: -6px;  /* Up down */
    width: 10px;
    height: 10px;
    z-index: 10;
    background-color: white;
    transform: rotate(45deg);
  }
  /* display: ${p => p.open ? "block" : "none"}; */
  pointer-events: none;
  transition: all 0.3s ease-in-out;
  transform: translateY(${p => p.open ? '10px' : '100px'});
  opacity: ${p => p.open ? '1' : '0'};
`;

const Notification = styled.span`
    margin: 0.5rem;
    border-radius: 0.5rem;
    background: linear-gradient(104deg, #376edc, #31be95);
    z-index: 2;
    padding: 10px 20px;
    background-color: inherit;
    color: black;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5px;
    &:hover {
        color: black;
        font-weight: 600;
    }
    >span {
        min-width: 60px;
    }
`
const NotificationHeader = styled.div`
    padding: 1rem 0.5rem;
    >h2{

    }
`

const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}


function NavBar() {
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      const {data} = await Logout_USER__API()
      dispatch(LogoutUser())
    } catch (error) {
      console.log(`err :${error}`)
    }
  }
  const [isMessageOn, setisMessageOn] = useState(false)
  return (
    <Container>   
        <Right>
            <div className='iconWrapper'><FullscreenIcon onClick={toggleFullScreen} /></div>
            <NotificationWrapper className='iconWrapper'>      
                <NotificationsActiveIcon onClick={() => setisMessageOn(p => !p)}/>
                <NotificationContainer onClick={(e) => e.stopPropagation()} open={isMessageOn}>
                    <NotificationHeader>
                        <h3>Notification (1)</h3>
                    </NotificationHeader><hr/>
                    <Notification>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, tenetur.</p>
                        <span>2d ago</span>
                    </Notification>
                    <Notification>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, voluptatibus.</p>
                        <span>2d ago</span>
                    </Notification>
                    <Notification> 
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, neque.</p>
                        <span>2d ago</span>
                        </Notification>
                </NotificationContainer>      
            </NotificationWrapper>
            <div className='iconWrapper'><PowerSettingsNewIcon onClick={handleLogout} /></div>
        </Right>
    </Container>
  )
}

export default NavBar