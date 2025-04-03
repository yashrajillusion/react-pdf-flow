import React from "react";
import { Resizable } from "re-resizable";
import { useNode } from "@craftjs/core";
import ControlPanel from "components/editor/Viewport/Sidebar/ControlPanel";

interface ImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  margin: [string, string, string, string];
  padding: [string, string, string, string];
  marginUnit: string;
  paddingUnit: string;
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
}: Partial<ImageProps>) => {
  const {
    connectors: { connect },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));
  return (
    <Resizable>
      <img
        ref={(dom) => {
          connect(dom);
        }}
        src={src}
        alt={alt}
        style={{
          width: width ? `${width}px` : "",
          height: height ? `${height}px` : "",
          objectFit,
          margin: `${margin[0]}${marginUnit} ${margin[1]}${marginUnit} ${margin[2]}${marginUnit} ${margin[3]}${marginUnit}`,
          padding: `${padding[0]}${paddingUnit} ${padding[1]}${paddingUnit} ${padding[2]}${paddingUnit} ${padding[3]}${paddingUnit}`,
        }}
        className="w-full h-full"
      />
    </Resizable>
  );
};

ImageComp.craft = {
  props: {
    src: "https://dummyimage.com/300X200/a6a6a6/000000",
    alt: "Image",
    width: "300",
    height: "200",
    objectFit: "cover",
    marginUnit: "px",
    paddingUnit: "px",
    padding: ["0", "0", "0", "0"],
    margin: [0, 0, 0, 0],
  },
  rules: {
    canDrag: () => true,
    canResize: true,
  },
  related: {
    toolbar: ControlPanel,
  },
};
