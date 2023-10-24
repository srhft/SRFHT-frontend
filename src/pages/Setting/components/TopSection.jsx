import React from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { style } from '@mui/system';
import styled from "styled-components"
import BackgroundImage from "../../../assets/images/curved0.jpg"
import { useSelector } from 'react-redux';
import { userRolesMap } from '../../../assets/json/data';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const TopContainer = styled.div`
    width: 100%;
    height: 300px;
    background-image: url(${BackgroundImage});
    background-size: cover;
    border-radius: 1rem;
`
const UserWrapper = styled.div`
    transform: translateY(-50%);
    padding: 1.4rem;
    background-color: white;
    width: 90%;
    border-radius: 1rem;
    box-shadow: inset 0 0 0.0625rem 0.0625rem hsla(0,0%,100%,.9), 0 1.25rem 1.6875rem 0 rgba(0,0,0,.05);

    display: flex;
    align-items: center;
    gap: 1rem;
`
const UserImageWrapper = styled.div`
    position: relative;
    >img{
        width: 100px;
        height: 100px;
        object-fit: cover;
        object-position: center;
        border-radius: 0.5rem; 
    }
    >div {
        cursor: pointer;
        width: 30px;
        height: 30px;
        transform: translateY(-20px);
        right: -10px;
        position: absolute;
    }
`
const UserInfoWrapper = styled.div`
    >div{
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    >div>span{
        background-color: #75efac;
        padding: 0.2rem 0.5rem;
        border-radius: 0.5rem;
    }
`




function TopSection() {
    const user = useSelector(e => e.user.userInfo);
	return (
    <Container>
        <TopContainer></TopContainer>
        <UserWrapper>
            <UserImageWrapper>
                <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg'/>
                <div className='iconWrapper'><CameraAltIcon/></div>
            </UserImageWrapper>
            <UserInfoWrapper>
                <h3>{`${user?.firstname} ${user?.lastname}`}</h3>
                <div>
                    <p>@{user?.username}</p><span>{userRolesMap[user?.clienttype_id ?? 0]}</span>
                </div>
            </UserInfoWrapper>  
        </UserWrapper>
    </Container>
	)
}

export default TopSection