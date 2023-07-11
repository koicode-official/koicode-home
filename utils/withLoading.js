"use client"
import styled from "styled-components"
import { commonState } from "@/state/common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Oval } from 'react-loader-spinner'
import { useEffect } from "react";

const WithLoadingWrpper = styled.div`
`
const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100vh;
  background-color: #001c30;

`

function WithLoading({ children }) {
  const commonStateInfo = useRecoilValue(commonState)
  useEffect(()=>{console.log('commonStateInfo', commonStateInfo)},[commonStateInfo])
  return (
    <WithLoadingWrpper>
      {children}
      {commonStateInfo.isLoading === true &&
        <LoadingSpinnerContainer>
          <Oval
            height="80"
            width="80"
            radius="9"
            color="#fefefe"
            secondaryColor="tomato"
            ariaLabel="loading"
          />
        </LoadingSpinnerContainer>
      }
    </WithLoadingWrpper>
  );
}

export default WithLoading;