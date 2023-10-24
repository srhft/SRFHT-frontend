import { Button, MenuItem, Select, TextField, InputLabel, FormControl, isMuiElement } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import styles from  "./Brokers.module.css"
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBroker, deleteBroker } from "../../redux/BrokersSlice"
import Leftside from './Leftside';
import RightSide from './RightSide';



function Brockers() {
  


  return (
    <div className={styles.container}>
      <Leftside/>
      <RightSide/>
    </div>
  )
}

export default Brockers