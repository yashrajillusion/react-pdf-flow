import React from "react";
import ControlPanel from "components/editor/Viewport/Sidebar/ControlPanel";
import { CSSProperties } from "styled-components";
import { useNode } from "@craftjs/core";

export type ContainerProps = {
  fontSize: string;
  textAlign: CSSProperties["textAlign"];
  fontWeight: string;
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
  color: string;
  opacity: number;
  customCss: Object;
  backgroundImage: string;
  backgroundRepeat: string;
  backgroundSize: string;
  flexDirection: CSSProperties["flexDirection"];
  alignItems: string;
  justifyContent: string;
  width?: string;
  height?: string;
  padding: string[];
  margin: string[];
  marginUnit: string;
  paddingUnit: string;
  heightUnit: string;
  widthUnit: string;
  marginTop: number;
  marginLeft: number;
  marginBottom: number;
  marginRight: number;
  shadow: number;
  children: React.ReactNode;
  radius: number;
  flexGrow: string;
  flexShrink: string;
  flexBasis: string;
  display: string;
  position: CSSProperties["position"];
  positionUnit: string;
  positionOffset: string[];
};

const defaultProps = {
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  display: "block",
  padding: ["0", "0", "0", "0"],
  margin: ["0", "0", "0", "0"],
  marginUnit: "px",
  paddingUnit: "px",
  shadow: 0,
  heightUnit: "px",
  widthUnit: "px",
  positionUnit: "px",
  width: "100%",
  height: "auto",
positionOffset: [],
  borderRadius: [],
};

export const Container = (props: Partial<ContainerProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };

  const {
    connectors: { connect },
  } = useNode();

  const {
    fontSize,
    textAlign,
    fontWeight,
    fontFamily,
    fontStyle,
    lineHeight,
    textDecoration,
    wordSpacing,
    letterSpacing,
    textTransform,
    display,
    flexDirection,
    alignItems,
    justifyContent,
    flexGrow,
    flexShrink,
    flexBasis,
    backgroundColor,
    color,
    width,
    height,
    padding,
    margin,
    marginUnit,
    paddingUnit,
    heightUnit,
    widthUnit,
    borderRadius,
    borderColor,
    border,
    borderStyle,
    children,
    opacity,
    backgroundImage,
    customCss = {},
    backgroundRepeat,
    backgroundSize,
    position,
    positionOffset,
    positionUnit,
  } = props;
  return (
    <div
      ref={(dom) => {
        connect(dom);
      }}
      style={{
        fontSize: `${fontSize}px`,
        textAlign,
        fontWeight,
        fontFamily,
        fontStyle,
        lineHeight: lineHeight ? `${lineHeight}%` : undefined,
        textDecoration,
        wordSpacing,
        letterSpacing,
        textTransform,
        display,
        justifyContent,
        flexDirection,
        alignItems,
        flexGrow,
        flexShrink,
        flexBasis,
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundColor,
        color,
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
      {children}
    </div>
  );
};

Container.craft = {
  displayName: "Container",
  props: defaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    toolbar: ControlPanel,
  },
};
