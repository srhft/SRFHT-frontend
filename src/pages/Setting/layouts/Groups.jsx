import React from 'react'
import styled from "styled-components"
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PersonIcon from '@mui/icons-material/Person';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

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

function Groups() {
  return (
    <Container>
        <Section className='floatBox'>
            <TitleContainer><GroupAddIcon/><p>Create Group</p></TitleContainer>
            <Form>
                <div>
                    <div className="inputWrapper" style={{width: "100%"}}>
                        <label><PersonIcon/> Group Name</label>
                        <input placeholder='Enter Group Name' />
                    </div>
                    <button className='submitBtn'>Submit</button>
                </div>
                
            </Form>
        </Section>
    </Container>
  )
}

export default Groups