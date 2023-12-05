import styled from "styled-components"

export const ScrollbarWrapper = styled.div(() => ({
  width: "100%",
  height: "450px",
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    width: "8px",
  },
  "::-webkit-scrollbar-track": {
      boxShadow: "nset 0 0 6px grey",
      borderRadius: "5px"
  },
  "::-webkit-scrollbar-thumb": {
      background: "var(--bg-blue-color)",
      borderRadius: "15px",
      height: "2px"
  },
  "::-webkit-scrollbar-thumb:hover": {
      background: "var(--bg-blue-color)",
      maxHeight: "10px"
  },
  "::-webkit-scrollbar-button:vertical:start:decrement": {
      background: `url(${process.env.PUBLIC_URL}/static/icons/arrow-example.png) no-repeat center center`,
      display: "block",
      backgroundSize: "10px"
  },
  "::-webkit-scrollbar-button:vertical:end:increment": {
      display: "block",
      background: `url(${process.env.PUBLIC_URL}/static/icons/arrow-example.png) no-repeat center center`,
      backgroundSize: "10px"
  },
}))
