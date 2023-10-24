import React from 'react'
import styled from "styled-components"
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';

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

function MarginSheetConfig() {
  return (
    <Container>
        <Section className='floatBox'>
            <TitleContainer><DescriptionIcon/><p>Margin Configuration</p></TitleContainer>
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
                        <label><PersonIcon/> Currency</label>
                        <input  placeholder='Enter Currency' readOnly={true} />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Allowed Margin</label>
                        <input  value={0} readOnly={true} />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Allowed Lots</label>
                        <input  placeholder='Enter Allowed Lots' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Per Lot</label>
                        <input  placeholder='Enter Per Lot' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Diposit Ammount</label>
                        <input  placeholder='Enter Diposit Ammount' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Lev Interest Yearly</label>
                        <input  placeholder='Enter Lev Interest Yearly' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Leverage Given</label>
                        <input  placeholder='Enter Leverage Given' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Hedge Ratio</label>
                        <input  placeholder='Enter Hedge Ratio' />
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

export default MarginSheetConfig