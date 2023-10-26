import image1 from "../../../assets/images/trading1.jpeg"
import image2 from '../../../assets/images/trading2.jpg'
import image3 from '../../../assets/images/trading3.jpg'
import styled from "styled-components"

const Containe = styled.section`
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  >h3{
    margin: 1rem 0;
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

const Destinations = () => {
  return (
    <Containe >
      <h3>Now available in India</h3>
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
    </Containe>
  )
}

export default Destinations