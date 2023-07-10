"use client"
import styled from "styled-components"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { shpereControlState } from "@/state/sphere";
import { media } from "./Component";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

${media.tablet`
justify-content: center;
  align-items: center; // center elements horizontally
  `
  }
`
const HeaderContainer = styled.div`
display: flex;
/* justify-content: flex-end; */
padding: 20px;
width: 30%;
max-width: 1320px; // set max-width to 1320px
${media.tablet`
width: 90%; // reduce width to 90% of the viewport
justify-content: center;
  align-items: center; // center elements horizontally
  `
  }

`
const LogoContainer = styled.div``
const Logo = styled.div``
const MenuList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  width: 80%; // reduce width to 80% of the parent element

  ${media.tablet`
  align-items: center; // center elements horizontally
  width: 100%; // set width to 100% of the parent element
  `
  }
`
const Menu = styled.li`
  font-size: 16px;
  font-weight: 300;
  cursor: pointer;
`

function Header() {

  const sphereState = useRecoilValue(shpereControlState);
  const setSphereState = useSetRecoilState(shpereControlState);

  const handleMenu = (index) => {
    if (sphereState.index === index) {
      setSphereState((prev) => ({
        ...prev,
        active: !prev.active,
        index: null,
      }));
    } else {
      setSphereState((prev) => ({
        ...prev,
        active: true,
        index: index,
      }));
    }
  }

  return (
    <HeaderWrapper>
      <HeaderContainer>
        {/* <LogoContainer>
          <Logo></Logo>
        </LogoContainer> */}
        <MenuList>
          <Menu onClick={() => handleMenu(0)}>About</Menu>
          <Menu onClick={() => handleMenu(1)}>Portfolio</Menu>
          <Menu onClick={() => handleMenu(2)}>Contact</Menu>
        </MenuList>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

export default Header;
