import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableViewIcon from "@mui/icons-material/TableView";
import SettingsIcon from "@mui/icons-material/Settings";
import { AppRegistrationOutlined, SupportAgentOutlined } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Logo from "../../assets/images/logo.png"
import LogoWithName from "../../assets/images/logoWithName.png"
import SensorsIcon from '@mui/icons-material/Sensors';
import { useSelector } from "react-redux";
import {userRolesMap} from "../../assets/json/data"
import { imageListClasses } from "@mui/material";

const SidebarContainer = styled.div`
  position: fixed;
  z-index: 11;
  left: 0;
  box-shadow: 0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05);
  width: ${(p) => (p.isOpen ? "260px" : "55px")};
  height: 100vh;
  transition: all 0.3s ease-in-out;
  backdrop-filter: blur(5px);
  background-color: white;

`;
const SidebarWrapper = styled.div`
    height: 100%;
  position: relative;
  padding: 0.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const IconWrapper = styled.div`

  > svg {
    margin: 10px;
    font-size: 20px;
    min-width: 20px;
  }
  margin-right: 0.8rem;
  
`;

const SidebarListItem = styled.div`
  margin: 0.5rem 0;
  min-width: 100px;
  padding: 0.5rem 0.3rem;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  ${({ isActive }) =>
    isActive &&
    css`
      background: linear-gradient(90deg, rgba(33,82,255,1) 0%, rgba(33,212,253,1) 100%); !important;
    `}
  :hover {
    background-color: white;
    box-shadow: 0 4px 9px rgba(17,17,26,.1), 0 8px 32px rgba(17,17,26,.05);

  }
`;

const LogoWrapper = styled.div`
  margin: 0.5rem 0 2rem 0 ;
  >img{
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: left;
  }
`



const HamburgerContainer = styled.div`
  position: absolute;
  z-index: 10000; 
  right: -10px; 
  top: 10px;
  right: -30px;
  transform: translatex(20px);
`

const NavWrapper = styled.div`

`

const BottomSection = styled.div`
    margin-bottom: 2rem;
`
const SocketiconWrapper = styled.div`
    > svg {
        margin: 10px;
        font-size: 20px;
        min-width: 20px;
    }
    margin-right: 0.8rem;
    position: relative; /* add this */
    :before{
        border-radius: 50%;
        content: "";
        background-color: ${p => p.isConnected ? "green" : "red"};
        width: 10px;
        height: 10px;
        position: absolute; /* add this */
        bottom: -3px;
        right: -3px;
    }
`;
const Title = styled.div``
const ProfileContainer = styled.div`
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;  
    gap: 1rem;  
    background: linear-gradient(240deg, rgb(83, 121, 255) 0%, rgb(33, 212, 253) 100%);
`
const ImageWrapper = styled.div`
    background-color: white;
    border-radius: 0.5rem;
    gap: 1rem;
    width: ${p => p.isOpen ? "50px" : "40px"};
    height: ${p => p.isOpen ? "50px" : "40px"};
    display: flex;

    justify-content: center;
    align-items: center;
    >img{
        border-radius: 0.5rem;
        width: 90%;
        height: 90%;
        object-fit: cover;
        object-position: center;
    }
`
const InfoWrapper = styled.div`
    >h5 {
        color: white;
    }
`
function preloadImage(url) {
    const img = new Image();
    img.src = url;
  }

const SideBar = ({ isOpen, set }) => {
  const socketStatus = useSelector(s => s.socket.isClosed)
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (pathname) => {
    return location.pathname === pathname;
  };
  useEffect(() => {
    preloadImage(LogoWithName)
    preloadImage(Logo)
  },[])

  const HandleNavigate = (path) => {
    set(false);
    navigate(path)
  }
  const user = useSelector(e => e.user.userInfo);
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarWrapper>
        <NavWrapper>
            <LogoWrapper isOpen={isOpen}>
            <img src={isOpen ? LogoWithName : Logo}></img>
            </LogoWrapper>

            <SidebarListItem isActive={isActive("/strategy")} onClick={() => {HandleNavigate("/strategy")}}>
            <IconWrapper className="iconWrapper" ><DashboardIcon /></IconWrapper>
            Dashboard
            </SidebarListItem>

            <SidebarListItem isActive={isActive("/tables")} onClick={() => {HandleNavigate("/tables")}}>
            <IconWrapper className="iconWrapper"><TableViewIcon /></IconWrapper>
            Tables
            </SidebarListItem>

            <SidebarListItem isActive={isActive("/brokers")} onClick={() => {HandleNavigate("/brokers")}}>
            <IconWrapper className="iconWrapper"><SupportAgentOutlined /></IconWrapper>
            Brokers
            </SidebarListItem>

            {/* <SidebarListItem isActive={isActive("/strategy/1")} onClick={() => {HandleNavigate("/strategy/1")}}>
            <IconWrapper className="iconWrapper"><AppRegistrationOutlined /></IconWrapper>
            Strategy
            </SidebarListItem> */}

            <SidebarListItem isActive={isActive("/settings")} onClick={() => {HandleNavigate("/settings")}}>
            <IconWrapper className="iconWrapper"><SettingsIcon /></IconWrapper>
            Settings
            </SidebarListItem>  
        </NavWrapper>

        <BottomSection>
            {isOpen && <Title>INDICATOR</Title>}
            <SidebarListItem>
                <SocketiconWrapper isConnected={!socketStatus} className="iconWrapper"><SensorsIcon /></SocketiconWrapper>WebSocket
            </SidebarListItem>

            {isOpen ? 
            <ProfileContainer>
                <ImageWrapper>
                    <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"/>
                </ImageWrapper>
                <InfoWrapper>
                    <h5>{user?.username}</h5>
                    <p>{userRolesMap[user?.clienttype_id]}</p>
                </InfoWrapper>
            </ProfileContainer>
            :
            <ImageWrapper isOpen={isOpen}>
                    <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"/>
            </ImageWrapper>
            }
        </BottomSection>

      </SidebarWrapper>


      <HamburgerContainer className="iconWrapper" onClick={() => set(p => !p)}>
        {!isOpen ? <MenuIcon /> : <MenuOpenIcon />}
      </HamburgerContainer>
    </SidebarContainer>
  );
};

export default SideBar;
