import React from 'react'
import styled from "styled-components"
import PersonIcon from '@mui/icons-material/Person';
import EditNoteIcon from '@mui/icons-material/EditNote';

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

    display: flex;
    padding: 0.5rem;
    flex-direction: column;

    >div{
        width: 100%;
        display: flex;
        gap: 1rem;
        >button{
            margin: 0;
            margin-top: auto;
            height: max-content;
        }
    }
    @media screen and (max-width: 1200px) {
        >div>*{width: 100%};
    }
`

function Segement() {
  return (
    <Section className='floatBox'>
        <TitleContainer><EditNoteIcon/><p>Create Segement</p></TitleContainer>
        <Form>
            <div>
                <div className="inputWrapper" style={{width: "100%"}}>
                    <label><PersonIcon/> Segement Name</label>
                    <input placeholder='Enter Segement Name' />
                </div>
                <button className='submitBtn'>Create</button>
            </div>     
        </Form>
    </Section>
  )
}

export default Segement