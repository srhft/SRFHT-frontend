import React, { useEffect, useState } from 'react'
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import styled from 'styled-components';

import DashboardIcon from "@mui/icons-material/Dashboard";
import TableViewIcon from "@mui/icons-material/TableView";
import SettingsIcon from "@mui/icons-material/Settings";
import {  SupportAgentOutlined } from "@mui/icons-material";

import LogoWithName from "../../../assets/images/logoWithName.png"
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { IconButton, Badge, Tooltip } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';



const Container = styled.div`
  position: sticky;
  z-index: 10;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  transition: height 0.3s ease-in-out;
  height: ${p => p.isInTop ? "100px" : "70px"};
  backdrop-filter: ${p => p.isInTop ? "blur(0px)" : "blur(10px)"};
  //backdrop-filter:blur(10px);
  background-color: ${p => p.isInTop ? "transparent" : "rgba(255,255,255, 0.3)"};
  box-shadow: ${p => p.isInTop ? "none" : "2px 1px 2px #eee"};
`;

const Wrapper = styled.div`
    width: min(90%, 1300px);
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`

const LogoWrapper = styled.div`

  margin-left: 2rem;
  display: flex;
  align-items: center;
  height: 70px;
  img {
    cursor: pointer;
    height: 100%;
  }

  @media (max-width: 768px) {
    margin-left: 20px;
  }
`;

const Mid = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  .iconWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
    transition: all 0.3ms ease-in-out;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    svg {
      fill: #333;
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 1000px) {
    z-index: 100;
    width: ${p => p.isNavbarOpen ? "30%" : "0%"};
    min-width: ${p => p.isNavbarOpen ? "250px" : "0px"};
    position: fixed;
    padding: ${p => p.isNavbarOpen ? "3rem 0 0 2rem" : "0"};;
    transition: all 0.3s easy-in-out;
    align-items: flex-start;
    height: 100vh;
    inset: 100% 0 0 auto;
    flex-direction: column;
    background-color: rgba(229, 224, 229, 0.7);
    backdrop-filter: blur(20px);
  }
`;

const SidebarListItem = styled(Link)`
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  color: ${(props) => (props.isActive ? '#dc4576' : '#584f61')};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #333;
    .iconWrapper {
        transform: translateY(-2px);
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }
  }
`;
const SidebarListItemm = styled.a`
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 18px;
  color: ${(props) => (props.isActive ? '#dc4576' : '#584f61')};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #333;
    .iconWrapper {
        transform: translateY(-2px);
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    }
  }
`;

const Left = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Right = styled.div`
    margin-right: 1rem;
    .hamburger {
        transition: all 0.3s ease-in-out;
        transform: rotateY(${p => !p.isNavbarOpen ? "0" : "180deg"})
    }
    @media (min-width: 1000px) {
        .hamburger {
          display: none;
        }
    }
`

function Header() {
  const navigate = useNavigate()
  const location = useLocation();
  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  const [isNavbarOpen, setisNavbarOpen] = useState(false)

  const [isInTop, setIsInTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsInTop(window.pageYOffset === 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  


  return (
    <>
      <Container isInTop={isInTop}>   
          <Wrapper className="wrapper">
            <Left>
                <LogoWrapper  >
                    <img onClick={() => navigate("/")} src={LogoWithName}></img>
                </LogoWrapper>
            </Left>
            <div>
                <Mid isNavbarOpen={isNavbarOpen}>
                        <SidebarListItem isActive={isActive("/login")} to="/login">
                        Login
                        </SidebarListItem>
                        <SidebarListItem isActive={isActive("/register")} to="/register">
                        Register
                        </SidebarListItem>

                        <SidebarListItemm isActive={isActive("about")} href="#aboutus">
                        AboutUs
                        </SidebarListItemm> 

                        <SidebarListItemm isActive={isActive("pricing")} href="#pricing">
                        Pricing
                        </SidebarListItemm>  
                        
                        <SidebarListItem isActive={isActive("contactus")} to="/contactus">
                        Contact Us
                        </SidebarListItem>  
                </Mid>
                
                <Right isNavbarOpen={isNavbarOpen}>
                    <Tooltip title={isNavbarOpen ? "Close Menu" : "Open Menu"} className='hamburger'>
                        <IconButton onClick={() => setisNavbarOpen(p => !p)}>
                            <MenuOpenIcon/>
                        </IconButton>
                    </Tooltip>        
                </Right>
            </div>
          </Wrapper>
      </Container>
    </>
  )
}

export default Header
 