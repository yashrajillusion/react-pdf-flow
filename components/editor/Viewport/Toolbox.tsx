import { Element, useEditor } from "@craftjs/core";
import React from "react";
import { styled } from "styled-components";
import { Container } from "../../selectors/Container";
import { Text } from "../../selectors/Text";
import { Image, LinkIcon, Square, TextIcon, Type } from "lucide-react";
import { ImageComp } from "components/selectors";
import { Link } from "components/selectors/Link";

const ToolboxDiv = styled.div<{ $enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.$enabled ? `width: 0;` : "")}
  ${(props) => (!props.$enabled ? `display: none;` : "")}
  padding: 1rem;
`;

const Item = styled.a<{ $move?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    width: 28px;
    height: 28px;
    fill: #707070;
  }
  ${(props) =>
    props.$move &&
    `
    cursor: move;
  `}
`;

export const Toolbox = () => {
  const {
    enabled,
    connectors: { create },
  } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <ToolboxDiv
      $enabled={enabled && enabled}
      className="toolbox transition h-full flex flex-col bg-bgprimary"
    >
      <p className="text-white text-sm font-sans mb-2">Elements</p>
      <div className="flex gap-2 columns-2 cursor-move">
        <div
          ref={(ref) => {
            create(
              ref,
              <Text fontSize="12px" textAlign="left" text="Hi there" />
            );
          }}
          className="flex flex-col w-20 items-center gap-1 bg-color800 rounded-md px-4 py-2"
        >
          <Type color="#9ba5b7" />
          <p className="text-color700 text-sm font-sans">Text</p>
        </div>
        <div
          ref={(ref) => {
            create(
              ref,
              <Element
                canvas
                is={Container }
                height="300"
                width="300"
              ></Element>
            );
          }}
          className="flex flex-col w-20 items-center gap-1 bg-color800 rounded-md px-4 py-2"
        >
          <Square color="#9ba5b7" />
          <p className="text-color700 text-sm font-sans">Box</p>
        </div>
      </div>
      <div className="flex gap-2 columns-2 mt-2 cursor-move">
        <div
          ref={(ref) => {
            create(ref, <Link />);
          }}
          className="flex flex-col w-20 items-center gap-1 bg-color800 rounded-md px-4 py-2"
        >
          <LinkIcon color="#9ba5b7" />
          <p className="text-color700 text-sm font-sans">Link</p>
        </div>
        <div
          ref={(ref) => {
            create(ref, <ImageComp />);
          }}
          className="flex flex-col w-20 items-center gap-1 bg-color800 rounded-md px-4 py-2"
        >
          <Image color="#9ba5b7" />
          <p className="text-color700 text-sm font-sans">Image</p>
        </div>
      </div>
      <div className="border-t border-[#353c44] mt-6 ">
        <p className="mt-2 text-white">Layout Tree</p>
      </div>
    </ToolboxDiv>
  );
};
