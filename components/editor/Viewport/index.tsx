import { useEditor } from "@craftjs/core";
import cx from "classnames";
import React, { useEffect, useRef, useState } from "react";

import { Header } from "./Header";
import { Toolbox } from "./Toolbox";
import PreviewPdfCode from "components/PreviewPdfCode";
import Link from "next/link";

export const Viewport: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [showCode, setShowCode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const hasSerializedNodesRun = useRef(false);
  const { connectors, actions, active, related } = useEditor((state, query) => {
    const enabled = state.options.enabled;
    const currentlySelectedNodeId = query.getEvent("selected").first();
    if (
      typeof window !== "undefined" &&
      window.localStorage &&
      hasSerializedNodesRun.current
    ) {
      localStorage.setItem("pdf_flow_state", query.serialize());
    }

    return {
      enabled,
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const savedState = JSON.parse(localStorage.getItem("pdf_flow_state"));
      if (savedState?.ROOT && !hasSerializedNodesRun.current) {
        actions.deserialize(savedState);
        hasSerializedNodesRun.current = true;
      } else if (savedState === null) {
        hasSerializedNodesRun.current = true;
      }
    }
  }, [actions]);

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
        actions.setOptions((options) => {
          options.enabled = true;
        });
      }, 200);
    });
  }, [actions.setOptions]);

  return (
    <div className="viewport">
      <div
        className={cx(["flex h-full overflow-hidden flex-row w-full fixed"])}
      >
        <Toolbox />
        <div className="page-container bg-bgprimary flex flex-1 h-full flex-col">
          <Header
            zoomLevel={zoomLevel}
            setZoomLevel={setZoomLevel}
            setShowCode={setShowCode}
            showCode={showCode}
          />
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
              className="relative flex-col flex items-center mt-10"
            >
              {children}
            </div>
          </div>
        </div>
        {showCode && <PreviewPdfCode />}
        {active && related.toolbar && React.createElement(related.toolbar)}
        {!active && (
          <Link
            href="https://yash-raj.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 bg-[linear-gradient(to_right,#667eea,#764ba2)] text-white py-3 px-6 rounded-md shadow-lg transition duration-300 ease-in-out transform hover:scale-105 font-semibold text-lg hover:bg-[#764ba2]"
          >
            Hire Me!
          </Link>
        )}
      </div>
    </div>
  );
};
