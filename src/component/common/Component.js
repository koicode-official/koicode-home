"use client"
import styled, { css } from "styled-components";


const sizes = {
  mobile: 768,
  tablet: 1024,
  desktop: 1366,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});



export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  position: absolute;
  top: 0;
  width: 100%;
  opacity: 1;
  ${props => {
    return `left : ${props.rightProps}%;`
  }}
  transition:left .6s linear;
  ${media.tablet`
    padding: 0 40px 100px;  

  `}
  ${media.mobile`
    padding: 0 20px 60px;  

  `}
  
  `
export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  height: 100%;
  background: rgba(123, 123, 123, 0.45);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.6px);
  -webkit-backdrop-filter: blur(6.6px);
  border: 1px solid rgba(229, 229, 229, 0.3);
  padding: 20px 50px 50px;
  h2{
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 36px;
  }
  ${media.tablet`
  padding: 20px 30px 40px;  

    >h2{
      font-size:28px;
      margin-bottom:24px;
    }
  `}
  ${media.mobile`
    padding: 10px 15px 30px;  
    >h2{
      margin-bottom: 12px;
      font-size:20px;
    }
  `}
`

export const CloseButton = styled.div`
  width: 48px;
  height: 48px;
  position: relative;
  cursor: pointer;
  ::before,
  ::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60%;
    height: 2px;
    background-color: #fefefe;
    transform: translate(-50%, -50%);
  }

  ::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  ::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  ${media.tablet`
      width:36px;
      height:36px;

  `}
  ${media.mobile`
      width:24px;
      height:24px;

  `}

`