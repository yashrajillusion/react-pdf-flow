import {
  Document,
  Page,
  View,
  Text,
  Image,
  Link,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

const mapPropsToStyle = (props: any) => {
  const style: Record<string, any> = {};

  const pxToPt = (px) => (px * 72) / 96;

  function assignSpacing(
    value: string | number | undefined,
    setter: (v: string | number) => void
  ) {
    if (value !== undefined && value !== "" && value !== "0" && value !== 0) {
      setter(pxToPt(value));
    }
  }

  // Dimension
  if (props.height) style.height = pxToPt(props.height);
  if (props.width) style.width = pxToPt(props.width);

  if (props.maxHeight) style.maxHeight = pxToPt(props.maxHeight);
  if (props.maxWidth) style.maxWidth = pxToPt(props.maxWidth);

  if (props.minHeight) style.minHeight = pxToPt(props.minHeight);
  if (props.minWidth) style.minWidth = pxToPt(props.minWidth);

  // Margin
  assignSpacing(props.margin?.[0], (v) => (style.marginTop = v));
  assignSpacing(props.margin?.[1], (v) => (style.marginRight = v));
  assignSpacing(props.margin?.[2], (v) => (style.marginBottom = v));
  assignSpacing(props.margin?.[3], (v) => (style.marginLeft = v));

  // Padding
  assignSpacing(props.padding?.[0], (v) => (style.paddingTop = v));
  assignSpacing(props.padding?.[1], (v) => (style.paddingRight = v));
  assignSpacing(props.padding?.[2], (v) => (style.paddingBottom = v));
  assignSpacing(props.padding?.[3], (v) => (style.paddingLeft = v));

  // ----- Display -----
  if (props.display) {
    style.display = props.display;
  }

  // ----- Flex -----
  if (props.flexDirection) {
    style.flexDirection = props.flexDirection;
  }
  if (props.alignItems) {
    style.alignItems = props.alignItems;
  }
  if (props.justifyContent) {
    style.justifyContent = props.justifyContent;
  }

  if (props.flexShrink !== undefined) {
    style.flexShrink = props.flexShrink;
  }
  if (props.flexGrow !== undefined) {
    style.flexGrow = props.flexGrow;
  }
  if (props.flexBasis) {
    style.flexBasis = props.flexBasis;
  }

  if (props.position && props.position !== "static") {
    style.position = props.position;
    const positionOffset = props.positionOffset ?? ["", "", "", ""];

    const lineHeightOffset =
      props.fontSize && props.lineHeight
        ? pxToPt(props.fontSize) * (props.lineHeight / 100)
        : 0;

    if (positionOffset[0])
      style.top = pxToPt(positionOffset[0]) + lineHeightOffset;
    if (positionOffset[1]) style.right = pxToPt(positionOffset[1]);
    if (positionOffset[2])
      style.bottom = pxToPt(positionOffset[2]) + lineHeightOffset;
    if (positionOffset[3]) style.left = pxToPt(positionOffset[3]);
  }

  // Color
  if (props.backgroundColor) style.backgroundColor = props.backgroundColor;
  if (props.color) style.color = props.color;
  if (props.opacity) style.opacity = props.opacity;

  //Sizing/Positioning
  if (props.objectFit) style.objectFit = props.objectFit;
  if (props.objectPosition) style.objectPosition = props.objectPosition;

  // Typography
  if (props.fontSize) style.fontSize = pxToPt(props.fontSize);
  if (props.fontFamily) style.fontFamily = props.fontFamily;
  if (props.fontStyle) style.fontStyle = props.fontStyle;
  if (props.fontWeight) style.fontWeight = props.fontWeight;
  if (props.letterSpacing) style.letterSpacing = props.letterSpacing;
  if (props.lineHeight) {
    style.lineHeight = pxToPt(props.fontSize) * (+props.lineHeight / 100);
  }
  if (props.textAlign) style.textAlign = props.textAlign;
  if (props.textDecoration) style.textDecoration = props.textDecoration;
  if (props.textDecorationColor)
    style.textDecorationColor = props.textDecorationColor;
  if (props.textDecorationStyle)
    style.textDecorationStyle = props.textDecorationStyle;
  if (props.textIndent) style.textIndent = props.textIndent;
  if (props.textOverflow) style.textOverflow = props.textOverflow;
  if (props.textTransform) style.textTransform = props.textTransform;
  if (props.maxLines) style.maxLines = props.maxLines;

  // Border
  if (props.borderRadius) {
    if (props.borderRadius[0])
      style.borderTopLeftRadius = props.borderRadius[0];
    if (props.borderRadius[1])
      style.borderTopRightRadius = props.borderRadius[1];
    if (props.borderRadius[2])
      style.borderBottomRightRadius = props.borderRadius[2];
    if (props.borderRadius[3])
      style.borderBottomLeftRadius = props.borderRadius[3];
  }

  // Border Width
  if (props.border) style.borderWidth = pxToPt(props.border);
  if (props.borderTop) style.borderTopWidth = props.borderTop;
  if (props.borderTopWidth) style.borderTopWidth = props.borderTopWidth;
  if (props.borderRight) style.borderRightWidth = props.borderRight;
  if (props.borderRightWidth) style.borderRightWidth = props.borderRightWidth;
  if (props.borderBottom) style.borderBottomWidth = props.borderBottom;
  if (props.borderBottomWidth)
    style.borderBottomWidth = props.borderBottomWidth;
  if (props.borderLeft) style.borderLeftWidth = props.borderLeft;
  if (props.borderLeftWidth) style.borderLeftWidth = props.borderLeftWidth;

  // Border Style
  if (props.borderStyle) style.borderStyle = props.borderStyle;
  if (props.borderTopStyle) style.borderTopStyle = props.borderTopStyle;
  if (props.borderRightStyle) style.borderRightStyle = props.borderRightStyle;
  if (props.borderBottomStyle)
    style.borderBottomStyle = props.borderBottomStyle;
  if (props.borderLeftStyle) style.borderLeftStyle = props.borderLeftStyle;

  // Border Color
  if (props.borderColor) style.borderColor = props.borderColor;
  if (props.borderTopColor) style.borderTopColor = props.borderTopColor;
  if (props.borderRightColor) style.borderRightColor = props.borderRightColor;
  if (props.borderBottomColor)
    style.borderBottomColor = props.borderBottomColor;
  if (props.borderLeftColor) style.borderLeftColor = props.borderLeftColor;

  return StyleSheet.create({ style });
};

const renderNode = (nodeId: string, data: any) => {
  const node = data[nodeId];
  if (!node) return null;

  const { type, props, nodes } = node;
  const componentType = type.resolvedName;

  const styles = mapPropsToStyle(props);

  switch (componentType) {
    case "Container":
      return (
        <View key={nodeId} style={styles.style}>
          {nodes.map((childId: string) => renderNode(childId, data))}
        </View>
      );

    case "Text":
      return (
        <Text key={nodeId} style={styles.style}>
          {props.text}
        </Text>
      );

    case "ImageComp":
      return <Image key={nodeId} src={props.src} style={styles.style} />;

    case "Link":
      return (
        <Link key={nodeId} src={props.href} style={styles.style}>
          {props.text}
        </Link>
      );

    default:
      return (
        <Text key={nodeId} style={{ color: "red" }}>
          Unknown component: {componentType}
        </Text>
      );
  }
};

// 🎉 Main Dynamic PDF component
const DynamicPDF = ({ data }: { data: any }) => {
  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4">{renderNode("ROOT", data)}</Page>
      </Document>
    </PDFViewer>
  );
};

export default DynamicPDF;
