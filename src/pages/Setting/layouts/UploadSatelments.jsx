import React from 'react'
import styled from "styled-components"
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PersonIcon from '@mui/icons-material/Person';
import BackupIcon from '@mui/icons-material/Backup';

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
    gap: 2rem;
    >button{
            margin: 0;
        }

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
    >input[type='file']{
        width: 100% !important;
    }
`


function UploadSatelments() {
  return (
    <Container>
        <Section className='floatBox'>
            <TitleContainer><BackupIcon/><p>Upload Sattlement</p></TitleContainer>
            <Form>
                <FormWrappr>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Symbol</label>
                        <input type="date" placeholder='Symbol' />
                    </div>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Select </label>
                        <select>
                            <option>All</option>
                            <option>CQG</option>
                            <option>NSEFO</option>
                            <option>SGXFO</option>
                        </select>
                    </div>
                    <div className="inputWrapper" style={{width: "100%"}} >
                        <label><PersonIcon/> Select Sattlement</label>
                        <input type="file"  />
                    </div>
                </FormWrappr>
                <button className='submitBtn' color='blue'>Upload</button>

            </Form>
        </Section>
    </Container>
  )
}

export default UploadSatelments