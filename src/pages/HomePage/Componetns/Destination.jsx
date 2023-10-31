import image1 from "../../../assets/images/trading1.jpeg"
import image2 from '../../../assets/images/trading2.jpg'
import image3 from '../../../assets/images/trading3.jpg'
import image4 from '../../../assets/images/trade4.jpg'
import image5 from '../../../assets/images/trade5.avif'
import image6 from '../../../assets/images/trade3.gif'
import styled from "styled-components"

const Containe = styled.section`
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  >h3{
    
    margin: 1rem 0;
    margin-top: 3rem;
    text-align: center;
    font-size: 2.5rem;
  }
`
const Grid = styled.div`
  width: min(1500px, 90%);
  padding: 1rem;
  display: flex;
  gap: 1.5rem;
  >div{
    flex: 1;
  } 
`
const Grid1 = styled.div`
  width: min(1500px, 90%);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  >div{
    flex: 1;
  } 
`

const Card = styled.div`
  min-height: 600px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  >img{
    width: 100%;
    height: 50%;
    object-fit: cover;
  }
  .infoSection{
    padding: 1rem;
    h3{
      font-size: 1.5rem;
      margin: 1rem 0;
    }
  }
`
const Card2 = styled.div`
  min-height: 400px;
  border-radius: 0.5rem;
  .img{
    width: 100%;
    height: 50%;
    border-radius: 1rem;
    overflow: hidden;
  }
  .img img{
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-in-out;
  }
  .infoSection{
    h3{
      font-size: 1.5rem;
      margin: 1rem 0;
    }
  }
  :hover{
    img{
      object-position: top;
      scale: 1.1;
    }
  }
`
const Destinations = () => {
  return (
    <Containe >
      <h3>Available in 43 countries!</h3>
      <Grid >
        <Card>
          <img src={image1} alt='destination-1' />
          <div className="infoSection">
            <h3>Professional Strategist</h3>
            <p>We welcome highly experienced professional traders wherein we create a powerful amalgamation of your vigorous trading strategies and our robust tech resulting in smart AI-driven algos which can be easily monetized by you.</p>
          </div>
        </Card>

        <Card>
          <img src={image2} alt='destination-2' />
          <div className="infoSection">
            <h3>API Integration</h3>
            <p>We integrate with the broking houses either directly or via their supported OMS to provide a seamless real trading experience for all our clients across our product line. We support trading across different types of segments including cash, commodity, futures & options and all order types including regular, bracket and cover orders.</p>
          </div>
        </Card>

        <Card>
          <img src={image3} alt='destination-3' />
          <div className="infoSection">
            <h3>Markets</h3>
            <p>State-of-the-art predictive algorithmic trading that caters accurate & reliable trading solutions for the capital markets within both Indian & global domains.</p>
          </div>
        </Card>
      
      </Grid>

      <h3>Pre- Built Trading Strategies</h3>
      <p>The most popular trading strategy templates available at your fingertips.</p>
      <Grid>
        <Card2 >
          <div className="img"><img src={image4} alt='destination-4' /></div>  
          <div className="infoSection">
            <h3>Trend Trader</h3>
            <p> It is a procedure where a merchant endevaours to match benefits bt examining energy of resources in a particular bearing. An upward trend is demonstrated via higher swing lows and higher swing highs</p>
          </div>
        </Card2>

        <Card2>
          <div className="img"><img src={image5} alt='destination-5' /></div>   
          <div className="infoSection">
            <h3>Candle Breakout</h3>
            <p>It is allutade to as endeavour to enter the market when the development of the costs is outside the chatacterised  scope of costs. A merchant can determine another cost range between most elevated and least of candlestick pattern undet this.</p>
          </div>
        </Card2>

        <Card2>
          <div className="img"><img src={image6} alt='destination-6' /></div> 
          <div className="infoSection">
            <h3>Multi- Leg Strategy</h3>
            <p> A multi-Leg choice sysytem is a method for making a request to buy and sell choices synchronously with more than one strike value, date of expiry, or a version to the basic cost of the resources. </p>
          </div>
        </Card2>
      </Grid>


    </Containe>
  )
}

export default Destinations