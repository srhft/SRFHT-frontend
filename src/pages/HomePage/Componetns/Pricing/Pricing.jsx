
import"./Pricing.css"
import styled from "styled-components"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {useState } from "react"
import BeenhereIcon from '@mui/icons-material/Beenhere';

const data = [
  {
    isActive: false,
    title: "Basic Plan",
    monthlyPrice: 199.99,
    yearlyPrice: 1499.99,
    features: [
      "Profit sharing with 2 complementary bots",
      "Trade execution notifications",
      "Customizable dashboard"
    ]
  },
  {
    isActive: true,
    title: "Professional Plan",
    monthlyPrice: 249.99,
    yearlyPrice: 2999.99,
    features: [
      "5+ pre-built trading bots",
      "Execution of 2 live bots",
      "Real-time trade execution notifications",
      "Access to basic trading strategies",
      "Email support",
      "Customizable dashboard"
    ]
  },
  {
    isActive: false,
    title: "Master Plan",
    monthlyPrice: 399.99,
    yearlyPrice: 3999.99,
    features: [
      "10+ pre-built trading bots",
      "Unlimited bot executions",
      "Real-time trade execution notifications",
      "Access to advanced trading strategies",
      "Email and live chat support",
      "Customizable dashboard",
      "Historical data for in-depth analysis"
    ]
  }
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
`
const Head = styled.div`
  
`
const Cards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 3rem 0;
  height: max-content;
  >div{
    box-sizing: border-box;
    background: #fff;
    color: hsl(233, 13%, 49%);
    border-radius: 0.8rem;
    position: relative;
    ul{
      margin-bottom: 70px;
    }
  }

  .btnLi {
    position: absolute;
    bottom: 20px;
  }
`
const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true)

  return (
    <Container>
      <Head>
      <h1>Our Pricing</h1>
      <div className="toggle">
        <label>Annually </label>
        <div className="toggle-btn" >
          <input type="checkbox" className="checkbox" id="checkbox" checked={isMonthly} onChange={e => setIsMonthly(e.target.checked)} />
          <label className="sub" id="sub" for="checkbox">
            <div className="circle"></div>
          </label>
        </div>
        <label>Monthly</label>
      </div>
      </Head>
      <Cards className="cards">
        {data.map(e => {
          return (
            <div className={`card ${e.isActive ? "active" : "shadow"}`}>
              <ul>
                <li className="pack titles">{e.title}</li>
                <li className="price bottom-bar titles"><CurrencyRupeeIcon/>{isMonthly ? e.monthlyPrice : e.yearlyPrice}</li>
                {e.features.map(feature => <li className="bottom-bar"><BeenhereIcon/>{feature}</li>)}
                <div className="btnLi" ><button className={`btn ${e.isActive && "active-btn"}`}>Learn More</button></div>
              </ul>
            </div>
          )
        })}
      </Cards>
    </Container>
  )
}

export default Pricing