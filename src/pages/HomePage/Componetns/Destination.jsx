import image1 from "../../../assets/images/professional.png"
import image2 from '../../../assets/images/market.png'
import image3 from '../../../assets/images/api2.webp'

const Destinations = () => {
  return (
    <section className='destinations'>
      <h3>Now available in 46 countries!</h3>
      <div className='grid'>
        <div>
          <img src={image1} alt='destination-1' />
          <h3>Professional Strategist</h3>
          <p>
          We welcome highly experienced professional traders wherein we create a powerful amalgamation of your vigorous trading strategies and our robust tech resulting in smart AI-driven algos which can be easily monetized by you.
          </p>
        </div>

        <div>
          <img src={image2} alt='destination-2' />
          <h3>API Integration</h3>
          <p>
          We integrate with the broking houses either directly or via their supported OMS to provide a seamless real trading experience for all our clients across our product line. We support trading across different types of segments including cash, commodity, futures & options and all order types including regular, bracket and cover orders.
          </p>
        </div>

        <div>
          <img src={image3} alt='destination-3' justify-content="center" />
          <h3>Markets</h3>
          <p>
          State-of-the-art predictive algorithmic trading that caters accurate & reliable trading solutions for the capital markets within both Indian & global domains.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Destinations