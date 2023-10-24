import React, { useEffect, useRef, useState } from 'react'
import { ManualTradeModify_api, manualTradeCreate_api } from '../../API/api'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from '@mui/material';



function MainualTrade({data, isOpen, setIsOpen, event}) {
    const marketWatchData = JSON.parse((JSON.stringify(data)))   
    const [validated, setValidated] = useState(false)  
    const [manualTradeData, setManualTradeData] = useState({}) 
    useEffect(() => {
        if(!data) return
        console.log(data)
        setManualTradeData({  
            segment: marketWatchData.segment,
            apiplatform: "test",
            exchange: marketWatchData.exchange,
            securitytype: marketWatchData.securitytype,
            token: marketWatchData.token,
            expirydate: marketWatchData.expirydate,
            opttype: marketWatchData.opttype,
            strikeprice: marketWatchData.strikeprice,
            qty: event === 'create' ? marketWatchData.lotsize : marketWatchData.totvolrem,
            price: marketWatchData.ticksize,
            d_qty: '', 
            ordertype: 'LIMIT',
            booktype: 0,
            triggerprice: '',
            producttype: 'LIMIT',
            validity: 'DAY',
            buysell: marketWatchData.buysell,
            tokenid2: marketWatchData.tokenid2,
            ticker_code: marketWatchData.symbol,
            divider:marketWatchData.divider,
        }) 
    },[data])

    const formRef = useRef()
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({p: manualTradeData.price , s: marketWatchData.ticksize, res: manualTradeData.price / marketWatchData.ticksize})
        if(!Number.isInteger(manualTradeData.price / marketWatchData.ticksize)) return toast.error("Price is Not valid")

        if (formRef.current.checkValidity() === false) {
          e.stopPropagation();
          return;
        }    
        const payload = {...manualTradeData, price: manualTradeData.price * marketWatchData.divider, booktype: manualTradeData.producttype === 'LIMIT' ? 1 : 2};
       
        try {
          let data;
        //   if (marketWatchData?.event === 'create') data = await manualTradeCreate_api(payload);
        //   else if (marketWatchData?.event === 'modify') {
        //     payload.uidnum = marketWatchData.uidnum;
        //     data = await ManualTradeModify_api(payload);
        //   }
          if(event === "modify") {
            payload.uidnum = marketWatchData.uidnum;
            data = await ManualTradeModify_api(payload);
          } else if(event === "create") data = await manualTradeCreate_api(payload);
          
          
          if (data.data?.status === 'success') toast.success('Order placed successfully');
          else toast.error(data.data?.reason);

        } catch (error) {
          console.log(error);
          toast.error('Failed to place an order');
        } finally {setIsOpen(false)}
      };
      
      const handleChange = (e) => {
        setManualTradeData({
          ...manualTradeData,
          [e.target.name]: e.target.value
        });
      };
      
  return (
    <Modal open={isOpen} onClose={() => setIsOpen(close)} aria-labelledby="hemloo">
        <Container>
           <Wrapper>
            <Header>
                    <TitleContainer isBuy={marketWatchData?.buysell}>{marketWatchData?.buysell === 1 ? "BUY" : "SELL"}</TitleContainer>
                    <CloseIcon onClick={() => setIsOpen(false)}/>
                </Header><hr/>
                {data && <Form onSubmit={handleSubmit} ref={formRef}>
                    <div>
                        {event === 'create' &&
                            <>
                                <div className="inputWrapper" >
                                    <label> exchange</label>
                                    <input readOnly name='exchange' onChange={handleChange} value={manualTradeData.exchange} placeholder='Enter exchange' />
                                </div> 
                                <div className="inputWrapper" >
                                    <label> Symbol</label>
                                    <input readOnly name='symbol' value={manualTradeData?.ticker_code} />
                                </div> 
                                <div className="inputWrapper" >
                                    <label> Security Type</label>
                                    <input readOnly name="securitytype" value={manualTradeData.securitytype}  />
                                </div> 
                                <div className="inputWrapper" >
                                    <label> Token</label>
                                    <input readOnly name="token" value={manualTradeData.token}  />
                                </div> 
                                <div className="inputWrapper" >
                                    <label> Expirydate</label>
                                    <input readOnly name='expirydate'  value={manualTradeData.expirydate}  />
                                </div> 
                                <div className="inputWrapper" >
                                    <label> opttype</label>
                                    <input readOnly name='opttype' value={manualTradeData.opttype} />
                                </div> 
                                <div className="inputWrapper" >
                                    <label> Strike price</label>
                                    <input readOnly name='strikeprice' value={manualTradeData.strikeprice} placeholder='Enter strikeprice' />
                                </div> 
                            </>
                        }
                        <div className="inputWrapper" >
                            <label> qty</label>
                            <input name='qty' onChange={handleChange} value={manualTradeData.qty} step={marketWatchData.qty} placeholder='Enter qty' type='number' required />
                        </div> 
                        <div className="inputWrapper" >
                            <label> price</label>
                            <input required name='price' onChange={handleChange} value={manualTradeData.price} step={marketWatchData.ticksize}  placeholder='Enter price' min={marketWatchData.ticksize} type="number" />
                        </div> 
                        <div className="inputWrapper">
                            <label>Order type:</label>
                            <select name='producttype' onChange={handleChange} value={manualTradeData.ordertype}>
                                    <option hidden={true}>Select type</option>
                                    <option value="LIMIT">LIMIT</option>
                                    <option value="IOC">IOC</option>
                            </select>
                        </div>
                        {event === 'create' &&
                            <>
                                <div className="inputWrapper" >
                                    <label> trigger price</label>
                                    <input name='triggerprice' onChange={handleChange} value={manualTradeData.triggerprice} placeholder='Enter triggerprice' type={"number"} />
                                </div> 
            
                                <div className="inputWrapper" >
                                    <label> producttype</label>
                                    <select name='producttype' onChange={handleChange} value={manualTradeData.producttype}>
                                            <option hidden={true}>Select producttype</option>
                                            <option value="LIMIT">LIMIT</option>
                                            <option value="MARKET">MARKET</option>
                                    </select>
                                </div> 
                                <div className="inputWrapper" >
                                    <label> producttype</label>
                                    <select name='validity' onChange={handleChange} value={manualTradeData.validity}>
                                            <option hidden={true}>Select validity</option>
                                            <option value="DAY">DAY</option>
                                            <option value="TILL_CANCEL">TILL CANCEL</option>
                                    </select>
                                </div> 
                                <div className="inputWrapper" >
                                    <label> D_qty</label>
                                    <input name='d_qty' onChange={handleChange} value={manualTradeData.d_qty} placeholder='Enter d_qty' type={"number"} />
                                </div> 
                                <div className="inputWrapper" >
                                    <label> Broker</label>
                                    <select name='apiplatform' onChange={handleChange} value={manualTradeData.apiplatform}>
                                            <option hidden={true}>Select validity</option>
                                            <option value="test">Test</option>
                                            <option value="zerodha">ZERODHA</option>
                                            <option value="xts">XTS</option>
                                    </select>
                                </div> 
                            </>
                        }
                    </div>
                    <button type="submit" className={`submitBtn`} style={{ background : marketWatchData?.buysell === 1 ? "#92d792" : "#ff9191"}}>{marketWatchData?.buysell === 1 ? "BUY" : "SELL"}</button>
                </Form>}
           </Wrapper>
        </Container>
    </Modal>
  )
}

export default MainualTrade


const Container = styled.div`
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    background-color: white;
    border: none;
    width: 400px;
    min-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    >svg:hover{
        color: red;
    }
`
const TitleContainer = styled.div`
    color: ${p => p.isBuy === 1 ? "green" : "red"};
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