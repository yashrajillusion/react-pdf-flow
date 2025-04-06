import React, { useEffect, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Box,
  Layout,
  Palette,
  Type,
  X,
  Bold,
  Italic,
  Underline,
  Link2,
  Image,
} from "lucide-react";
import { useNode } from "@craftjs/core";

const InputGroup = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="text-xs font-medium opacity-80">{label}</label>
    {children}
  </div>
);

// Update Input component to handle number inputs better
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={`h-8 px-2 rounded-md bg-[#1c2428] text-[#9ba5b7] border border-gray-700/50 
      focus:border-blue-500/50 focus:outline-none transition-colors text-sm
      ${
        type === "number"
          ? "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          : ""
      }
      ${className}`}
    {...props}
  />
));

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={`h-8 px-2 rounded-md bg-[#1c2428] text-[#9ba5b7] border border-gray-700/50 
      focus:border-blue-500/50 focus:outline-none transition-colors ${className}`}
    {...props}
  >
    {children}
  </select>
));

const ColorInput = ({
  label,
  onChange,
  value,
}: {
  label: string;
  value: string;
  onChange: (e) => void;
}) => (
  <InputGroup label={label}>
    <div className="flex gap-2">
      <div className="relative">
        <input
          value={value}
          onChange={onChange}
          type="color"
          className="w-8 h-8 p-1 rounded-md cursor-pointer"
        />
        <div className="absolute inset-0 rounded-md pointer-events-none border border-gray-700/50" />
      </div>
      <Input value={value} onChange={onChange} className="w-full font-mono" />
    </div>
  </InputGroup>
);

const ToolbarButton = ({ icon: Icon, isActive, onClick }: any) => (
  <button
    onClick={onClick}
    className={`p-1.5 rounded-md transition-colors ${
      isActive ? "bg-blue-500/20 text-blue-400" : "hover:bg-[#1c2428]"
    }`}
  >
    <Icon size={16} />
  </button>
);

const TypographyPanel = () => {
  const {
    actions: { setProp },
    node,
  } = useNode((node) => ({
    node: node.data.props,
  }));

  const handleNodeUpdate = (key: string, value: string | number) => {
    setProp((props: any) => {
      props[key] = value;
    }, 500);
  };

  const [showLinkControls, setShowLinkControls] = useState(false);

  const textAlignList = [
    {
      textAlign: "left",
      icon: AlignLeft,
    },
    {
      textAlign: "center",
      icon: AlignCenter,
    },
    {
      textAlign: "right",
      icon: AlignRight,
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <section className="space-y-4">
        <h3 className="text-xs font-medium uppercase tracking-wider opacity-50">
          Text
        </h3>

        <div className="flex gap-1 p-1 bg-[#1c2428] rounded-md items-center">
          <ToolbarButton
            isActive={node.fontWeight === "bold"}
            onClick={() => {
              if (node.fontWeight === "bold") {
                handleNodeUpdate("fontWeight", "normal");
              } else {
                handleNodeUpdate("fontWeight", "bold");
              }
            }}
            icon={Bold}
          />
          <ToolbarButton
            isActive={node.fontStyle === "italic"}
            onClick={() => {
              if (node.fontStyle === "italic") {
                handleNodeUpdate("fontStyle", "normal");
              } else {
                handleNodeUpdate("fontStyle", "italic");
              }
            }}
            icon={Italic}
          />
          <ToolbarButton
            isActive={node.textDecoration === "underline"}
            onClick={() => {
              if (node.textDecoration === "underline") {
                handleNodeUpdate("textDecoration", "none");
              } else {
                handleNodeUpdate("textDecoration", "underline");
              }
            }}
            icon={Underline}
          />
          <div className="w-px h-4 bg-gray-700/50 mx-1" />
          {textAlignList.map((el) => (
            <ToolbarButton
              key={el.textAlign}
              isActive={node.textAlign === el.textAlign}
              onClick={() => {
                if (node.textAlign === el.textAlign) {
                  handleNodeUpdate("textAlign", "left");
                } else {
                  handleNodeUpdate("textAlign", el.textAlign);
                }
              }}
              icon={AlignLeft}
            />
          ))}

          <div className="w-px h-4 bg-gray-700/50 mx-1" />
          <ToolbarButton
            icon={Link2}
            isActive={showLinkControls}
            onClick={() => setShowLinkControls(!showLinkControls)}
          />
        </div>

        {showLinkControls && (
          <div className="space-y-4 p-3 bg-[#1c2428]/30 rounded-lg border border-gray-700/50">
            <InputGroup label="URL">
              <div className="flex gap-2">
                <Input
                  onChange={(e) => handleNodeUpdate("href", e.target.value)}
                  type="text"
                  className="w-full"
                  placeholder="example.com"
                />
              </div>
            </InputGroup>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <InputGroup label="Font Family">
            <Input
              value={node.fontFamily}
              onChange={(e) => handleNodeUpdate("fontFamily", e.target.value)}
              type="text"
              className="w-full"
            />
          </InputGroup>
          <InputGroup label="Font Weight">
            <Input
              value={node.fontWeight}
              onChange={(e) => handleNodeUpdate("fontWeight", e.target.value)}
              type="text"
              className="w-full"
            />
          </InputGroup>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InputGroup label="Font Size">
            <div className="flex gap-2">
              <Input
                value={node.fontSize}
                onChange={(e) => handleNodeUpdate("fontSize", e.target.value)}
                type="number"
                className="w-full"
              />
            </div>
          </InputGroup>
          <InputGroup label="Line Height">
            <div className="flex gap-2">
              <Input
                type="text"
                value={node.lineHeight}
                onChange={(e) => handleNodeUpdate("lineHeight", e.target.value)}
                className="w-full"
              />
              <Select className="w-20">
                <option>%</option>
              </Select>
            </div>
          </InputGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-medium uppercase tracking-wider opacity-50">
          Advanced
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <InputGroup label="Letter Spacing">
            <Input
              value={node.letterSpacing}
              onChange={(e) =>
                handleNodeUpdate("letterSpacing", e.target.value)
              }
              type="text"
              className="w-full"
            />
          </InputGroup>
          <InputGroup label="Word Spacing">
            <Input
              value={node.wordSpacing}
              onChange={(e) => handleNodeUpdate("wordSpacing", e.target.value)}
              type="text"
              className="w-full"
            />
          </InputGroup>
        </div>
        <InputGroup label="Text Transform">
          <Select
            onChange={(e) => handleNodeUpdate("textTransform", e.target.value)}
            value={node.textTransform}
            className="w-full"
          >
            <option value="none">None</option>
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="capitalize">Capitalize</option>
          </Select>
        </InputGroup>
      </section>
    </div>
  );
};

const StylePanel = () => {
  const {
    actions: { setProp },
    node,
  } = useNode((node) => ({
    node: node.data.props,
  }));

  const handleNodeUpdate = (key: string, value: any) => {
    setProp((props: any) => {
      props[key] = value;
    }, 500);
  };

  return (
    <div className="p-4 space-y-6">
      <section className="space-y-4">
        <h3 className="text-xs font-medium uppercase tracking-wider opacity-50">
          Colors & Background
        </h3>
        <div className="space-y-4 p-3 bg-[#1c2428]/30 rounded-lg border border-gray-700/50">
          {/* Colors */}
          <ColorInput
            value={node.color}
            onChange={(e) => handleNodeUpdate("color", e.target.value)}
            label="Text Color"
          />
          <ColorInput
            value={node.backgroundColor}
            onChange={(e) =>
              handleNodeUpdate("backgroundColor", e.target.value)
            }
            label="Background Color"
          />

          {/* Background Properties */}
          <div className="space-y-4 pt-2 border-t border-gray-700/50">
            <InputGroup label="Background Image">
              <div className="flex gap-2">
                <Input
                  value={node.backgroundImage}
                  onChange={(e) =>
                    handleNodeUpdate("backgroundImage", e.target.value)
                  }
                  type="text"
                  className="w-full"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </InputGroup>

            <div className="grid grid-cols-2 gap-3">
              <InputGroup label="Background Size">
                <Select
                  value={node.backgroundSize}
                  onChange={(e) =>
                    handleNodeUpdate("backgroundSize", e.target.value)
                  }
                  className="w-full"
                >
                  <option>______</option>
                  <option value="cover">Cover</option>
                  <option value="contain">Contain</option>
                  <option value="auto">Auto</option>
                  <option value="100% 100%">100% 100%</option>
                </Select>
              </InputGroup>

              <InputGroup label="Background Repeat">
                <Select
                  value={node.backgroundRepeat}
                  onChange={(e) =>
                    handleNodeUpdate("backgroundRepeat", e.target.value)
                  }
                  className="w-full"
                >
                  <option>______</option>
                  <option value="no-repeat">No Repeat</option>
                  <option value="repeat">Repeat</option>
                  <option value="repeat-x">Repeat X</option>
                  <option value="repeat-y">Repeat Y</option>
                </Select>
              </InputGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-medium uppercase tracking-wider opacity-50">
          Border
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <InputGroup label="Border Width">
            <Input
              value={node.border}
              onChange={(e) => handleNodeUpdate("border", e.target.value)}
              type="number"
              className="w-full"
            />
          </InputGroup>
          <InputGroup label="Border Style">
            <Select
              value={node.borderStyle}
              onChange={(e) => handleNodeUpdate("borderStyle", e.target.value)}
              className="w-full"
            >
              <option>_</option>
              <option value={"solid"}>Solid</option>
              <option value={"dashed"}>Dashed</option>
              <option value={"dotted"}>Dotted</option>
            </Select>
          </InputGroup>
        </div>
        <ColorInput
          value={node.borderColor ?? ""}
          onChange={(e) => handleNodeUpdate("borderColor", e.target.value)}
          label="Border Color"
        />
        <InputGroup label="Border Radius">
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={node.borderRadius[0]}
              onChange={(e) =>
                handleNodeUpdate("borderRadius", [
                  e.target.value,
                  node.borderRadius[1],
                  node.borderRadius[2],
                  node.borderRadius[3],
                ])
              }
              type="number"
              placeholder="TL"
            />
            <Input
              value={node.borderRadius[1]}
              onChange={(e) =>
                handleNodeUpdate("borderRadius", [
                  node.borderRadius[0],
                  e.target.value,
                  node.borderRadius[2],
                  node.borderRadius[3],
                ])
              }
              type="number"
              placeholder="TR"
            />
            <Input
              value={node.borderRadius[2]}
              onChange={(e) =>
                handleNodeUpdate("borderRadius", [
                  node.borderRadius[0],
                  node.borderRadius[1],
                  e.target.value,
                  node.borderRadius[3],
                ])
              }
              type="number"
              placeholder="BL"
            />
            <Input
              value={node.borderRadius[3]}
              onChange={(e) =>
                handleNodeUpdate("borderRadius", [
                  node.borderRadius[0],
                  node.borderRadius[1],
                  node.borderRadius[2],
                  e.target.value,
                ])
              }
              type="number"
              placeholder="BR"
            />
          </div>
        </InputGroup>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-medium uppercase tracking-wider opacity-50">
          Effects
        </h3>
        <InputGroup label="Opacity">
          <Input
            value={node.opacity}
            onChange={(e) => handleNodeUpdate("opacity", e.target.value)}
            type="number"
            className="w-full"
          />
        </InputGroup>
      </section>
      <CustomCssEditor />
    </div>
  );
};

const FlexPreview = ({
  direction,
  justify,
  align,
}: {
  direction: string;
  justify: string;
  align: string;
}) => (
  <div
    className={`h-26 bg-[#1c2428]/50 rounded-lg p-2 border border-gray-700/50
    flex gap-1.5 transition-all duration-200`}
    style={{
      flexDirection: direction as any,
      justifyContent: justify,
      alignItems: align,
    }}
  >
    <div className="w-6 h-6 rounded bg-blue-500/20 border border-blue-500/30 flex-shrink-0" />
    <div className="w-8 h-8 rounded bg-blue-500/30 border border-blue-500/40 flex-shrink-0" />
    <div className="w-6 h-6 rounded bg-blue-500/20 border border-blue-500/30 flex-shrink-0" />
  </div>
);

const LayoutControls = () => {
  const {
    actions: { setProp },
    node,
  } = useNode((node) => ({
    node: node.data.props,
  }));

  const handleNodeUpdate = (key: string, value: string | number) => {
    setProp((props: any) => {
      props[key] = value;
    }, 500);
  };

  return (
    <div className="space-y-4">
      {/* Display Type */}
      <InputGroup label="Display">
        <Select
          className="w-full"
          value={node.display}
          onChange={(e) => handleNodeUpdate("display", e.target.value)}
        >
          <option value="block">Block</option>
          <option value="flex">Flex</option>
          <option value="grid">Grid</option>
          <option value="inline">Inline</option>
          <option value="inline-block">Inline Block</option>
          <option value="none">None</option>
        </Select>
      </InputGroup>

      {/* Flex Controls */}

      <div className="space-y-4 p-3 bg-[#1c2428]/30 rounded-lg border border-gray-700/50">
        {/* Preview */}
        {node.display === "flex" && (
          <>
            <FlexPreview
              direction={node.flexDirection}
              justify={node.justifyContent}
              align={node.alignItems}
            />

            {/* Direction */}
            <InputGroup label="Flex Direction">
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    value: "row",
                    label: (
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded bg-blue-400" />
                        <div className="w-3 h-3 rounded bg-blue-400" />
                        <div className="w-2 h-2 rounded bg-blue-400" />
                      </div>
                    ),
                  },
                  {
                    value: "row-reverse",
                    label: (
                      <div className="flex items-center gap-1.5 flex-row-reverse">
                        <div className="w-2 h-2 rounded bg-blue-400" />
                        <div className="w-3 h-3 rounded bg-blue-400" />
                        <div className="w-2 h-2 rounded bg-blue-400" />
                      </div>
                    ),
                  },
                  {
                    value: "column",
                    label: (
                      <div className="flex flex-col items-center gap-1.5 h-full justify-center">
                        <div className="w-4 h-1.5 rounded bg-blue-400" />
                        <div className="w-4 h-1.5 rounded bg-blue-400" />
                        <div className="w-4 h-1.5 rounded bg-blue-400" />
                        <div className="absolute right-2 text-[10px] opacity-60">
                          ↓
                        </div>
                      </div>
                    ),
                  },
                  {
                    value: "column-reverse",
                    label: (
                      <div className="flex flex-col items-center gap-1.5 h-full justify-center">
                        <div className="w-4 h-1.5 rounded bg-blue-400" />
                        <div className="w-4 h-1.5 rounded bg-blue-400" />
                        <div className="w-4 h-1.5 rounded bg-blue-400" />
                        <div className="absolute right-2 text-[10px] opacity-60">
                          ↑
                        </div>
                      </div>
                    ),
                  },
                ].map((dir) => (
                  <button
                    key={dir.value}
                    onClick={() => handleNodeUpdate("flexDirection", dir.value)}
                    className={`p-2.5 rounded border transition-colors relative ${
                      node.flexDirection === dir.value
                        ? "bg-blue-500/20 border-blue-500/40"
                        : "border-gray-700/50 hover:border-gray-600"
                    }`}
                    title={dir.value}
                  >
                    {dir.label}
                  </button>
                ))}
              </div>
            </InputGroup>

            {/* Justify Content */}
            <InputGroup label="Justify Content">
              <div className="grid grid-cols-3 gap-1">
                {[
                  { value: "flex-start", icon: "⟶" },
                  { value: "center", icon: "⟷" },
                  { value: "flex-end", icon: "⟵" },
                  { value: "space-between", icon: "⟶⟵" },
                  { value: "space-around", icon: "↔" },
                  { value: "space-evenly", icon: "⇔" },
                ].map((j) => (
                  <button
                    key={j.value}
                    onClick={() => handleNodeUpdate("justifyContent", j.value)}
                    className={`p-1.5 rounded border text-sm transition-colors ${
                      node.justifyContent === j.value
                        ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                        : "border-gray-700/50 hover:border-gray-600"
                    }`}
                    title={j.value}
                  >
                    {j.icon}
                  </button>
                ))}
              </div>
            </InputGroup>

            {/* Align Items */}
            <InputGroup label="Align Items">
              <div className="grid grid-cols-3 gap-1">
                {[
                  { value: "flex-start", icon: "↑" },
                  { value: "center", icon: "↕" },
                  { value: "flex-end", icon: "↓" },
                  { value: "stretch", icon: "║" },
                  { value: "baseline", icon: "▁" },
                ].map((a) => (
                  <button
                    key={a.value}
                    onClick={() => handleNodeUpdate("alignItems", a.value)}
                    className={`p-1.5 rounded border text-sm transition-colors ${
                      node.alignItems === a.value
                        ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                        : "border-gray-700/50 hover:border-gray-600"
                    }`}
                    title={a.value}
                  >
                    {a.icon}
                  </button>
                ))}
              </div>
            </InputGroup>
          </>
        )}
        {/* Flex Properties */}
        <div className="space-y-3">
          <h4 className="text-xs font-medium opacity-80">Flex Properties</h4>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs opacity-60 mb-1 block">Grow</label>
              <Input
                type="number"
                min="0"
                className="w-full"
                value={node.flexGrow}
                onChange={(e) => handleNodeUpdate("flexGrow", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs opacity-60 mb-1 block">Shrink</label>
              <Input
                type="number"
                min="0"
                className="w-full"
                value={node.flexShrink}
                onChange={(e) => handleNodeUpdate("flexShrink", e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs opacity-60 mb-1 block">Basis</label>
              <Input
                type="text"
                className="w-full"
                value={node.flexBasis}
                onChange={(e) => handleNodeUpdate("flexBasis", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid Controls - Can be added later */}
      {node.display === "grid" && (
        <div className="p-3 bg-[#1c2428]/30 rounded-lg border border-gray-700/50">
          <span className="text-sm opacity-60">
            Grid controls coming soon...
          </span>
        </div>
      )}
    </div>
  );
};

export const LayoutPanel = () => {
  const {
    actions: { setProp },
    node,
  } = useNode((node) => ({
    node: node.data.props,
  }));

  const handleOffsetList = (key: string, offset: string[]) => {
    setProp((props: any) => {
      props[key] = offset;
    }, 500);
  };

  const handleSpacingUnit = (unit: string, label: string) => {
    setProp((props: any) => {
      props[label === "Margin" ? "marginUnit" : "paddingUnit"] = unit;
    }, 500);
  };

  const handleNodeUpdate = (key: string, unit: string) => {
    setProp((props: any) => {
      props[key] = unit;
    }, 500);
  };

  return (
    <div className="p-4 space-y-6">
      <section className="space-y-4">
        <h3 className="text-xs font-medium uppercase tracking-wider opacity-50">
          Dimensions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <InputGroup label="Width">
            <div className="flex gap-2">
              <Input
                type="number"
                className="w-full"
                value={node.width || ""}
                onChange={(e) => handleNodeUpdate("width", e.target.value)}
              />
              <Select
                onChange={(e) => handleNodeUpdate("widthUnit", e.target.value)}
                value={node.widthUnit}
                className="w-20"
              >
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="rem">rem</option>
              </Select>
            </div>
          </InputGroup>
          <InputGroup label="Height">
            <div className="flex gap-2">
              <Input
                type="number"
                className="w-full"
                value={node.height || ""}
                onChange={(e) => handleNodeUpdate("height", e.target.value)}
              />
              <Select
                onChange={(e) => handleNodeUpdate("heightUnit", e.target.value)}
                value={node.heightUnit}
                className="w-20"
              >
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="rem">rem</option>
              </Select>
            </div>
          </InputGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-medium uppercase tracking-wider opacity-50">
          Spacing
        </h3>
        <div className="space-y-4 p-4 border border-dashed border-gray-700/50 rounded-lg">
          <SpacingInputs
            label="Margin"
            values={node.margin || [0, 0, 0, 0]}
            onChange={(value) => handleOffsetList("margin", value)}
            onUnitChange={handleSpacingUnit}
            unit={node.marginUnit}
          />
          <div className="h-px bg-gray-800" />
          <SpacingInputs
            values={node.padding}
            onChange={(value) => handleOffsetList("padding", value)}
            label="Padding"
            onUnitChange={handleSpacingUnit}
            unit={node.paddingUnit}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-medium uppercase tracking-wider opacity-50">
          Layout
        </h3>
        <LayoutControls />

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <InputGroup label="Position">
              <Select
                className="w-full"
                value={node.position}
                onChange={(e) => handleNodeUpdate("position", e.target.value)}
              >
                <option value="static">Static</option>
                <option value="relative">Relative</option>
                <option value="absolute">Absolute</option>
                <option value="fixed">Fixed</option>
                <option value="sticky">Sticky</option>
              </Select>
            </InputGroup>
            <InputGroup label="Z-Index">
              <Input
                value={node.zIndex}
                onChange={(e) => handleNodeUpdate("zIndex", e.target.value)}
                type="number"
                className="w-full"
              />
            </InputGroup>
          </div>

          {node.position && node.position !== "static" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-medium opacity-80">
                  Position Offset
                </h4>
                <Select
                  value={node.positionUnit}
                  onChange={(e) =>
                    handleNodeUpdate("positionUnit", e.target.value)
                  }
                  className="w-16 h-6 text-xs"
                >
                  <option>px</option>
                  <option>%</option>
                  <option>rem</option>
                </Select>
              </div>
              <div className="relative h-32 border border-dashed border-gray-700/50 rounded-lg">
                <Input
                  value={node.positionOffset[0]}
                  onChange={(e) => {
                    let offset = [...node.positionOffset];
                    offset[0] = e.target.value;
                    handleOffsetList("positionOffset", offset);
                  }}
                  type="number"
                  className="absolute top-1 left-1/2 -translate-x-1/2 w-16 text-center z-10"
                  title="Top"
                />
                <Input
                  value={node.positionOffset[1]}
                  onChange={(e) => {
                    let offset = [...node.positionOffset];
                    offset[1] = e.target.value;
                    handleOffsetList("positionOffset", offset);
                  }}
                  type="number"
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-16 text-center z-10"
                  title="Right"
                />
                <Input
                  value={node.positionOffset[2]}
                  onChange={(e) => {
                    let offset = [...node.positionOffset];
                    offset[2] = e.target.value;
                    handleOffsetList("positionOffset", offset);
                  }}
                  type="number"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 text-center z-10"
                  title="Bottom"
                />
                <Input
                  value={node.positionOffset[3]}
                  onChange={(e) => {
                    let offset = [...node.positionOffset];
                    offset[3] = e.target.value;
                    handleOffsetList("positionOffset", offset);
                  }}
                  type="number"
                  className="absolute left-1 top-1/2 -translate-y-1/2 w-16 text-center z-10"
                  title="Left"
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Box className="opacity-20" size={24} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const SpacingInputs = ({
  label,
  values,
  onChange,
  onUnitChange,
  unit,
}: {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  onUnitChange: (unit: string, label: string) => void;
  unit: string;
}) => {
  const [localValues, setLocalValues] = useState(values);
  useEffect(() => {
    setLocalValues(values);
  }, [values]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-medium opacity-80">{label}</h4>
        <Select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value, label)}
          className="w-16 h-6 text-xs"
        >
          <option value={"px"}>px</option>
          <option value={"%"}>%</option>
          <option value={"rem"}>rem</option>
        </Select>
      </div>
      <div className="relative h-32 border border-dashed border-gray-700/50 rounded-lg">
        <Input
          type="number"
          className="absolute top-1 left-1/2 -translate-x-1/2 w-16 text-center z-10"
          placeholder="0"
          title="Top"
          value={+localValues[0]}
          onChange={(e) =>
            onChange([
              e.target.value,
              localValues[1],
              localValues[2],
              localValues[3],
            ])
          }
        />
        <Input
          type="number"
          className="absolute right-1 top-1/2 -translate-y-1/2 w-16 text-center z-10"
          placeholder="0"
          title="Right"
          value={+localValues[1]}
          onChange={(e) =>
            onChange([
              localValues[0],
              e.target.value,
              localValues[2],
              localValues[3],
            ])
          }
        />
        <Input
          type="number"
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 text-center z-10"
          placeholder="0"
          title="Bottom"
          value={+localValues[2]}
          onChange={(e) =>
            onChange([
              localValues[0],
              localValues[1],
              e.target.value,
              localValues[3],
            ])
          }
        />
        <Input
          type="number"
          className="absolute left-1 top-1/2 -translate-y-1/2 w-16 text-center z-10"
          placeholder="0"
          title="Left"
          value={+localValues[3]}
          onChange={(e) =>
            onChange([
              localValues[0],
              localValues[1],
              localValues[2],
              e.target.value,
            ])
          }
        />
      </div>
    </div>
  );
};

const ImagePanel = () => {
  const {
    actions: { setProp },
    node,
  } = useNode((node) => ({
    node: node.data.props,
  }));

  const updateImageProp = (key: string, value: any) => {
    setProp((props: any) => {
      props[key] = value;
    }, 500);
  };

  return (
    <div className="p-4 space-y-6">
      <section className="space-y-4">
        <h3 className="text-xs font-medium uppercase tracking-wider opacity-50">
          Image Properties
        </h3>
        <div className="space-y-4 p-3 bg-[#1c2428]/30 rounded-lg border border-gray-700/50">
          {/* Image Source */}
          <InputGroup label="Image Source">
            <div className="flex gap-2">
              <Input
                type="text"
                className="w-full"
                placeholder="https://example.com/image.jpg"
                value={node.src || ""}
                onChange={(e) => updateImageProp("src", e.target.value)}
              />
            </div>
          </InputGroup>

          {/* Alt Text */}
          <InputGroup label="Alt Text">
            <Input
              type="text"
              className="w-full"
              placeholder="Image description"
              value={node.alt || ""}
              onChange={(e) => updateImageProp("alt", e.target.value)}
            />
          </InputGroup>

          {/* Object Fit */}
          <InputGroup label="Object Fit">
            <div className="grid grid-cols-3 gap-1">
              {[
                { value: "cover", icon: "Cover" },
                { value: "contain", icon: "Contain" },
                { value: "fill", icon: "Fill" },
                { value: "none", icon: "None" },
                { value: "scale-down", icon: "Scale" },
              ].map((fit) => (
                <button
                  key={fit.value}
                  onClick={() => updateImageProp("objectFit", fit.value)}
                  className={`p-1.5 rounded border text-sm transition-colors ${
                    node.objectFit === fit.value
                      ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                      : "border-gray-700/50 hover:border-gray-600"
                  }`}
                  title={fit.value}
                >
                  {fit.icon}
                </button>
              ))}
            </div>
          </InputGroup>
        </div>
      </section>
    </div>
  );
};

// Update StyleControls to include these new panels
const StyleControls = () => {
  const [activeTab, setActiveTab] = useState("layout");

  const tabs = [
    { id: "layout", icon: Layout, label: "Layout" },
    { id: "typography", icon: Type, label: "Type" },
    { id: "style", icon: Palette, label: "Style" },
    { id: "image", icon: Image, label: "Image" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-2 border-b border-gray-800">
        <div className="flex flex-1 p-0.5 bg-[#1c2428] rounded-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center flex-1 gap-1 px-2 py-1.5 rounded-md text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-500/20 text-blue-400"
                  : "hover:bg-[#1e2428]"
              }`}
            >
              <tab.icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {activeTab === "layout" && <LayoutPanel />}
        {activeTab === "typography" && <TypographyPanel />}
        {activeTab === "style" && <StylePanel />}
        {activeTab === "image" && <ImagePanel />}
      </div>
    </div>
  );
};

const CustomCssEditor = () => {
  const {
    actions: { setProp },
    node,
  } = useNode((node) => ({
    node: node.data.props,
  }));

  const [properties, setProperties] = useState<
    Array<{ key: string; value: string }>
  >([]);

  useEffect(() => {
    const customCss = {};
    properties.forEach((item) => {
      if (item.key && item.value) {
        customCss[item.key] = item.value;
      }
    });
    handleNodeUpdate("customCss", customCss);
  }, [properties]);

  const addNewProperty = () => {
    setProperties([...properties, { key: "", value: "" }]);
  };

  const handleNodeUpdate = (key: string, unit: any) => {
    setProp((props: any) => {
      props[key] = unit;
    }, 500);
  };

  const updateProperty = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newProperties = [...properties];
    newProperties[index][field] = value;
    setProperties(newProperties);
  };

  const removeProperty = (index: number) => {
    setProperties(properties.filter((_, i) => i !== index));
  };

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium uppercase tracking-wider opacity-50">
          Custom CSS
        </h3>
        <button
          onClick={addNewProperty}
          className="px-2 py-1 text-xs rounded-md bg-blue-500/20 
          text-blue-400 hover:bg-blue-500/30 transition-colors"
        >
          Add Property
        </button>
      </div>

      <div className="max-h-[200px] pr-2 space-y-3">
        {properties.map((prop, index) => (
          <div key={index} className="space-y-1">
            {/* First line: Property key and remove button */}
            <div className="flex items-center gap-2">
              <Input
                type="text"
                className="w-full h-7 text-sm"
                placeholder="property-name"
                value={prop.key}
                onChange={(e) => updateProperty(index, "key", e.target.value)}
              />
              <button
                className="p-1 opacity-60 hover:opacity-100 transition-opacity"
                onClick={() => removeProperty(index)}
                title="Remove property"
              >
                <X size={14} />
              </button>
            </div>
            {/* Second line: Value input */}
            <Input
              type="text"
              className="w-full h-7 text-sm"
              placeholder="value"
              value={prop.value}
              onChange={(e) => updateProperty(index, "value", e.target.value)}
            />
          </div>
        ))}

        {properties.length === 0 && (
          <div className="text-xs opacity-60 text-center py-2">
            No custom properties added
          </div>
        )}
      </div>
    </section>
  );
};

const ControlPanel = () => {
  return (
    <div
      className="w-80 h-full flex flex-col overflow-hidden border-l border-gray-800"
      style={{ backgroundColor: "#14181b", color: "#9ba5b7" }}
    >
      <StyleControls />
    </div>
  );
};

export default ControlPanel;
