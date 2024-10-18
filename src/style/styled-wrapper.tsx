"use client";

import StyledComponentsRegistry from "./registry";
import GlobalStyle from "./globalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./theme";

export const StyledWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
};
