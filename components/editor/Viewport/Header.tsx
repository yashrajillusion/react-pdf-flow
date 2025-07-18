import { useEditor } from "@craftjs/core";
import { Tooltip } from "@mui/material";
import { styled } from "styled-components";
import RedoSvg from "../../../public/icons/toolbox/redo.svg";
import UndoSvg from "../../../public/icons/toolbox/undo.svg";
import {
  Code2,
  Edit,
  MinusIcon,
  Play,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";

const HeaderDiv = styled.div`
  width: 100%;
  height: 45px;
  z-index: 99999;
  position: relative;
  padding: 0px 10px;
  display: flex;
`;

const Item = styled.a<{ disabled?: boolean }>`
  margin-right: 10px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: #9ba5b7;
  }
  ${(props) =>
    props.disabled &&
    `
    opacity:0.5;
    cursor: not-allowed;
  `}
`;

export const Header = ({ setZoomLevel, zoomLevel, setShowCode, showCode }) => {
  const { enabled, canUndo, canRedo, actions } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));

  const handleZoomIn = () => {
    setZoomLevel((prev: number) => prev + 10);
  };

  const handleZoomOut = () => {
    setZoomLevel((prev: number) => prev - 10);
  };

  return (
    <HeaderDiv className="header bg-bgprimary text-white transition w-full">
      <div className="items-center flex w-full px-4">
        {enabled && (
          <div className="flex-1 flex">
            <Tooltip title="Undo" placement="bottom">
              <Item disabled={!canUndo} onClick={() => actions.history.undo()}>
                <UndoSvg />
              </Item>
            </Tooltip>
            <Tooltip title="Redo" placement="bottom">
              <Item disabled={!canRedo} onClick={() => actions.history.redo()}>
                <RedoSvg />
              </Item>
            </Tooltip>
          </div>
        )}
        <div className="flex gap-2 bg-color800 p-2 rounded-xl">
          <MinusIcon onClick={handleZoomOut} className="cursor-pointer" />
          <p className="font-semibold">{zoomLevel}%</p>
          <PlusIcon onClick={handleZoomIn} className="cursor-pointer" />
        </div>
        <Link
          href={"/preview"}
          target="_blank"
          className="flex gap-2 bg-color800 p-2 rounded-xl cursor-pointer ml-2"
        >
          <Play />
        </Link>
        <div
          onClick={() => {
            setShowCode((prev) => !prev);
            actions.selectNode(null);
          }}
          className="flex gap-2 bg-color800 p-2 rounded-xl cursor-pointer ml-2"
        >
          {showCode ? <Edit /> : <Code2 />}
        </div>
      </div>
    </HeaderDiv>
  );
};
