import React, {useState, useEffect} from 'react'
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import styled from "styled-components"
import PersonIcon from '@mui/icons-material/Person';


import { Button, DatePicker } from 'antd';
import csvtojson from 'csvtojson';
import { CSVLink } from "react-csv";
import { TradebookDownload_api } from '../../../API/api';
import { useRef } from 'react';

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
    >button{margin: 0;}
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


function Trades() {
    const csvRef = useRef()
    const [data,setData]=useState([])
    const [date,setDate]=useState(Date.now())

    useEffect(()=>{
        data.length>0 && csvRef.current.link.click()
    },[data])

    const convertDataToPDF =async (csvData) => {
       await csvtojson().fromString(csvData)
       .then((jsonObj)=>{
        setData(jsonObj);
        })
      };
    

    const handleDownload=async(e)=>{
        e.preventDefault();
        try {
            const defaultDate = new Date(date);
            const formattedDate = `${defaultDate.getFullYear()}${(defaultDate.getMonth() + 1).toString().padStart(2, '0')}${defaultDate.getDate().toString().padStart(2, '0')}`;
            console.log({formattedDate})
            const {data} = await TradebookDownload_api({date})
            convertDataToPDF(data)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Container>
        <CSVLink data={data} filename={'Tradebook.csv'} ref={csvRef}/>    
        <Section className='floatBox'>
            <TitleContainer><CloudSyncIcon/><p>Import Trade</p></TitleContainer>
            <Form onSubmit={handleDownload}>
                <FormWrappr>
                    <div className="inputWrapper">
                        <label><PersonIcon/> Select Date</label>
                        <input type="date"  value={date} onChange={e => setDate(e.target.value)} />
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
                        <label><PersonIcon/> Exchange</label>
                        <input type="file" placeholder='Exchange'  />
                    </div>
                </FormWrappr>
                <button className='submitBtn' color='blue'>Upload</button>

            </Form>
        </Section>
    </Container>
  )
}

export default Trades