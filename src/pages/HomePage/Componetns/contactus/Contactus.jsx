// ContactUs.js
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: min(800px, 90%);
`;

const Input = styled.input`
  width: 100%;
  padding: 12px; 
  margin-bottom: 20px; 
  border: 2px solid #0077b6; 
  border-radius: 8px; 
  font-size: 16px;
  transition: border-color 0.3s; 
  outline: none; 

  &:hover {
    border-color: #005f8a; 
  }

  &:focus {
    border-color: #005f8a;
    box-shadow: 0 0 5px rgba(0, 119, 182, 0.5); 
  }
`;


const Button = styled.button`
  background-color: #0077b6;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

const ContactUs = () => {
  return (
    <Container>
      <Title>Contact Us</Title>
      <Description>
        Have questions or feedback? Please fill out the form below.
      </Description>
      <Form>
        <Input type="text" placeholder="First Name" />
        <Input type="text" placeholder="Last Name" />
        <Input type="email" placeholder="Email" />
        <Input as="textarea" rows="4" placeholder="Message" />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default ContactUs;
