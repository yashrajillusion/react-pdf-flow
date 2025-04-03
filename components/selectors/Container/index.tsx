import React from "react";
import { Resizer } from "../Resizer";
import ControlPanel from "components/editor/Viewport/Sidebar/ControlPanel";

export type ContainerProps = {
  fontSize: string;
  textAlign: string;
  fontWeight: string;
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
  color: string;
  opacity: number;
  customCss: Object;
  backgroundImage: string;
  backgroundRepeat: string;
  backgroundSize: string;
  flexDirection: string;
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
  position: string;
  positionUnit: string;
  positionOffset: string[];
};

const defaultProps = {
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  display: "block",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: ["0", "0", "0", "0"],
  margin: ["0", "0", "0", "0"],
  shadow: 0,
  width: "100%",
  height: "auto",
  positionOffset: ["0", "0", "0", "0"],
  borderRadius: [],
};

export const Container = (props: Partial<ContainerProps>) => {
  props = {
    ...defaultProps,
    ...props,
  };
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
  } = props;
  return (
    <Resizer
      propKey={{ width: "width", height: "height" }}
      style={{
        fontSize,
        textAlign,
        fontWeight,
        fontFamily,
        fontStyle,
        lineHeight: `${lineHeight}%`,
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
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor,
        color,
        width: width ? `${width}${widthUnit}` : "auto",
        height: height ? `${height}${heightUnit}` : "auto",
        margin: `${margin[0]}${marginUnit} ${margin[1]}${marginUnit} ${margin[2]}${marginUnit} ${margin[3]}${marginUnit}`,
        padding: `${padding[0]}${paddingUnit} ${padding[1]}${paddingUnit} ${padding[2]}${paddingUnit} ${padding[3]}${paddingUnit}`,
        border: `${border}px ${borderStyle} ${borderColor}`,
        borderRadius: `${borderRadius[0]}px ${borderRadius[1]}px ${borderRadius[2]}px ${borderRadius[3]}px`,
        opacity,
        backgroundRepeat,
        backgroundSize,
        ...customCss,
      }}
    >
      {children}
    </Resizer>
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
