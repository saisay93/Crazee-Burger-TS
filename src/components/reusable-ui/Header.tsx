import React, {ReactNode} from "react";
import styled from "styled-components";
import { theme } from "../../theme";

interface HeaderProps{
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
	return <HeaderStyled>{children}</HeaderStyled>;
};

export default Header;

const HeaderStyled = styled.div`
  height: 70px;
  background: ${theme.colors.background_dark};
  padding: 0 16px;
`;