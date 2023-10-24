import { Button, MenuItem, Select, TextField, InputLabel, FormControl } from '@mui/material'
import React from 'react'
import styles from  "./Brokers.module.css"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBroker} from "../../redux/BrokersSlice"

const brokersList = [
    { id:1, name: "ProStocks", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5WeHHNaOhnEdygLZJzqPMaFNraKO24srT5dXo3OGMeg&s"},
    { id:2, name: "Zerodha", img: "https://www.marketinginasia.com/wp-content/uploads/2023/01/Zerodha-logo.png"},
    { id:3, name: "Groww", img: "https://groww.in/logo-groww270.png"},
    { id:4, name: "Angel One", img: "https://i0.wp.com/logotaglines.com/wp-content/uploads/2018/06/Angel-Broking-Logo-Tagline.jpg?fit=1146%2C1128&ssl=1"},
    { id:5, name: "Upstox", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg-e2oWyFW7UwVpNI9NQgiwSbAaglvaRvY5QwzoM_wIQ&s"},
    { id:6, name: "ICICIdirect", img: "https://bl-i.thgim.com/public/markets/stock-markets/lveh3o/article54407759.ece/alternates/FREE_1200/icici-directjpg"},
    { id:8, name: "Motilal Oswal", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-HPYzQDFfgSzTyuWXYnbgq-X9ER3zTY5w4TIGJo&s"},
  ]


function RightSide() {
    const dispatch = useDispatch()

    const initialState = {broker: "", uname: "", pass: "", api: "", secreate: "", ottp: ""}
    const [formData, setFormData] = useState(initialState)

    const handleInputs = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData(p => ({...p, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const selectedBroker = brokersList.find(i => i.id === formData.broker);   
        dispatch(addBroker({...formData, broker: selectedBroker}))
        setFormData(initialState)
    }

    
  return (
    <div className={styles.right}>
        <div className={styles.rightWrapper}> 
            <div className={styles.top}><Button variant="outlined">Add Broker</Button></div>
            <div className={styles.bottom}>
                <form onSubmit={handleSubmit}>
                <FormControl className={styles.fromWrapper} fullWidth>
                    <InputLabel id="demo-simple-select-label">Brokers LIst</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Brokers LIst"
                    name="broker"
                    onChange={handleInputs}
                    value={formData.broker}
                    required
                    >
                    {brokersList.map(i => {
                        return <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>
                    })}
                    </Select>
                    <TextField name="uname" value={formData.uname} onChange={handleInputs} id="outlined-basic" label="Username/UserID" variant="outlined" required/>
                    <TextField name="pass" value={formData.pass} onChange={handleInputs} id="outlined-basic" label="Psssword" variant="outlined" required/>
                    <TextField name="api" value={formData.api} onChange={handleInputs} id="outlined-basic" label="API key" variant="outlined" required/>
                    <TextField name="secreate" value={formData.secreate} onChange={handleInputs} id="outlined-basic" label="Secreate Key" variant="outlined" required/>
                    <TextField name="ottp" value={formData.ottp} onChange={handleInputs} id="outlined-basic" label="TOTP" variant="outlined" type="number" required/>
                    <Button variant="contained" type="submit">Submit</Button>
                </FormControl>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RightSide