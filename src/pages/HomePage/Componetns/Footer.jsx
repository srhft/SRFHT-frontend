import { Google } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import MapIcon from '@mui/icons-material/Map';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LogoWithName from "../../../assets/images/logoWithName.png"
import { Link } from 'react-router-dom';

const Container = styled.div`
    background-color: #F7E9D7;
    padding-bottom: 1rem;
`

const Wrapper = styled.div`
    display: flex ;
    height: fit-content;
    @media (max-width: 1000px){
        flex-direction: column;
    }
`
const Left = styled.div`
    flex: 1;
    padding-top: 20px;
    padding-left: 40px;
    @media (max-width: 1000px){
        padding-left: 20px;
    }
`
const Logo = styled.div`
    height: 70px;
    >img{
        height: 100%;
    }
`
const Description = styled.p`
    margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex; 
`
const SocialIcons = styled.a`
    text-decoration: none;
    width: 40px;
    height: 40px;
    color: white;
    background-color: #${props=> props.color};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        filter: drop-shadow(0px 0px 4px #${props=> props.color});
    }

`
const Center = styled.div`
    flex: 1;
    padding: 20px;
    @media (max-width: 1000px){
        margin-top: 20px;
    }
`
const Title = styled.h3`
    margin-bottom: 20px;  
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;

`
const ListItem = styled(Link)`
    width: 50%;
    margin-bottom: 10px;
`
const Right = styled.div`
    flex: 1;
    padding: 20px;
`
const ContectItem = styled.p`
    margin-bottom: 20px;
    display: flex;
`


function Footer() {
  return (
      <Container>
        <Wrapper>   
            <Left>
                <Logo><img src={LogoWithName} /></Logo>
                <Description>
                Welcome to our company! We provide cutting-edge algo trading bots, flexible subscription plans, and a powerful strategy builder. Choose from pre-made bots with guaranteed profit potential or create your own personalized strategies. Join us today to maximize your investments.
            </Description>




                <SocialContainer>
                    <SocialIcons color='3b5998' href='https://www.facebook.com/' target="_blank">
                        <FacebookIcon/>
                    </SocialIcons>
                    <SocialIcons color='bc2a8d' href='https://www.instagram.com/' target="_blank">
                        <InstagramIcon />
                    </SocialIcons>
                    <SocialIcons color='075e54' href='https://www.whatsapp.com/' target="_blank">
                        <WhatsAppIcon />
                    </SocialIcons>
                    <SocialIcons color='4885ed' href='https://www.google.com/' target="_blank">
                        <Google />
                    </SocialIcons>
                </SocialContainer>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>HomePage</ListItem>
                    <ListItem>Pricing</ListItem>
                    <ListItem>Dashboard</ListItem>
                    <ListItem>Login</ListItem>
                    <ListItem>Register</ListItem>
                    <ListItem>Contact Us</ListItem>
                </List>
            </Center>
            <Right>
            <Title>Contact Us</Title>
                <ContectItem>
                    <MapIcon/> Street:  G-PH01, Reflection, Nr. Vaishnodevi Circle, b/h. Nirma University, Off.S.G.Highway, Tragad<br/>
                    Ahmadabad City, GJ 382470<br/>
                    India
                </ContectItem> 
                <ContectItem>
                    <CallIcon/>+91 7974134286
                </ContectItem> 
                <ContectItem> 
                    <EmailIcon/>info@SRHFT.com
                </ContectItem> 
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Footer