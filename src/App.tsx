import { createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { darkModeTheme, theme } from "./theme";
import styled, { ThemeProvider } from "styled-components";
import React, { useState } from "react";

// 전역 스코프에 스타일을 주는 컴포넌트
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  font-family: 'Source Sans Pro', sans-serif;
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const DarkModeToggleButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 400;
  padding: 10px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme.textColor};
  transition: color 0.2s ease-in;
  span {
    vertical-align: sub;
  }
`;

const queryClient = new QueryClient();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleMode = () => setIsDarkMode((prev) => !prev);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={isDarkMode ? darkModeTheme : theme}>
          <GlobalStyle />
          <DarkModeToggleButton onClick={toggleMode}>
            <span>{isDarkMode ? "default" : "dark"}</span>
          </DarkModeToggleButton>
          <Router />
          <ReactQueryDevtools initialIsOpen={true} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
