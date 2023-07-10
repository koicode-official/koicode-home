"use client"
import styled, { css } from "styled-components"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { scrollState } from "@/state/scroll"
import { useEffect } from "react"
import ThreeComponent from "@/component/Three"
import About from "@/component/About"
import Portfolio from "@/component/Portfolio"
import Contact from "@/component/Contact"
import { shpereControlState } from "@/state/sphere";
import { media } from "@/component/common/Component"

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
`
const IntroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
const ThreeContainer = styled.div`
  display: flex;
  align-items: center;
  width:100%;
`
const MainTitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
  width: 100%;
  margin-bottom: 30px;
`


const MainTitle = styled.div`
  font-size: 98px;
  font-weight: 700;
  text-align: center;
  h2{
    width: fit-content;
    text-align: right;
    font-size: 90px;
    color:#fefefe;
  }
  p{
    width: 411px;
    font-size: 16px;
    line-height: 24px;
    color:#ffffff80;
    span
  {
      font-size: 20px;
      line-height: 24px;
    }
  }
  


  ${media.tablet`
    font-size: 48px;
    h2{
      width:100%;
    text-align: center;
      font-size: 46px;
    }
    p{
      width:100%;
    }
  `}

  ${media.mobile`
    width:100%;
    font-size: 32px;
    h2{
      width:100%;
    text-align: center;
      font-size: 30px;
    }
    p{
      /* width: 250px; */
      text-align:center;
      font-size: 12px;
      span{
        font-size:12px;
        color:#ccc;
      }
    }
  `}
`;

const MainContainer = styled.div`
  width: 1320px;
  height: 100%;

  ${media.desktop`
    width: 100%;
  `}

  ${media.tablet`
  `}

  ${media.mobile`
  `}
`;




export default function Home() {
  const sphereState = useRecoilValue(shpereControlState);
  const scrollStateInfo = useRecoilValue(scrollState);
  const setScrollState = useSetRecoilState(scrollState);
  const setSphereState = useSetRecoilState(shpereControlState);

  useEffect(() => {
    // console.log('scrollY', scrollStateInfo.scrollY)
  }, [scrollStateInfo.scrollY])


  useEffect(() => {
    const handleScroll = () => {
      setScrollState(prev => {
        return {
          ...prev,
          scrollY: window.scrollY
        }
      })
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setSphereState(prev => {
      return {
        ...prev
        , active: false
        , index: null
      }

    })
  }


  return (
    <MainWrapper>
      <MainContainer>
        <IntroContainer blurProps={sphereState.active === true ? 2 : 0}>
          <MainTitleContainer>
            <MainTitle>
              <h2>KOI-CODE</h2>
              <p><span>코이코드</span>는 다양한 서비스 플랫폼을 위한 우수한 외주 개발 <br></br> 솔루션을 제공하는 신뢰할 수 있는 IT 회사입니다.</p>
            </MainTitle>
          </MainTitleContainer>
          <ThreeContainer>
            <ThreeComponent></ThreeComponent>
          </ThreeContainer>
        </IntroContainer>
        <About index={0} closeFunction={handleClose}></About>
        <Portfolio index={1} closeFunction={handleClose}></Portfolio>
        <Contact index={2} closeFunction={handleClose}></Contact>
      </MainContainer>
    </MainWrapper>
  )
}
