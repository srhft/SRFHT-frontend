import React from 'react'
import styled from "styled-components"
import PersonIcon from '@mui/icons-material/Person';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

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
const Form = styled.div`    
    box-sizing: border-box;
    gap: 2rem;
    display: flex;
    padding: 0.5rem;
    flex-direction: column;
    >button{
        margin: 0;
    }

    >div{
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
        >*{width: 49%};
    }
    @media screen and (max-width: 1200px) {
        >div>*{width: 100%};
    }
`

function Exchange() {
  return (
    <Container>
        <Section className='floatBox'>
            <TitleContainer><CurrencyExchangeIcon/><p>Add Exchange</p></TitleContainer>
            <Form>
                <div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Exchange</label>
                        <input  placeholder='Exchange' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Currency:</label>
                        <select>{new Array(5).fill().map((_, i) => <option key={i}>{++i}st Option</option>)}</select>
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Brokerage Type:</label>
                        <select>{new Array(5).fill().map((_, i) => <option key={i}>{++i}st Option</option>)}</select>
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Margin Type</label>
                        <select>{new Array(5).fill().map((_, i) => <option key={i}>{++i}st Option</option>)}</select>
                    </div>  
                </div>
                <button className='submitBtn'>Add</button>
            </Form>
        </Section>
    </Container>
  )
}

export default Exchange