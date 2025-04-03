import { useNode } from "@craftjs/core";
import ControlPanel from "components/editor/Viewport/Sidebar/ControlPanel";
import { CSSProperties } from "styled-components";

export type LinkProps = {
  fontSize: string;
  textAlign: CanvasTextAlign;
  fontWeight: string;
  color: string;
  shadow: number;
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
};

export const Link = ({
  fontSize,
  textAlign,
  fontWeight,
  color,
  shadow,
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
        margin: `${margin[0]}${marginUnit} ${margin[1]}${marginUnit} ${margin[2]}${marginUnit} ${margin[3]}${marginUnit}`,
        padding: `${padding[0]}${paddingUnit} ${padding[1]}${paddingUnit} ${padding[2]}${paddingUnit} ${padding[3]}${paddingUnit}`,
        color,
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor,
        textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
        fontFamily,
        fontSize,
        fontWeight,
        fontStyle,
        lineHeight: `${lineHeight}%`,
        textAlign,
        textTransform,
        letterSpacing,
        wordSpacing,
        textDecoration,
        border: `${border}px ${borderStyle} ${borderColor}`,
        borderRadius: `${borderRadius[0]}px ${borderRadius[1]}px ${borderRadius[2]}px ${borderRadius[3]}px`,
        opacity,
        backgroundRepeat,
        backgroundSize,
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
    padding: ["0", "0", "0", "0"],
    text: "Text",
    borderRadius: [],
  },
  rules: {
    canDrag: () => true,
    canResize: true,
  },
  related: {
    toolbar: ControlPanel,
  },
};
