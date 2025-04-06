import { Editor, Frame, Element } from "@craftjs/core";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

import { Viewport, RenderNode } from "../components/editor";
import { Container, Text } from "../components/selectors";
import { ImageComp } from "components/selectors/Image";
import { Link } from "components/selectors/Link";

const theme = createTheme({
  typography: {
    fontFamily: [
      "acumin-pro",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="h-full h-screen">
        <Editor
          resolver={{
            Container,
            Text,
            ImageComp,
            Link,
          }}
          enabled={false}
          onRender={RenderNode}
        >
          <Viewport>
            <Frame>
              <Element
                canvas
                is={Container}
                width="794"
                height="1122"
                backgroundColor={"#FFFFFF"}
                display="flex"
                flexDirection="column"
                custom={{ displayName: "App" }}
              ></Element>
            </Frame>
          </Viewport>
        </Editor>
      </div>
    </ThemeProvider>
  );
}

export default App;
