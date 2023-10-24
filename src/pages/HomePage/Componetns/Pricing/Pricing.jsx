
import"./Pricing.css"
import styled from "styled-components"

// const utility-bluetext = styled.text`
//   color: var(--gh-blue-6)
// `

//   const section = styled.section`
//     display: flex;
//     flex-direction: row;
//     justify-content: center;

//     @media only screen and (max-width: 800px) {
//       .section {
//         flex-direction: column;
//         align-items: center;
//       }
//     }
    
//     const plan1-container,
//     const plan2-container,
//     const plan3-container = styled.div'
//       display: flex;
//       flex-direction: column;
//       justify-content: space-between;
//       align-items: center;
//       padding: 20px 10px;
//       border: 1px solid var(--gh-grey-1);
//       border-radius: 0.5rem;
//       margin: 20px;
//       width: 270px;
//     }
//     `
    
//     const plan1Container= styled.div`
//       border-top: 0.4rem solid var(--gh-green-6);
     
//     const plan2container =styled.div'
//       background-image: linear-gradient
//         135deg,
//         var(--gh-green-7) 0%,
//         var(--gh-blue-7) 100%
      
    
    
//     const plan3-container = styled.div'
//       border-top: 0.4rem solid var(--gh-blue-6);
    
    
//     const plan-upper = styled.div'
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       padding-bottom: 2rem;
//       padding-top: 2rem;
//       text-transform: uppercase;
//       line-height: 1.625;
    
    
//     const plan-middle-title,
//     const plan2-middle-title =styled.div'
//       text-align: center;
//       font-weight: 600;
    
    
//     const plan-text1,
//     const plan2-text1= styled.div'
//       font-size: 1.25rem;
//       font-weight: 700;
    
    
//     const plan-text2,
//     const plan2-text2 =styled.div'
//       font-weight: 700;
//       font-size: 3rem;
    
    
//     const plan-text3,
//     const plan2-text3 =styled div'
//       font-weight: 700;
//       letter-spacing: 0.1rem;
//       color: var(--gh-grey-2);
    
    
//     const plan2-text1,
//     const plan2-text2,
//     const plan2-text3 = styled div'
//       color: #fff;
    
    
//     const plan1-middle-title=styled.div'
//       font-size: 1.25rem;
//       font-weight: 700;
//       letter-spacing: 0.025rem;
//     }
    
//     const plan-middle ul,
//     const plan2-middle ul =styled.div'
//       display: flex;
//       flex-direction: column;
    
    
//     const plan-middle ul li,
//     const plan2-middle ul li = styled.div'
//       margin: 10px;
//       text-align: left;
    
    
//     const plan2-middle =styled.div'
//       color: #fff;
    
    
//     const plan-button1,
//     const plan-button2,
//     const plan-button3 =styled.div'
//       color: #fff;
//       padding: 10px 50px;
//       border-radius: 15px;
//       cursor: pointer;
//       margin-top: 10px;
//       font-weight: 600px;
//       width: 190px;
//       text-align: center;
//       box-shadow: 0 5px #999;
    
    
//     const plan-button1 =styled.div'
//       background-color: var(--gh-green-7);
    
//     const plan-button1:active =styled.div'
//       background-color: var(--gh-green-9);
    
    
//     const plan-button2 =styled.div
//       background-color: var(--gh-blue-5);
    
//     const plan-button2:active =styled.div'
//       background-color: var(--gh-blue-7);
    
    
//     const plan-button3 =styled.div'
//       background-color: var(--gh-blue-7);
    
    
//     const plan-button3:active =styled.div'
//       background-color: var(--gh-blue-8);
    
    
//     const plan-button1:active,
//     const plan-button2:active,
//     const plan-button3:active =styled.div'
//       box-shadow: 0 5px var(--gh-grey-4);
//       transform: translate(4px);
    
    
//     const highlight =styled.div'
//       position: absolute;
//       background: linear-gradient(
//         135deg,
//         var(--gh-blue-7) 0%,
//         var(--gh-green-6) 100%
      
//       >height: 0.5rem;
//       left: 0px;
//       right: 0px;
//       top: 0px;
//       border-top-left-radius: 0.5rem;
//       border-top-right-radius: 0.5rem;
//     }
  
const Section = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
}
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10px;
  border: 1px solid var(--gh-grey-1);
  border-radius: 0.5rem;
  margin: 20px;
  width: 270px;

`

const Upper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
  padding-top: 2rem;
  text-transform: uppercase;
  line-height: 1.625;

  >div{
    color: ${p => p.special ? "#fff":  "var(--gh-grey-2)"};
    font-size: 1.25rem;
    font-weight: 700; 
  }
`

const PlanText2 = styled.div`
  font-weight: 700;
  font-size: 3rem;

  color: ${p => p.special ? "black": "var(--gh-grey-2)"};
`
const PlanText3 = styled.div`
  font-weight: 700;
  letter-spacing: 0.1rem;
`

const Plan = styled.div`
  ul {
    display: flex;
    flex-direction: column;
  }
  li {
    margin: 10px;
    text-align: left;
  }
  div{
    text-align: center;
    font-weight: 600;
  }
`

const MainTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.025rem;
`

const Button = styled.button`
  color: #fff;
  padding: 10px 50px;
  border-radius: 15px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: 600px;
  width: 190px;
  text-align: center;
  box-shadow: 0 5px #999;
`



const Pricing = () => {
  return (
     <Section className="section">
     <Container style={{borderTop:" 0.4rem solid var(--gh-green-6)"}} >
       <Upper >
         <PlanText2 className="plan-text1">PERSONAL</PlanText2>
         <PlanText2 className="plan-text2">$17.99</PlanText2>
         <PlanText3 className="plan-text3">MONTHLY</PlanText3>
       </Upper>
       <Plan>
         <div className="plan-middle-title">Single Plan</div>
         <ul>
           <li>30 Examples</li>
           <li>80 External Pages</li>
           <li>Basic Help</li>
         </ul>
       </Plan>
       <Button >BUY NOW</Button>
     </Container>
  
     <Container style={{backgroundImage: "linear-gradient( 135deg, var(--gh-green-7) 0%, var(--gh-blue-7) 100%)" }} >
       <Upper special={true}>
         <PlanText2 className="plan2-text1">BUSINESS</PlanText2>
         <PlanText2 className="plan2-text2">$37.99</PlanText2>
         <PlanText3 className="plan2-text3">MONTHLY</PlanText3>
       </Upper>
       <Plan>
         <div className="plan2-middle-title">For individuals</div>
         <ul>
           <li>7 Landing Pages</li>
           <li>12 Internal Pages</li>
           <li>Basic Assistance</li>
         </ul>
       </Plan>
       <Button>BUY NOW</Button>
     </Container>
     <Container style={{ borderTop: "0.4rem solid var(--gh-blue-6)"}}>
       <Upper>
         <PlanText2 className="plan-text1">PERSONAL</PlanText2>
         <PlanText2 className="plan-text2">$17.99</PlanText2>
         <PlanText3 className="plan-text3">MONTHLY</PlanText3>
       </Upper>
       <Plan >
         <div className="plan-middle-title">Single Plan</div>
         <ul>
           <li>30 Examples</li>
           <li>80 External Pages</li>
           <li>Basic Help</li>
         </ul>
       </Plan>
       <Button>BUY NOW</Button>
     </Container>
   </Section>
    
    
  )
}

export default Pricing