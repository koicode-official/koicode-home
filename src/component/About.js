"use client"
import styled from "styled-components"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { shpereControlState } from "@/state/sphere";
import { useEffect, useState } from "react";
import { Wrapper, Container, media } from "./common/Component";
import Backward from "./common/Backward";

const AboutWrapper = styled(Wrapper)``
const AboutContainer = styled(Container)`
  
`
const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;

`
const KoisLawContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  p{
    font-size: 18px;
    line-height: 26px;
    width: 100%;
    white-space: normal;
  }
  ${media.tablet`
    p{
      font-size:16px;
    }
  `}
  ${media.tablet`
    p{
      font-size:14px;
    }
  `}
`
const IntroduceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width:100%;
  margin-top: 42px;
  ${media.tablet`
    flex-direction:column;
  `}
  ${media.mobile`
    flex-direction:column;
  `}
`
const IntroduceGroup = styled.div`
  background-color: #262630;
  padding: 30px;
  width: 30%;
  border-radius:5px;
  h2{
    font-size: 20px;
    font-weight: 500;
    text-align: center;
  }
  ${media.tablet`
  width: 100%;
  margin-bottom:24px;
    h2{
      font-size: 18px;
    }
  `}
  ${media.mobile`
    h2{
      font-size:18px;
      margin-bottom:24px;
    }
  `}
  
`
const Introduce = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  margin-bottom: 24px;
  ${media.tablet`
  font-size:14px;
  `}
`



function About({ index, closeFunction }) {
  const sphereState = useRecoilValue(shpereControlState);


  return (
    <AboutWrapper rightProps={index === sphereState.index ? "0" : "150"}>
      <AboutContainer>
        <Backward closeFunction={closeFunction}></Backward>
        <h2>About</h2>
        <ContentsContainer>
          <KoisLawContainer>
            <p>
              코이의 법칙(Koi&lsquo;s Law)은 비단잉어 코이라는 물고기가 환경에 따라 다르게 성장하는 것을 말합니다.
              <br></br> 코이는 작은 어항에서는 작은 크기로 자라지만, 큰 수족관이나 연못에서는 더 크게 자랍니다. 또한, 강물에 방류하면 최대 크기까지 성장합니다.
            </p>

          </KoisLawContainer>
          <KoisLawContainer>
            <p>
              저희는 코이처럼 주변 환경에 따라 다양한 크기로 성장하며, 고객님의 비전을 현실로 만들기 위해 유연하고 적응력 있는 접근 방식을 갖추었습니다. 웹 개발, 인공지능 개발, 디지털 마케팅 등 다양한 분야에서의 경험과 전문성을 바탕으로 고객님의 프로젝트를 성공적으로 완수할 수 있습니다. 우리는 고객님과 함께 성장하며, 고객님의 비전을 실현하기 위해 열정과 노력을 가지고 있습니다.
            </p>
          </KoisLawContainer>
          <IntroduceContainer>
            <IntroduceGroup>
              <h2>다양성</h2>
              <Introduce>
                저희는 고객님의 비전과 목표를 실현하기 위해 최고의 기술과 창의성을 제공합니다. 작은 어항부터 강물까지 다양한 프로젝트 경험으로 웹 서비스 개발에 능숙하며, 인공지능 개발과 마케팅 전략에도 전문성을 갖추었습니다. 고객님의 비즈니스 성공을 위해 최선을 다할 것입니다.
              </Introduce>
            </IntroduceGroup>
            <IntroduceGroup>
              <h2>전문성</h2>
              <Introduce>
                우리는 철저한 분석과 계획으로 시작하여 디자인, 개발, 테스트, 배포까지 전체적인 개발 생명주기를 꼼꼼하게 관리합니다. 팀원들은 다양한 기술 스택과 프레임워크에 능숙하며, 최신 트렌드와 개발 도구에 대한 지식을 갖추고 있습니다. 또한, 인공지능 개발 및 마케팅 전략도 우리의 업무에 포함되어 있습니다. 우리는 고객님의 프로젝트를 성공적으로 이끌기 위해 전문성과 최신 도구를 활용합니다.
              </Introduce>
            </IntroduceGroup>
            <IntroduceGroup>
              <h2>커뮤니케이션</h2>
              <Introduce>
                우리는 고객님의 비즈니스 요구 사항을 정확히 이해하고, 최고의 사용자 경험과 기능을 개발하고 제공합니다. 우리의 업무 프로세스는 투명하며, 지속적인 의사소통과 협업을 통해 프로젝트의 진행 상황을 항상 업데이트합니다.
              </Introduce>
            </IntroduceGroup>
          </IntroduceContainer>
        </ContentsContainer>
      </AboutContainer>
    </AboutWrapper>
  );
}

export default About;