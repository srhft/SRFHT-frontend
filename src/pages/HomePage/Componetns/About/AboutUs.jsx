import styled from "styled-components"
import RingAnimation from "../../../../components/RingAnimation"
//import image6 from '../../../../assets/images/image6.jpeg'

const Container = styled.div`
    overflow: hidden;
    display: flex;
    justify-content: center;
    position: relative;
`
const Wrapper = styled.div`
    width: min(90%, 1200px);
    display: flex;
    flex-direction: column;
    gap: 5rem;
`
export const TopSection = styled.div`
    padding-top: 100px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    >h2{
        font-size: 3rem;
        margin: 0.5rem 0;
    }
    >p{
        font-size: 1.5rem;
        width: min(90%, 800px);
        font-weight: 500;;
    }
`

const MidSection = styled.div`
    display: flex;
    gap: 1rem;
    >*{
        flex: 1;
        
    }
    p{
        margin: 1rem 0;
    }
`



const About =() =>{
  return(
  <Container id="aboutus">
        <Wrapper>
            <TopSection>
                <h2>About Us</h2>
                <p>We pioneered the discount broking model in India.
                Now, we are breaking ground with our technology.</p>
            </TopSection>
            <MidSection>
                <div>
                    <p>We kick-started operations on the 25th of March, 2023 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology. We named the company Zerodha, a combination of Zero and "Rodha", the Sanskrit word for barrier.</p>
                    <p>Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.</p>
                    <p>Over 1+ Crore clients place millions of orders every day through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.</p>
                </div>
                <div>
                    <p>In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.</p>
                    <p>Rainmatter, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.</p>
                    <p>And yet, we are always up to something new every day. Catch up on the latest updates on our blog or see what the media is saying about us.</p>
                </div>
            </MidSection>
        </Wrapper>
        <RingAnimation style={{right: 0, top: 0}} />
  </Container> 
  )
            }


export default About
