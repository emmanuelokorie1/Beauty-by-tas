import styled from "styled-components";

export const StyledModalContent = styled.div`
  padding: ${(props) => props.padding};
  border-radius: 0.4rem;
  width: ${(props) => props.width};
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
  max-height: ${(props) => props.MinHeight};
  min-height: ${(props) => props.MinnHeight};
  border: 1px solid #dcdbdb;
  overflow: scroll;
`;

export const StyledModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background-color: ${(props) => props.background || "rgba(0, 0, 0, 0.3)"};
  z-index: 9000;
  transition: linear 0.3s;
  backdrop-filter: blur(3px);
`;
