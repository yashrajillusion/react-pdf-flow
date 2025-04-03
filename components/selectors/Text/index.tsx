import { useNode, useEditor } from "@craftjs/core";
import React from "react";
import ContentEditable from "react-contenteditable";
import ControlPanel from "components/editor/Viewport/Sidebar/ControlPanel";

export type TextProps = {
  fontSize: string;
  textAlign: string;
  fontWeight: string;
  color: string;
  text: string;
  margin: string[];
  padding: string[];
  width?: string;
  height?: string;
  marginUnit: string;
  paddingUnit: string;
  heightUnit: string;
  widthUnit: string;
  fontFamily: string;
  fontStyle: string;
  lineHeight: string;
  textTransform: string;
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

export const Text = ({
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
}: Partial<TextProps>) => {
  const {
    connectors: { connect },
    setProp,
  } = useNode();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <ContentEditable
      innerRef={connect}
      html={text}
      disabled={!enabled}
      onChange={(e) => {
        setProp((prop) => (prop.text = e.target.value), 500);
      }}
      tagName="p"
      style={{
        width: width ? `${width}${widthUnit}` : "auto",
        height: height ? `${height}${heightUnit}` : "auto",
        margin: `${margin[0]}${marginUnit} ${margin[1]}${marginUnit} ${margin[2]}${marginUnit} ${margin[3]}${marginUnit}`,
        padding: `${padding[0]}${paddingUnit} ${padding[1]}${paddingUnit} ${padding[2]}${paddingUnit} ${padding[3]}${paddingUnit}`,
        color,
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor,
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
    />
  );
};

Text.craft = {
  displayName: "Text",
  props: {
    textAlign: "left",
    fontWeight: "500",
    color: "#5c5a5a",
    margin: [0, 0, 0, 0],
    marginUnit: "px",
    paddingUnit: "px",
    heightUnit: "px",
    widthUnit: "px",
    padding: ["0", "0", "0", "0"],
    shadow: 0,
    text: "Text",
    borderRadius: [],
  },
  related: {
    toolbar: ControlPanel,
  },
};
