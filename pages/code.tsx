import { GenerateFullReactPdfCode } from "components/generatepdfcode";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const PdfCodeBlock = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <SyntaxHighlighter
      language="jsx"
      showLineNumbers={true}
      wrapLines={true}
      wrapLongLines={true}
    >
      {GenerateFullReactPdfCode()}
    </SyntaxHighlighter>
  );
};
export default PdfCodeBlock;
