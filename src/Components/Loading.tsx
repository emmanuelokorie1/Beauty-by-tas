// src/components/Loading.js

import React from "react";
import logo from "../assets/logo.svg";
import styled from "styled-components";

const Loading = () => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        src={logo}
        alt="Loading..."
        className="logo md:w-[120px] md:h-[100px] sm:w-[120px] sm:h-[100px] w-[70px] h-[70px]"
        style={{ borderRadius: '100%' }}
      />
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  @keyframes zoomInOut {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  .logo {
    animation: zoomInOut 1.4s infinite ease-in-out;
  }
`;
