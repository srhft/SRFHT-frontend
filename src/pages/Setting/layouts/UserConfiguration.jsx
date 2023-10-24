import React from 'react'
import styled from "styled-components"
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';

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

const FormWrappr = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    >*{width: 49%};
`
const BtnWrapper =styled.div`
    display: flex;
    width: 100%;
    gap: 1rem;
`
const Button = styled.button`
    flex: 1;
    margin: 2rem 0;

    background: ${p => p.color === "blue" ? "linear-gradient(310deg,#2152ff,#21d4fd)" : "linear-gradient(310deg,#f70505,#ff808c)"};
`

function UserConfiguration() {
  return (
    <Container>
        <Section className='floatBox'>
            <TitleContainer><LocalAtmOutlinedIcon/><p>Add Exchange</p></TitleContainer>
            <Form>
                <FormWrappr>
                    <div className="inputWrapper">
                        <label><PersonIcon/> User ID</label>
                        <select>{new Array(5).fill().map((_, i) => <option key={i}>{++i}st Option</option>)}</select>
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Exchange</label>
                        <select>{new Array(5).fill().map((_, i) => <option key={i}>{++i}st Option</option>)}</select>
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Security Type</label>
                        <select>{new Array(5).fill().map((_, i) => <option key={i}>{++i}st Option</option>)}</select>
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Buy Brokerage</label>
                        <input  placeholder='Enter Buy Brokerage' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Sell Brokerage</label>
                        <input  placeholder='Enter Sell Brokerage' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Expiry Buy Brokerage</label>
                        <input  placeholder='Enter Expiry Buy Brokerage' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Expiry Sell Brokerage</label>
                        <input  placeholder='Margin Rate' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> USD Cost</label>
                        <input  placeholder='USD Cost' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Adjustment Fee</label>
                        <input  placeholder='Adjustment Fee' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Actual Client Sharing</label>
                        <input  placeholder='Actual Client Sharing' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Actual Broker Sharing</label>
                        <input  placeholder='Actual Broker Sharing' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Segment</label>
                        <select>{new Array(5).fill().map((_, i) => <option key={i}>{++i}st Option</option>)}</select>
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Group Name:</label>
                        <select>{new Array(5).fill().map((_, i) => <option key={i}>{++i}st Option</option>)}</select>
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> USD Rate</label>
                        <input  placeholder='USD Rate' value={1} readOnly={true} />
                    </div>
                </FormWrappr>
                <BtnWrapper>
                    <Button className='submitBtn' color='blue'>Create</Button>
                    <Button className='submitBtn'>Reset</Button>
                </BtnWrapper>
            </Form>
        </Section>
    </Container>
  )
}

export default UserConfiguration