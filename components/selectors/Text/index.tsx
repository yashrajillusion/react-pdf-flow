import { useNode, useEditor } from "@craftjs/core";
import React from "react";
import ContentEditable from "react-contenteditable";
import ControlPanel from "components/editor/Viewport/Sidebar/ControlPanel";
import { CSSProperties } from "styled-components";

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
  position: CSSProperties["position"];
  positionUnit: string;
  positionOffset: string[];
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
  position,
  positionOffset = [],
  positionUnit,
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
    positionUnit: "px",
    padding: ["0", "0", "0", "0"],
    positionOffset: [],
    shadow: 0,
    text: "Text",
    borderRadius: [],
  },
  related: {
    toolbar: ControlPanel,
  },
};
