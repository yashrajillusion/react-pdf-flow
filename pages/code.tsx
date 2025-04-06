import { GenerateFullReactPdfCode } from "components/generatepdfcode";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const PdfCodeBlock = () => {
  const [isClient, setIsClient] = useState(false);
  const [style, setStyle] = useState(null);

  useEffect(() => {
    setIsClient(true);
    import("react-syntax-highlighter/dist/cjs/styles/prism/atom-dark").then(
      (module) => setStyle(module.default)
    );
  }, []);

  if (!isClient || !style) {
    return null;
  }

  return (
    <SyntaxHighlighter
      language="jsx"
      showLineNumbers={true}
      wrapLines={true}
      style={style}
      customStyle={{ height: "100vh" }}
    >
      {GenerateFullReactPdfCode()}
    </SyntaxHighlighter>
  );
};
export default PdfCodeBlock;
