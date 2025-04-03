import { useEditor, useNode } from "@craftjs/core";
import cx from "classnames";
import React, { useEffect, useState } from "react";

import { Header } from "./Header";
import { Toolbox } from "./Toolbox";

export const Viewport: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const {
    connectors,
    actions: { setOptions },
    active,
    related,
  } = useEditor((state, query) => {
    const enabled = state.options.enabled;
    const currentlySelectedNodeId = query.getEvent("selected").first();

    return {
      enabled,
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  const [zoomLevel, setZoomLevel] = useState<number>(100);

  useEffect(() => {
    if (!window) {
      return;
    }

    window.requestAnimationFrame(() => {
      // Notify doc site
      window.parent.postMessage(
        {
          LANDING_PAGE_LOADED: true,
        },
        "*"
      );

      setTimeout(() => {
        setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [setOptions]);

  return (
    <div className="viewport">
      <div
        className={cx(["flex h-full overflow-hidden flex-row w-full fixed"])}
      >
        <Toolbox />
        <div className="page-container bg-bgprimary flex flex-1 h-full flex-col">
          <Header zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
          <div
            className={cx([
              "craftjs-renderer bg-color600 flex-1 h-full w-full transition pb-8 overflow-auto",
            ])}
            ref={(ref) => {
              connectors.select(connectors.hover(ref, null), null);
            }}
          >
            <div
              style={{
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: "top center",
              }}
              className="relative flex-col flex items-center"
            >
              {children}
            </div>
          </div>
        </div>
        {active && related.toolbar && React.createElement(related.toolbar)}
      </div>
    </div>
  );
};
