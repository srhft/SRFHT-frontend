import {useEffect, useState} from 'react'
import Modal from '../../../components/Modal'
import styled from "styled-components"
import CloseIcon from '@mui/icons-material/Close';
import { StrategySave_api, marketWatchData_api } from '../../../API/api';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { startLoading, stopLoading } from '../../../redux/LoadingSlice';
import useApiCall from '../../../Hookss/useApiCall';
import { AutoComplete } from "antd";
import { addstrategyWatch } from '../../../redux/StrategyWatchSlice';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    >svg:hover{
        color: red;
    }
`
const TitleContainer = styled.div`
    font-size: 1.4rem;
    font-weight: 800;
`
const Form = styled.form` 
    width: 100%;
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
        >*{flex: 1};
    }
    @media screen and (max-width: 1200px) {
        >div>*{width: 100%};
    }
`

function AddStrategy({isOpen, setIsOpen}) {
    const {isError, isSuccess, handleApiCall, resetState } =  useApiCall()
    const [tickerCode, setTickerCode] = useState([])
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        strategyid: 0, algoname: 'test', exchange: 'NFO', segment: 'NFO-OPT', symbol: '', expiry: '', contract_name: '', qty: 50, cymcleno: 10, starttime: '09:15:00', squareofftime: '15:15:00', period: 5, status: false,
        cmbslflag: false, cmbsl: 10, cmbtrsl: 5, cmbreenteryflag: true, cmbreentery: 10, cmbsellflag: 0, cmbwaitntrade: 10,
        trslin: 'PERCENT', reenteryin: 'PERCENT', waitntradein: 'PERCENT', waitntradeflag: false,waitntradeinterval:3,
        l1: { option_type: 'CE', strikediff: 100, sl: 10, trsl: 5, reenteryflag: true, reentery: 10, sellflag: 0, waitntrade: 10 },
        l2: { option_type: 'PE', strikediff: -100, sl: 10, trsl: 5, reenteryflag: true, reentery: 10, sellflag: 0, waitntrade: 10 }
    })

    const handleChange = (e, type) => {
        const name = e.target.name;
        let value = e.target.value;

        if(e.target.type === "checkbox") value = e.target.checked; 

        if(!type) return setFormData(p => ({...p, [name]: value}))
        if(type === "l1") return setFormData(p => ({...p, l1: {...p.l1, [name]: value}}))
        else if(type === "l2") return setFormData(p => ({...p, l2: {...p.l2, [name]: value}}))
    }
    const fetchMarketWatchData = async (e) => {

    }
    useEffect(() => {
        const tempExpires = [];
        (async() => {
            try {
                const {data} = await marketWatchData_api({ type: 'detailed', expirydate: formData.expiry, exchange: formData.segment})
                if (data.status === "success") {
                    data.result.expiryDate.forEach((e, i) => {
                        tempExpires.push({label: `${e}`,value: i})
                    })
                    setTickerCode(tempExpires)
                } 
            } catch (error) {
                console.log(error)
            }
        })()
    },[])

    const handleSubmit = async (e) => {
        // dispatch(startLoading())
        e.preventDefault()
        try {
            const {data} = await StrategySave_api(formData)
            dispatch(stopLoading())
            if(data.status !== "success") return toast.error("Failed to Add Strategy!")

            dispatch(addstrategyWatch(data.result))
            setIsOpen(false);
            toast.success("Strategy Added successfully!!")       
        } catch(err) {
            toast.error("Failed to Add Strategy!")
            console.log(`err: ${err}`)
        }
        // const data = await handleApiCall(StrategySave_api, formData, "Strategy Added successfully!!", "Failed to Add Strat")
    }
  return (
    <Modal isOpen={isOpen}>
        <Container>
            <Header>
                <TitleContainer>Create Strategy</TitleContainer>
                <CloseIcon onClick={() => setIsOpen(false)}/>
            </Header><hr/>
            <Form onSubmit={handleSubmit} >
                <div>
                    <div className="inputWrapper">
                        <label>Currency:</label>
                        <select name='strategytype' onChange={handleChange} value={formData.strategytype}>
                                <option hidden={true}>Strategy type</option>
                                <option value="BAHUBALI">BAHUBALI</option>
                                <option value="SUPERTREND">SUPERTREND</option>
                                <option value="STRADDLE">STRADDLE</option>
                        </select>
                    </div>
                    <div className="inputWrapper">
                        <label> Brokerage Type:</label>
                        <select name="apiplatform" onChange={handleChange} value={formData.apiplatform}>
                            <option hidden={true} value="">Select API Platform</option>
                            <option value="test">Test</option>
                            {/* <option value="zerodha">ZERODHA</option> */}
                        </select>   
                    </div>
                    <div className="inputWrapper" >
                        <label> Algo Name</label>
                        <input name='algoname' onChange={handleChange} value={formData.algoname} placeholder='Enter Algo Name' />
                    </div> 
                </div>

                <div>
                    <div className="inputWrapper">
                        <label> Expiry(FO):</label>
                        {/* <input name="expiry" onChange={handleChange} value={formData.expiry}  placeholder='Enter Expiry(FO):' /> */}
                        <AutoComplete
                            value={formData.expiry}
                            onChange={(d) => setFormData(p =>({...p, expiry: d}))}
                            onSelect={(_, t) => setFormData(p =>({...p, expiry: t.label}))}
                            options={tickerCode.filter(e => new RegExp(formData.expiry, "i").test(e.label))}
                        />
                    </div> 
                    <div className="inputWrapper">
                        <label>FO Contract Name:</label>
                        <select name='contract_name' onChange={handleChange} value={formData.contract_name}>
                            <option hidden={true} value="">Select FO Contract</option>
                            <option value="NIFTY">NIFTY</option>
                            <option value="BANKNIFTY">BANKNIFTY</option>
                        </select>
                    </div>
                    <div className="inputWrapper">
                        <label>INDICES Symbol</label>
                        <select name='symbol' onChange={handleChange} value={formData.symbol}>
                            <option hidden={true} value="">Select INDICES</option>
                            <option value="NIFTY 50">NIFTY 50</option>
                            <option value="NIFTY BANK">NIFTY BANK</option>
                        </select>
                    </div>
                    <div className="inputWrapper">
                        <label> Quantity:</label>
                        <input name='qty' onChange={handleChange}  placeholder='Enter Algo Name' value={formData.qty} />
                    </div> 
                </div>

                {formData.strategytype === "STRADDLE" &&
                <>
                    <div>
                        <div className="inputWrapper">
                            <label> Start Time:</label>
                            <input name="starttime" onChange={handleChange} value={formData.starttime} type="time" placeholder='Enter Start Time:' />
                        </div> 
                        
                        <div className="inputWrapper">
                            <label> Expiry(FO):</label>
                            <input name="squareofftime" onChange={handleChange} type="time" value={formData.squareofftime} />
                        </div> 
                        <div className="inputWrapper">
                            <label> Cooling(MINUTES)</label>
                            <input name="period" type="number" onChange={handleChange} value={formData.period}  placeholder='Enter Cooling(MINUTES)' />
                        </div> 
                        <div className="inputWrapper">
                            <label> Number Of Cycle:</label>
                            <input name="cymcleno" type="number" onChange={handleChange} value={formData.cymcleno}  placeholder='Enter cymcleno' />
                        </div> 
                    </div>
                    <div>
                        <div className="inputWrapper">
                            <label>TR.SL In :</label>
                            <select name='trslin' onChange={handleChange} value={formData.trslin}>
                                <option value="">Select</option>
                                <option value="PERCENT">PERCENT</option>
                                <option value="POINT">POINT</option>
                            </select>
                        </div>
                        <div className="inputWrapper">
                            <label>ReEntry In:</label>
                            <select name='reenteryin' onChange={handleChange} value={formData.reenteryin}>
                                <option value="">Select</option>
                                <option value="PERCENT">PERCENT</option>
                                <option value="POINT">POINT</option>
                            </select>
                        </div>
                        {formData.waitntradeflag &&
                        <div className="inputWrapper">
                            <label>W.Trade In:</label>
                            <select name='waitntradein' onChange={handleChange} value={formData.waitntradein}>
                                <option value="">Select</option>
                                <option value="PERCENT">PERCENT</option>
                                <option value="POINT">POINT</option>
                            </select>
                        </div>}
                    </div>
                    <div>
                        <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                            <div style={{display: "flex", gap: "1rem"}}>
                                <label> CMBSL:</label>
                                <input type='checkbox' name='cmbslflag' onChange={handleChange} value={formData.cmbslflag}   />
                            </div> 
                            <div style={{display: "flex",  gap: "1rem"}}>
                                <label> WAIT:</label>
                                <input type='checkbox' name='waitntradeflag' onChange={handleChange} value={formData.waitntradeflag}  />
                            </div> 
                        </div>
                        {formData.waitntradeflag &&
                        <div className="inputWrapper">
                            <label> W.T.Intval(MINUTES)</label>
                            <input name="waitntradeinterval" type="number" onChange={handleChange} value={formData.waitntradeinterval}  placeholder='Enter W.T.Intval(MINUTES)' />
                        </div>}
                    </div>

                    <div className='tableWrapper'>
                        <table className='table'>
                            <thead>
                                <tr>                           
                                    <th>CE/PE</th>
                                    <th>STR.DIF</th>
                                    <th>SL%</th>
                                    <th>TR.SL</th>
                                    <th>RE.ENT.VAL</th>
                                    {formData.waitntradeflag && <th>W.TRADE.VAL</th>}
                                    <th>RE-ENT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {formData.l1.option_type}
                                    </td>
                                    <td>
                                        <div className="inputWrapper">
                                            <input type='number' name='strikediff' value={formData.l1.strikediff} onChange={(e) => handleChange(e, "l1")} />
                                        </div> 
                                    </td>
                                    <td>
                                        {formData.l1.option_type ?
                                        <div className="inputWrapper">
                                            <input type='number' name='cmbsl' value={formData.cmbsl} onChange={handleChange} readOnly={!formData.cmbslflag}/>
                                        </div> 
                                    :  
                                        <div className="inputWrapper">
                                            <input type='number' name='s1' value={formData.l1.sl} onChange={(e) => handleChange(e, "l1")} />
                                        </div>  
                                    }          
                                    </td>
                                    <td>
                                        {formData.cmbslflag ?
                                        <div className="inputWrapper">
                                            <input type='number' name='cmbtrsl' value={formData.cmbtrsl} onChange={handleChange} readOnly={!formData.cmbslflag}/>
                                        </div> 
                                    :  
                                        <div className="inputWrapper">
                                            <input type='number' name='trsl' value={formData.l1.trsl} onChange={(e) => handleChange(e, "l1")}  />
                                        </div>  
                                    }          
                                    </td>
                                    <td>
                                        {formData.cmbslflag ?
                                        <div className="inputWrapper">
                                            <input type='number' name='cmbreentery' onChange={handleChange} value={formData.cmbreentery} readOnly={!formData.cmbslflag}/>
                                        </div> 
                                    :  
                                        <div className="inputWrapper">
                                            <input type='number' name='reentery' onChange={(e) => handleChange(e, "l1")} value={formData.l1.reentery} />
                                        </div>  
                                    }          
                                    </td>
                                    {formData.waitntradeflag && 
                                    <td>
                                        {formData.cmbslflag ? 
                                            <div className="inputWrapper">
                                                <input type='number' name='cmbwaitntrade' onChange={handleChange} value={formData.cmbwaitntrade} readOnly={!formData.cmbslflag}/>
                                            </div>  
                                        :
                                            <div className="inputWrapper">
                                                <input type='number' name='waitntrade' onChange={(e) => handleChange(e, "l1")} value={formData.l1.waitntrade}/>
                                            </div>}
                                    </td>}
                                    <td>
                                        {formData.cmbslflag ? 
                                            <div className="inputWrapper">
                                                <input ttype="checkbox" name='cmbreenteryflag' onChange={handleChange} value={formData.cmbreenteryflag} readOnly={!formData.cmbslflag}/>
                                            </div> 
                                        :
                                            <div className="inputWrapper">
                                                <input type="checkbox" name='reenteryflag' onChange={(e) => handleChange(e, "l1")} value={formData.l1.reenteryflag}/>
                                            </div> 
                                        }
                                    </td>
                                </tr>
                                <tr>    
                                    <td>
                                        {formData.l2.option_type}
                                    </td>
                                    <td>
                                        <div className="inputWrapper">
                                            <input type='number' name='strikediff' onChange={(e) => handleChange(e, "l2")} value={formData.l2.strikediff}/>
                                        </div> 
                                    </td>
                                    <td>
                                        {!formData.cmbslflag &&
                                        <div className="inputWrapper">
                                            <input type='number' name='s1' onChange={(e) => handleChange(e, "l2")} value={formData.l2.sl} />
                                        </div>}
                                    </td>
                                    <td>
                                        {!formData.cmbslflag ? 
                                        <div className="inputWrapper">
                                            <input type='number' name='trsl' onChange={(e) => handleChange(e, "l2")} value={formData.l2.trsl} />
                                        </div> : null}
                                    </td>
                                    <td>
                                        {!formData.cmbslflag &&
                                        <div className="inputWrapper">
                                            <input type='number' name='reentery' onChange={(e) => handleChange(e, "l2")} value={formData.l2.reentery} />
                                        </div>}
                                    </td>

                                    {formData.waitntradeflag && 
                                    <td>
                                        {!formData.cmbslflag && <div className="inputWrapper">
                                            <input type='number' name='waitntrade' onChange={(e) => handleChange(e, "l2")} value={formData.l2.waitntrade} />
                                        </div>}
                                    </td>}
                                    <td>
                                        {!formData.cmbslflag && 
                                        <div className="inputWrapper">
                                            <input type="checkbox" name='reenteryflag' onChange={(e) => handleChange(e, "l2")} value={formData.l2.reenteryflag}/>
                                        </div>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
                }

                <button type="submit" className='submitBtn'>Add</button>
            </Form>
        </Container>
    </Modal>
  )
}

export default AddStrategy