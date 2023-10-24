import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { stopLoading } from '../redux/LoadingSlice';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: all 0.3 ease-in-out;
  opacity: ${p => p.isLoading ? "1" : "0"};
`;

const Spinner = styled.div`
  width: 35px;
  height: 35px;
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;
`;

const Container = styled.div`
    border-radius: 0.5rem;
    background-color: white;
    box-sizing: border-box;
    min-width: 400px;
    padding: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    >div{
        width: 100%;
    }
`
const Top = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
`
const Title = styled.h3`
    font-size: 2rem;
    font-weight: 200;
`
const Main = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const Bottom = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    > button {
        padding: 0.7rem 1rem;
        border: none;
        border-radius: 1vmin;
        background-color: #E5E7EB;
        :hover {
            background-color: #f2f4f7;
        }
    }
`

function Loading() {
    const {isLoading, title, desc, cta} = useSelector(s => s.loading);
    const dispatch = useDispatch();
    const cancelRequest = () => {
        dispatch(stopLoading());
    }
    return (
        <>
        {isLoading && 
            <Backdrop isLoading={isLoading}>
                <Container>
                    <Top>
                        <Title>{title}</Title><hr/>
                        <Main>
                            <Spinner/><p>{desc}</p>
                        </Main>
                    </Top>
                    <Bottom>
                        <button onClick={cancelRequest}>{cta}</button>
                    </Bottom>
                </Container>
            </Backdrop>
        }
        </>
    );
}

export default Loading;
