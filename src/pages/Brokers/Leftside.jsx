import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState, useEffect } from 'react'
import styles from  "./Brokers.module.css"
import {  useDispatch, useSelector } from 'react-redux';
import {  deleteBroker } from "../../redux/BrokersSlice"
import SearchIcon from '@mui/icons-material/Search';

function Leftside() {

    const dispatch = useDispatch()
    const brokers = useSelector(r => r.broker.brokers)
    const [searchInput, setSearchInput] = useState()
    const [searchResult, setSearchResult] = useState()

    const handleDelete = (brokerID) => {
        console.log({brokerID})
        dispatch(deleteBroker(brokerID))
    }

    useEffect(() => {
      const regex = new RegExp(searchInput, "i")
      console.log({regex})
      const result = brokers.filter(b => b.broker.name.match(regex))
      setSearchResult(result)
      console.log(result)
      console.log(brokers[0]?.broker?.name); 
    }, [searchInput])
    

  return (
    <div className={styles.left}>
        <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <SearchIcon />
            </div>
            <input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
        </div>
        {
          (searchInput && searchInput.length > 0) ? (
            (searchResult && searchResult.length > 0) ? 
              searchResult.map((e) => {
                return <div key={e.broker.id} className={styles.brokers}>
                    <img src={e.broker.img}></img>
                    <p className={styles.name}>{e.broker.name}</p>
                    <div className={styles.actions}>
                      <DeleteIcon onClick={() => handleDelete(e.broker.id)} />
                    </div>
                  </div>
              }) : <p style={{width: "maxContent", margin:"auto"}}> No Brokers Found</p>
          ) : (
            (brokers.length > 0) ?
              brokers.map((e) => {
                return <div key={e.broker.id} className={styles.brokers}>
                    <img src={e.broker.img}></img>
                    <p className={styles.name}>{e.broker.name}</p>
                    <div className={styles.actions}>
                      <DeleteIcon onClick={() => handleDelete(e.broker.id)} />
                    </div>
                  </div>
              }) : <p style={{width: "maxContent", margin:"auto"}}> No Brokers Found</p>
          )
        }

    </div>
  )
}

export default Leftside