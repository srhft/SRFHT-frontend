import React, { useState } from 'react'
import styled from "styled-components"
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { changeViewsVisiblity } from '../../../redux/TradingWindowViews';
import { UpdateProfile_api } from '../../../API/api';
import { toast } from 'react-toastify';

function Profile() {
    const dispatch = useDispatch()
    const data = useSelector(e => e.tradingindow)
    const handleCheckBoxChange = (i) => dispatch(changeViewsVisiblity(i))
    const user = useSelector(e => e.user.userInfo);
    const [userInfo, setUserInfo] = useState({firstname: user.firstname, lastname: user.lastname, email: user.email, mobileno: user.mobileno})

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setUserInfo(p => ({...p, [name]: value}))
    }
    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            const {data} = await UpdateProfile_api(userInfo)
        } catch (error) {
            console.log(error)
        }
    }

    //session info
    const userAgent = navigator.userAgent;
    const browser = (userAgent.indexOf('Chrome') > -1) ? 'Chrome' : 'Unknown';
    const os = (userAgent.indexOf('Windows') > -1) ? 'Windows' : 'Unknown';
  return (
    <Container>
        <Section >
            <BasicInfo className='floatBox'>
                <TitleContainer><BadgeIcon/><p>Basic Info</p></TitleContainer>
                <Form onSubmit={handleUpdateProfile}>
                    <div>
                        <div className="inputWrapper">
                            <label><PersonIcon/> Fitst Name</label>
                            <input name="firstname" value={userInfo?.firstname} onChange={handleChange}  placeholder='First Name' />
                        </div>
                        <div className="inputWrapper">
                            <label><PersonIcon/> Last Name</label>
                            <input name="lastname" value={userInfo?.lastname} onChange={handleChange}  placeholder='Last Name' />
                        </div>
                        <div className="inputWrapper">
                            <label><PersonIcon/> Email</label>
                            <input name="email" value={userInfo?.email} onChange={handleChange}  placeholder='Email' />
                        </div>
                        <div className="inputWrapper">
                            <label><PersonIcon/> Contact No.</label>
                            <input name="mobileno" value={userInfo?.mobileno} onChange={handleChange}  placeholder='First Name' />
                        </div>
                    </div>
                    <button className='submitBtn'>Update</button>
                </Form>
            </BasicInfo>
        </Section>

        <Section >
            <Setting className='floatBox'>
                <TitleContainer><SettingsIcon/><p>Setting</p></TitleContainer>
                <ModesContainer>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Default Landing Page:</label>
                        <select>{new Array(5).fill().map((_, i) => <option key={i}>{++i}st Option</option>)}</select>
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Default Themes:</label>
                        <select>{new Array(5).fill().map((_, i) => <option key={i}>{++i}st Option</option>)}</select>
                    </div>
                </ModesContainer>
                <ModesContainer>
                    <FormGroup>
                        <p>Basic Settings : </p>
                        <FormControlLabel control={<Switch />} label="Notification Sound" />
                        <FormControlLabel control={<Switch />} label="2 Factor Authentication" />
                        <FormControlLabel control={<Switch />} label="Telegram Notification" checked={true} />
                        <FormControlLabel control={<Switch />} label="Mask Balance" />
                    </FormGroup>
                    <div >
                        <p>Manage Views : </p>
                        {data.map((e, i) => (
                            <FormGroup  key={e.id}>
                                <FormControlLabel control={<Switch checked={e.visible}  onChange={() => {handleCheckBoxChange(i)}} />} label={e.title} />
                            </FormGroup>
                        ))}
                    </div>
                </ModesContainer>
            </Setting>
            <PortfolioShare className='floatBox'>
                <div>
                    <img src="https://media.istockphoto.com/id/1095468748/vector/qr-code-abstract-vector-modern-bar-code-sample-for-smartphone-scanning-isolated-on-white.jpg?s=612x612&w=0&k=20&c=Jnh2TAkAFm7QpaBgCyCuGbCA6nomDfk4-XiTsBhbHFk=" />
                </div>
                <p>SHARE YOUR PORTFOLIO</p>
            </PortfolioShare>
        </Section>

        {/* <Section >
            <CreateBot className='floatBox'>
                
            </CreateBot>
        </Section> */}

        <Section>
            <Session className='floatBox'>
                <TitleContainer><p>Session</p></TitleContainer>
                <SessionWrapper>
                    <SessionInfo>
                        <DesktopMacOutlinedIcon/>
                        <div>
                            <p>{browser}</p>
                            <p>Device Infomation: Other</p>
                            <p>OS Information: {os}</p>
                            <p>Your current session on 103.51.132.149</p>
                        </div>
                    </SessionInfo>
                    <SessionStatus>Active</SessionStatus>
                </SessionWrapper>
            </Session>
        </Section>
    </Container>
  )
}

export default Profile

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`
const Section = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    >*{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    };
    
    @media screen and (max-width: 1200px){
        flex-direction: column;
    }
`
const TitleContainer = styled.div`
    display: flex;
    gap: 0.3rem;
    align-items:  center;
    >svg{font-size: 40px};
    >p{
        font-size: 1.4rem;
        font-weight: 800;
    }
`
const Form = styled.form`    
    box-sizing: border-box;

    display: flex;
    padding: 0.5rem;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    padding: 0.5rem;
    flex-direction: column;
    align-items: center;
    >div{
        width: 100%;
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        >*{width: 49%};
    }
    @media screen and (max-width: 1200px) {
        >div>*{width: 100%};
    }
`

const BasicInfo = styled.div``

const Setting = styled.div`
`
const ModesContainer = styled.div`
    display: flex;
    gap: 1rem;
    >*{flex: 1};
`

const PortfolioShare = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    >div{
        height: 300px;
    }
    >div>img{height: 100%}
`
const CreateBot = styled.div``
const Session = styled.div``
const SessionInfo = styled.div``
const SessionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    >div{
        display: flex;
        align-items: center;
        gap: 1rem;
    }
`
const SessionStatus = styled.div`
    height: max-content;
    background-color: #cdf59b;
    color: #67b108;
    padding: 0.3rem 0.5rem;
    border-radius: 0.5rem;
`
