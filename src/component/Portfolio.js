"use client"
import styled from "styled-components"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { shpereControlState } from "@/state/sphere";
import { useEffect, useState } from "react";
import { Wrapper, Container ,media} from "./common/Component";
import Backward from "./common/Backward";

const PortfolioWrapper = styled(Wrapper)``
const PortfolioContainer = styled(Container)``
const PortfolioContents = styled.div`
  display: flex;
  justify-content: space-between;
`

const PortfolioListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width:100%;
  ${media.tablet`
    flex-direction:column;
  `}
`
const PortfolioListGroup = styled.div`
  background-color: #262630;
  padding: 30px;
  border-radius:5px;
  width: 30%;
  h2{
    font-size: 20px;
    font-weight: 500;
    text-align: center;
  }
  ${media.tablet`
    width:100%;
    margin-bottom:24px;
  `}
  ${media.tablet`
    margin-bottom:12px;
    h2{
      font-size:18px;
      margin-bottom:24px;
    }
  `}
`
const PortfolioList = styled.ul`
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  margin-bottom: 24px;
  li{
    display: flex;
    margin-bottom:6px;
    span{
      display: block;
      margin-right: 4px;
    }
  }

  ${media.tablet`
    font-size:14px;
  `}
`





function Portfolio({ index, closeFunction }) {
  const sphereState = useRecoilValue(shpereControlState);
  return (
    <PortfolioWrapper  scalceProps={index === sphereState.index ? "1" : "0"}>
      <PortfolioContainer>
        <Backward closeFunction={closeFunction}></Backward>
        <h2>Portfolio</h2>
        <PortfolioContents>
          <PortfolioListContainer>
            <PortfolioListGroup>
              <h2>인공지능 / 블록체인</h2>
              <PortfolioList>
                <li><span>-</span> 농산물 가격예측 AI 모델, AT 예측대회 최우수상</li>
                <li><span>-</span> 캐글 중국 주식 가격예측대회 1등</li>
                <li><span>-</span> 의류 스케치-도면 연동 자동화 시스템 개발 - (주)컨트롤클로더</li>
                <li><span>-</span> 인재 추천 시스템 개발 - (주)아이크래프트</li>
                <li><span>-</span> Multi Datamatrix Code Detect/Decode 시스템개발 - (주)LG이노텍</li>
              </PortfolioList>
            </PortfolioListGroup>
            <PortfolioListGroup>
              <h2>웹 서비스</h2>
              <PortfolioList>
                <li><span>-</span>농산물 빅테이터 서비스 &lsquo;Agripa&lsquo;</li>
                <li><span>-</span>농산물 큐레이션 정기구독 서비스 &lsquo;Cueat&lsquo;</li>
                <li><span>-</span>국가식품클러스터진흥원 웹사이트</li>
              </PortfolioList>
            </PortfolioListGroup>
            <PortfolioListGroup>
              <h2>광고/마케팅</h2>
              <PortfolioList>
              <li><span>-</span>메르세데스 벤츠 모빌리티</li>
              <li><span>-</span>한국관광공사</li>
              <li><span>-</span>AT(한국농수산식품유통공사)</li>
              <li><span>-</span>CJ푸드빌(남해군)</li>
              <li><span>-</span>굽네치킨(남해군)</li>
              <li><span>-</span>원더라움</li>
              </PortfolioList>
            </PortfolioListGroup>
          </PortfolioListContainer>
        </PortfolioContents>
      </PortfolioContainer>
    </PortfolioWrapper>
  );
}

export default Portfolio;