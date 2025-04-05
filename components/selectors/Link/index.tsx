import { useNode } from "@craftjs/core";
import ControlPanel from "components/editor/Viewport/Sidebar/ControlPanel";
import { CSSProperties } from "styled-components";

export type LinkProps = {
  href: string;
  fontSize: string;
  textAlign: CanvasTextAlign;
  fontWeight: string;
  color: string;
  text: string;
  margin: [string, string, string, string];
  padding: [string, string, string, string];
  width?: string;
  height?: string;
  marginUnit: string;
  paddingUnit: string;
  heightUnit: string;
  widthUnit: string;
  fontFamily: string;
  fontStyle: string;
  lineHeight: string;
  textTransform: CSSProperties["textTransform"];
  letterSpacing: string;
  wordSpacing: string;
  textDecoration: string;
  backgroundColor: string;
  borderColor: string;
  border: string;
  borderStyle: string;
  borderRadius: string[];
  opacity: number;
  customCss: Object;
  backgroundImage: string;
  backgroundRepeat: string;
  backgroundSize: string;
  position: CSSProperties["position"];
  positionUnit: string;
  positionOffset: string[];
};

export const Link = ({
  fontSize,
  textAlign,
  fontWeight,
  color,
  text,
  margin,
  padding,
  width,
  height,
  marginUnit,
  paddingUnit,
  heightUnit,
  widthUnit,
  fontFamily,
  fontStyle,
  lineHeight,
  textTransform,
  letterSpacing,
  wordSpacing,
  textDecoration,
  backgroundColor,
  borderColor,
  border,
  borderStyle,
  borderRadius = [],
  opacity,
  backgroundImage,
  customCss = {},
  backgroundRepeat,
  backgroundSize,
  position,
  positionOffset = [],
  positionUnit,
}: Partial<LinkProps>) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <a
      ref={(dom) => {
        connect(dom);
      }}
      style={{
        width: width ? `${width}${widthUnit}` : "auto",
        height: height ? `${height}${heightUnit}` : "auto",
        margin: margin
          ? `${margin[0] || 0}${marginUnit} ${margin[1] || 0}${marginUnit} ${
              margin[2] || 0
            }${marginUnit} ${margin[3] || 0}${marginUnit}`
          : undefined,
        padding: padding
          ? `${padding[0] || 0}${paddingUnit} ${
              padding[1] || 0
            }${paddingUnit} ${padding[2] || 0}${paddingUnit} ${
              padding[3] || 0
            }${paddingUnit}`
          : undefined,
        color,
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundColor,
        fontFamily,
        fontSize: `${fontSize}px`,
        fontWeight,
        fontStyle,
        lineHeight: lineHeight ? `${lineHeight}%` : undefined,
        textAlign,
        textTransform,
        letterSpacing,
        wordSpacing,
        textDecoration,
        border: border
          ? `${border}px ${borderStyle} ${borderColor}`
          : undefined,
        borderRadius: borderRadius
          ? `${borderRadius[0] || 0}px ${borderRadius[1] || 0}px ${
              borderRadius[2] || 0
            }px ${borderRadius[3] || 0}px`
          : undefined,
        opacity,
        backgroundRepeat,
        backgroundSize,
        position,
        left:
          positionOffset && positionOffset[3]
            ? `${positionOffset[3]}${positionUnit}`
            : undefined,
        top:
          positionOffset && positionOffset[0]
            ? `${positionOffset[0]}${positionUnit}`
            : undefined,
        right:
          positionOffset && positionOffset[1]
            ? `${positionOffset[1]}${positionUnit}`
            : undefined,
        bottom:
          positionOffset && positionOffset[2]
            ? `${positionOffset[2]}${positionUnit}`
            : undefined,
        ...customCss,
      }}
    >
      {text}{" "}
    </a>
  );
};

Link.craft = {
  displayName: "Link",
  props: {
    color: "#0000EE",
    textDecoration: "underline",
    textAlign: "left",
    margin: [0, 0, 0, 0],
    marginUnit: "px",
    paddingUnit: "px",
    heightUnit: "px",
    widthUnit: "px",
    positionUnit: "px",
    padding: ["0", "0", "0", "0"],
    text: "Text",
    borderRadius: [],
    positionOffset: [],
  },
  rules: {
    canDrag: () => true,
    canResize: true,
  },
  related: {
    toolbar: ControlPanel,
  },
};
