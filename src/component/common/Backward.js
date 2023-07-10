"use client"

import styled from "styled-components"
import { CloseButton } from "./Component"
const BackwardWrapper = styled.div`
  width: 100%;
`
const BackwardContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

function Backward({ closeFunction }) {
  return (
    <BackwardWrapper>
      <BackwardContainer onClick={closeFunction}>
        <CloseButton></CloseButton>
      </BackwardContainer>
    </BackwardWrapper>
  );
}

export default Backward;