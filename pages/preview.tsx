"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const DynamicPDF = dynamic(() => import("components/pdfrender"), {
  ssr: false,
});

export default function PreviewPdf() {
  const [data, setData] = useState({});

  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = JSON.parse(localStorage.getItem("pdf_flow_state"));
      if (savedState) {
        setData(savedState);
      }
    };
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="bg-primary h-screen">
      <DynamicPDF data={data} />
    </div>
  );
}
