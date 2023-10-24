import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import BackgroundImage from "../../../assets/images/curved14.jpg"
import { LoginUser } from '../../../redux/UserSlice'
import { DeleteSession_API, Login_User_API } from '../../../API/api'
import Notification from "../../../components/Notification/Notification"

function Login() {
    const [NotifyData, setNotifyData] = useState({ successFlag: false, successMsg: 'success msg', errorFlag: false, errorMsg: 'error msg', loadingFlag: false, loadingMsg: 'loading msg', activesession: false})
    const CloseError = () => setNotifyData((data) => ({ ...data, errorFlag: false }))
    const CloseSuccess = () => setNotifyData((data) => ({ ...data, successFlag: false }))

    const [formData, setFormData] = useState({username: "",password: ""})
    const [error, setError] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(p => ({...p, [name]: value}))
    }


    const handleSubmit  = async (e) => {
        e.preventDefault();
        setNotifyData((data) => ({ ...data, loadingFlag: true, loadingMsg: "Loging user..." }))
        try {
            const {data} = await Login_User_API({
                data: {username: formData.username, password: formData.password},
                event: "login",
                source: "web"
            })
            if(data.status === "success"){
                setNotifyData((data) => ({ ...data, loadingFlag: false, successFlag: true, successMsg: "loggin successfully" }))
                dispatch(LoginUser(data))
                navigate("/tables")
            } else setNotifyData((data) => ({ ...data, loadingFlag: false, errorFlag: true, errorMsg: data.reason }))
        } catch (data) {   
            console.log({err: data})
            if(data.response.data.errorCode === 105){
                setNotifyData((d) => ({ ...d, loadingFlag: false, errorFlag: true, errorMsg: data.response.data['reason'], activesession: data.response.data['result']['alreadyactive'] }))     
            } else setNotifyData((d) => ({ ...d, loadingFlag: false, errorFlag: true, errorMsg: data.response.data['reason'] }))
        }
    }

    const deletesession = async () => {
        setNotifyData((p) => ({ ...p, loadingFlag: true, loadingMsg: 'Deleteing sesssion...' }))
        try {
            const {data} = await DeleteSession_API({username: formData.username, password: formData.password});
            setNotifyData((p) => ({ ...p, loadingFlag: false, successFlag: true, successMsg: data['message'] }))
            setNotifyData((p) => ({ ...p, errorFlag: false, errorMsg: data['message'] }))
        } catch ({response}) {
            setNotifyData((p) => ({ ...p, loadingFlag: false, errorFlag: true, errorMsg: response?.data['message'] }))
        }
    }
  return (
    <>
        <Container onSubmit={handleSubmit}>
            <Top>
                <Title>Welcome!</Title>
                <Desc>Whether you're a seasoned trader or just starting out, our stock market application provides the insights and tools you need to succeed. Log in now and take your portfolio to the next level.</Desc>
            </Top>
            <Bottom>
                <p>Login</p>
                <Input name="username" placeholder="Email" value={formData.email} onChange={handleFormChange}></Input>
                <Input name="password" placeholder="Password" type="password" value={formData.pass} onChange={handleFormChange}></Input>
                <Button type='submit' >Sign in</Button>
                <Links>
                    <p>Forgot Password ? <Link to="/forgotPassword">Reset Password</Link></p>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </Links>
            </Bottom>
        </Container>
        <Notification
            notify={NotifyData}
            CloseError={CloseError}
            CloseSuccess={CloseSuccess}
            deletesession={deletesession}
        />
    </>
  )
}

export default Login



const Container = styled.form`
    width: 100%;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    >* {box-sizing: border-box}

`
const Top = styled.div`
    padding-top: 2rem;
    width: 100%;
    border-radius: 10px;
    background-image: url(${BackgroundImage});
    height: 500px;
    min-height: 50vh;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;

    display: flex;
    align-items: center;
    flex-direction: column;

    >* {
        color: white;
    }
`
const Title = styled.h1`
    margin: 2rem 0;
`
const Desc = styled.p`
    width: 500px;
    max-width: 90%;
    margin: 0.5rem;
`

const Bottom = styled.div`
    border-radius: 1rem;
    background-color: white;
    transform: translateY(-200px);
    box-shadow: 0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05);
    width: 500px;
    max-width: 90%;
    height: 400px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    >* {
        padding: 0.5rem;
        border-radius: 0.5rem;
    }

    >p {
        font-size: 2rem;
        font-weight: 100;
        width: max-content;
        margin:  0 auto;
    }

`
const Input = styled.input`
    border: 1px solid #344767;
    background-color: white;
`
const Button = styled.button`
    margin: 0.5rem;
    background: linear-gradient(310deg, #141727, #3a416f);
    color: white;
    margin: 0;

`
const Links = styled.div`
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    >p>a{
        text-decoration: underline;
    }

    >p>a:hover {
        text-decoration: underline;
        color: #6782b1;

    }
`
