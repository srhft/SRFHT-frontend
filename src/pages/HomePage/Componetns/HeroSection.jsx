import styled from "styled-components"
import MainSectionImg from "../../../assets/images/mainimage.jpeg"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MainSection = styled.div`
    margin: 5rem;
    width: min(90%, 1200px);
    display: flex;
    >*{
        flex: 1;
    }
    img{
        width: 100%;
    }
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
`


const Section = styled.div`
    padding: 5rem 0;
    display: flex;
    justify-content: center;

    >div{
        width: min(1400px, 90%);
        display: flex; 
        >*{
            flex: 1;
        }
        .img{
            img{
                width: 100%;
            }
        }
        .info{
            padding: 0 2rem;
            >h2{
                font-size: 2rem;
                margin: 3rem 0;
            }
        }

    }
`
const HeroSection = () => {
    return (
        <Container >
                <MainSection >
                    <InfoContainer>
                        <h1>  Unleash Your Potential with SRHFT UHFT PLATFORM </h1>
                        <p class="lead">Gain a competitive edge in the financial markets</p>
                    </InfoContainer>
                    <div>
                        <img src={MainSectionImg} alt="" />
                    </div>

                </MainSection>
                <Section class="p-5 bg-dark text-light">
                    <div>
                        <div class="img">
                            <img src="https://images.unsplash.com/photo-1677979900618-3637ebcbc523?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=MnwzOTE5Mjl8MHwxfHNlYXJjaHwxfHxleHBlcnRpc2UlMkMlMjBzb2x1dGlvbnN8ZW58MHx8fHwxNjgyMDE4Njky&ixlib=rb-4.0.3&q=80&w=606&auto=format&h=424" class="img-fluid" alt="" />
                        </div>
                        <div class="info">
                            <h2> Expert Developmet</h2>
                            <p class="lead">Our team of expert developers, data scientists, and traders work tirelessly to develop software that helps our clients execute trades faster and more accurately than their competitors. We specialize in creating cutting-edge solutions for traders looking to gain a competitive edge in the financial markets.
                            </p>
                        </div>
                    </div>
                </Section>
                <Section class="p-5 bg-white text-light">
                    <div>

                        <div class="info">
                            <h2> Advanced Algorithms</h2>
                            <p class="lead">Our cutting-edge HFT software leverages advanced algorithms, AI, and machine learning to identify and execute trades in milliseconds, giving you the edge you need in the financial markets.
                            </p>
                        </div>
                        <div class="img">
                            <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=MnwzOTE5Mjl8MHwxfHNlYXJjaHwxfHx0cmFkaW5nJTJDJTIwdGVjaG5vbG9neXxlbnwwfHx8fDE2ODIwNjIwMDk&ixlib=rb-4.0.3&q=80&w=606&auto=format&h=424" class="img-fluid" alt="" />
                        </div>
                    </div>
                </Section>
                <Section class="p-5 bg-dark text-light">
                    <div>

                        <div class="img">
                            <img src="https://images.unsplash.com/photo-1680711211916-195a00308786?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixid=MnwzOTE5Mjl8MHwxfHNlYXJjaHwxfHxzcGVlZCUyQyUyMHRyYWRpbmd8ZW58MHx8fHwxNjgyMDYyMDA5&ixlib=rb-4.0.3&q=80&w=606&auto=format&h=424" class="img-fluid" alt="" />
                        </div>
                        <div class="info">
                            <h2> Lightning-Fast Trading</h2>
                            <p class="lead">Our HFT software allows you to take advantage of lightning-fast trading opportunities that would be impossible to capitalize on using traditional methods. Make trades faster and more accurately than your competitors.
                            </p>
                        </div>
                    </div>
                </Section>
        </Container>
    )
}

export default HeroSection


{/* <div className="wrapper">
      <Showcase className='showcase'>
        <div className='showcase-overlay'>
          <Img src=".images/mainimage.jpeg">
       
          
        </div>
        <div className="textcase-overlay">
        <h1></h1>
          <p>
            
          </p>

        </div>
      </Showcase>
      </div> */}