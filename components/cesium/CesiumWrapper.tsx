"use client";

import dynamic from "next/dynamic";

const Viewer = dynamic(
  () => import("./CesiumViewer"),
  {
    ssr: false,
    loading: () => <div>Loading Earth...</div>,
  }
);

export default function CesiumWrapper() {
  return <Viewer />;
}