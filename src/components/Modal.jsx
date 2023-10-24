import styled from 'styled-components'

const BackDrop = styled.div`
    opacity: ${p => p.isOpen ? "100%" : "0%"};
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0,0.3);
    transition: right 0.5s ease-in-out;
`

const Container = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    max-width: 90%;
    max-height: 95dvh;
    overflow-y: auto;
    background-color: white;
    box-shadow: 0 0px 0px 1000px rgba(0,0,0,.3);
    padding: 20px;
    z-index: 100;
    border-radius: 1vmax;
    display: ${p => p.isOpen ? "block": "none"};
`

function Modal({children, isOpen }) { 

  return (
    <>
      {isOpen && <BackDrop/>}
      <Container isOpen={isOpen}>
          {children}
      </Container>
    </>
  )
}

export default Modal