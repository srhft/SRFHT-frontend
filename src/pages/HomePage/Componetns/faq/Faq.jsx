import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import faqData from "./Faq.json";
import SideSectionImg from "../../../../assets/images/image7.avif";

import styled from "styled-components";
// import { TopSection } from '../About/AboutUs';


const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Wrapper = styled.div`
  width: min(90%, 1200px);
  display: flex;
  flex-direction: column;
`




const TopSection = styled.div`
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
    >h1{
      margin-bottom: 2rem;
    }
    >p{
      font-size: rem;
    }
`

const SideSection = styled.div`
    margin: 5rem 0;
    display: flex;
    >*{
        flex: 1;
    }
    img{
        width: 100%;
        mix-blend-mode: multiply;
        scale: 1.2;
    }
`


function Faq() {
  return (
    <Container>
      <Wrapper>
        <TopSection >
          <h1 data-aos="flip-left">Frequently Asked Questions</h1>
          <p data-aos="flip-right">Stick on something? We're here to help with all your questions and answers in one place</p>
        </TopSection>
        <SideSection>
          <div className='Box1'>
              {faqData.map(e => {
                  return (
                      <Accordion>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" >
                          <Typography>{e.question}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                          <Typography>{e.answer}</Typography>
                          </AccordionDetails>
                      </Accordion>
                  )
              })}
          </div>
          <div ><img src={SideSectionImg} data-aos="flip-right" data-aos-duration="3000" /></div>
      </SideSection>
      </Wrapper>
    </Container>
  )
}

export default Faq