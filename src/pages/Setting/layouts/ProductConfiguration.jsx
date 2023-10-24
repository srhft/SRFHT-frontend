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

function ProductConfiguration() {
  return (
    <Container>
        <Section className='floatBox'>
            <TitleContainer><LocalAtmOutlinedIcon/><p>Add Exchange</p></TitleContainer>
            <Form>
                <FormWrappr>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Select Product:</label>
                        <select>{new Array(5).fill().map((_, i) => <option key={i}>{++i}st Option</option>)}</select>
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Symbol</label>
                        <input  placeholder='Symbol' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Exchange</label>
                        <input  placeholder='Exchange' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Security Type</label>
                        <input  placeholder='Security Type' />
                    </div>

                    <div className="inputWrapper">
                        <label><PersonIcon/> Margin Rate</label>
                        <input  placeholder='Margin Rate' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Multiplier</label>
                        <input  placeholder='Multiplier' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> LotSize</label>
                        <input  placeholder='LotSize' />
                    </div>
                </FormWrappr>
                <BtnWrapper>
                    <Button className='submitBtn' color='blue'>Save</Button>
                    <Button className='submitBtn'>Clear</Button>
                </BtnWrapper>

            </Form>
        </Section>
    </Container>
  )
}

export default ProductConfiguration