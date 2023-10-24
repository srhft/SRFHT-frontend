import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import BackgroundImage from "../../../assets/images/curved14.jpg"
import { LoginUser } from '../../../redux/UserSlice'
import { Register_User_API } from '../../../API/api'
import { toast } from 'react-toastify'

const Container = styled.div`
    height: max-content;
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

const Bottom = styled.form`
    border-radius: 1rem;
    background-color: white;
    transform: translateY(-200px);
    box-shadow: 0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05);
    width: 500px;
    max-width: 90%;
    min-height: 400px;
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

    >p>a:hover {
        text-decoration: underline;
        color: #6782b1;

    }
`

function Register() {
    const [formData, setFormData] = useState({firstName: "",lastName: "",username: "",email: "",password: "",mobileno: "", clienttype: "client"})
    const navigate = useNavigate()

    const handleFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(p => ({...p, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await Register_User_API(formData)
            toast.success("Register Successfull!!")
            navigate("/strategy")
        } catch (error) {
            toast.error("Registration Failed!!")
        }

    }
  return (
    <Container>
        <Top>
            <Title>Welcome!</Title>
            <Desc>Whether you're a seasoned trader or just starting out, our stock market application provides the insights and tools you need to succeed. Log in now and take your portfolio to the next level.</Desc>
        </Top>
        <Bottom onSubmit={handleSubmit} >
            <p>Register</p>
            <Input name="firstName" placeholder="First Name"  value={formData.firstName} onChange={handleFormChange}></Input>
            <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleFormChange}></Input>
            <Input name="username" placeholder="Username" value={formData.username} onChange={handleFormChange}></Input>
            <Input name="email" placeholder="Email id" type="email" value={formData.email} onChange={handleFormChange}></Input>
            <Input name="password" placeholder="Password"  type="password" value={formData.password} onChange={handleFormChange}></Input>
            <Input name="mobileno" placeholder="Contect No."  value={formData.mobileno} onChange={handleFormChange}></Input>
            <Button>Sign Up</Button>
            <Links>
                <p>Forgot Password ? <Link to="/forgotPassword">Reset Password</Link></p>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </Links>
        </Bottom>
    </Container>
  )
}

export default Register