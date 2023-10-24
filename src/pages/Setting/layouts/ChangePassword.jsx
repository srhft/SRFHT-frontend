import React from 'react'
import styled from "styled-components"
import KeyIcon from '@mui/icons-material/Key';
import HttpsIcon from '@mui/icons-material/Https';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Section = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

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
=
    @media screen and (max-width: 1200px) {
        >div>*{width: 100%};
    }
`

const FormWrappr = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    >div{
        width: 100%;
    }
    >button{
        margin: 0;
    }
`


function ChangePassword() {
  return (
    <Container>
        <Section className='floatBox'>
            <TitleContainer><KeyIcon/><p>Change Password</p></TitleContainer>
            <Form>
                <FormWrappr>
                    <div className="inputWrapper">
                        <label><HttpsIcon/> Current Password</label>
                        <input type="password" placeholder='Current Password' />
                    </div>
                    <div className="inputWrapper">
                        <label><HttpsIcon/> New Password</label>
                        <input type="password" placeholder='Enter New Password' />
                    </div>
                    <div className="inputWrapper">
                        <label><HttpsIcon/> Confirm Password</label>
                        <input type="password" placeholder='Confirm Password' />
                    </div>
                    <button className='submitBtn' color='blue'>Change</button>
                </FormWrappr>
            </Form>
        </Section>
    </Container>
  )
}

export default ChangePassword