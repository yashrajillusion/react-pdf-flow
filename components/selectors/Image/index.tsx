import React from "react";
import { useNode } from "@craftjs/core";
import ControlPanel from "components/editor/Viewport/Sidebar/ControlPanel";
import { CSSProperties } from "styled-components";

interface ImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  margin: string[];
  padding: string[];
  marginUnit: string;
  paddingUnit: string;
  borderColor: string;
  border: string;
  borderStyle: string;
  borderRadius: string[];
  position: CSSProperties["position"];
  positionUnit: string;
  positionOffset: string[];
  customCss: Object;
  flexGrow: string;
  flexShrink: string;
  flexBasis: string;
}

export const ImageComp = ({
  src,
  alt,
  width,
  height,
  objectFit,
  margin,
  padding,
  marginUnit,
  paddingUnit,
  borderColor,
  border,
  borderStyle,
  borderRadius,
  position,
  positionOffset = [],
  positionUnit,
  flexGrow,
  flexShrink,
  flexBasis,
  customCss = {},
}: Partial<ImageProps>) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));
  return (
    <img
      ref={(dom) => {
        connect(dom);
      }}
      src={src}
      alt={alt}
      style={{
        flexGrow,
        flexShrink,
        flexBasis,
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        objectFit,
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
      className="w-full h-full"
    />
  );
};

ImageComp.craft = {
  displayName: "Image",
  props: {
    src: "https://dummyimage.com/300X200/a6a6a6/000000",
    alt: "Image",
    width: "300",
    height: "200",
    objectFit: "cover",
    marginUnit: "px",
    paddingUnit: "px",
    positionUnit: "px",
    padding: ["0", "0", "0", "0"],
    margin: [0, 0, 0, 0],
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
