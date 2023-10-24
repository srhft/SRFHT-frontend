import React from 'react'
import { useSelector } from 'react-redux'
import styled from "styled-components"


const Container = styled.div`
    height: 100%;
    flex: 2;
    padding: 0.5rem;
`
const SingleElement = styled.div`
    cursor: pointer;
    margin: 0.5rem 0;
    min-width: 100px;
    padding: 0.5rem 0.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 0.5rem;
    :hover {
        background-color: white;
        box-shadow: 0 4px 9px rgba(17,17,26,.1), 0 8px 32px rgba(17,17,26,.05);
    }
    background: ${p => p.active ? "linear-gradient(90deg, rgba(33,82,255,1) 0%, rgba(33,212,253,1) 100%);": ""} !important;
    color: ${p => p.active ? "white" : "black"};
`


function SettingsNav({items, set}) {
    const handleNavClikc = (index) => {
        const newItems = items.map((item, i) => {
            if (i === index) return { ...item, active: true };
            return { ...item, active: false };
        });
        set(newItems);
    }
    const userRoleID = useSelector(e => e.user.userInfo?.clienttype_id ?? 0);
  return (
    <Container className='floatBox' >
        {items.map((e, index) => {
            if(e.permission <= userRoleID){ {/* if user permission is higher or = the permission need to view that component */}
                return  <SingleElement key={e.key} onClick={() => handleNavClikc(index)} active={e.active}>
                            <div className='iconWrapper'>{e.icon}</div>
                            <p>{e.name}</p>
                        </SingleElement>
            }
        })}
    </Container>
  )
}

export default SettingsNav