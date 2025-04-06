import { mapPropsToStyle } from "./pdfrender";

function styleObjectToString(styleObj) {
  return `style={{${Object.entries(styleObj.style)
    .map(([key, value]) => {
      return `${key}: ${`"${value}"`}`;
    })
    .join(", ")}}}`;
}

function generateJSXFromNode(nodeId, nodesMap) {
  const node = nodesMap[nodeId];
  if (!node) return "";

  const { type, props, nodes: childNodeIds = [] } = node;
  const resolvedName = type.resolvedName;

  const styleString = styleObjectToString(mapPropsToStyle(props));

  // Generate children
  const childrenJSX = (childNodeIds || [])
    .map((childId) => generateJSXFromNode(childId, nodesMap))
    .join("\n");

  switch (resolvedName) {
    case "Text":
      return `<Text ${styleString}>${props.text || ""}</Text>`;

    case "Container":
      return `<View ${styleString}>
        ${childrenJSX}
      </View>`;

    case "ImageComp":
      return `<Image ${styleString} src="${props.src}" alt="${
        props.alt || ""
      }" />`;

    case "Link":
      return `<Link ${styleString} src="${props.href || ""}">
        ${props.text || ""}
      </Link>`;

    default:
      return "";
  }
}

export function GenerateFullReactPdfCode() {
  const savedState = JSON.parse(localStorage.getItem("pdf_flow_state"));

  const body = generateJSXFromNode("ROOT", savedState);

  return `
import { Document, Page, Text, View, Image, Link } from '@react-pdf/renderer';

const MyDocument = () => {

  const pxToPt = (px) => (px * 72) / 96;

  return <Document>
    <Page size="A4">
      ${body}
    </Page>
  </Document>
};

export default MyDocument;
`.trim();
}
