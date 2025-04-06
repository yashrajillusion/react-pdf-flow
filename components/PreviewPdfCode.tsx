import { GenerateFullReactPdfCode } from "components/generatepdfcode";
import { Check, Copy, Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { formatJsx } from "utils/codeFormatter";

const PreviewPdfCode = () => {
  const [isClient, setIsClient] = useState(false);
  const [style, setStyle] = useState(null);
  const [formattedCode, setFormattedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([formattedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "react-pdf-flow.jsx";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  useEffect(() => {
    setIsClient(true);
    import("react-syntax-highlighter/dist/cjs/styles/prism/atom-dark").then(
      (module) => setStyle(module.default)
    );
    setFormattedCode(formatJsx(GenerateFullReactPdfCode()));
  }, []);

  if (!isClient || !style) {
    return null;
  }

  return (
    <div className="fixed top-11 h-screen w-full bg-[#1d1f21]">
      <div className="absolute right-7 top-4 flex flex-col gap-4">
        <button onClick={handleCopy}>
          {copied ? (
            <Check color="white" className="h-6 w-6" />
          ) : (
            <Copy color="white" className="h-6 w-6" />
          )}
        </button>
        <button onClick={handleDownload}>
          <Download color="white" className="h-6 w-6" />
        </button>
      </div>
      <SyntaxHighlighter
        language="jsx"
        showLineNumbers={true}
        wrapLines={true}
        style={style}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          height: "100%",
          fontSize: "14px",
          paddingBottom: "4rem",
        }}
      >
        {formattedCode}
      </SyntaxHighlighter>
    </div>
  );
};
export default PreviewPdfCode;
