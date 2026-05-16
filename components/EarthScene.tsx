
"use client";

import { useEffect, useRef, useState } from "react";

import * as Cesium from "cesium";

import ThroughEarthSequence from "./ThroughEarthSequence";

import "cesium/Build/Cesium/Widgets/widgets.css";

if (typeof window !== "undefined") {
  (window as any).CESIUM_BASE_URL =
    "/cesium";
}

export default function EarthScene() {
  const containerRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const viewerRef =
    useRef<Cesium.Viewer | null>(
      null
    );

  // 🌍 USER POSITION
  const [position, setPosition] =
    useState<{
      lat: number;
      lng: number;
    } | null>(null);

  // 🌍 GEOLOCATION
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat:
            pos.coords.latitude,

          lng:
            pos.coords.longitude,
        });
      }
    );
  }, []);

  // 🌍 CESIUM INIT
  useEffect(() => {
    if (!containerRef.current)
      return;

    if (viewerRef.current)
      return;

    const viewer =
      new Cesium.Viewer(
        containerRef.current,
        {
          animation: false,
          timeline: false,
          baseLayerPicker: false,
          geocoder: false,
          homeButton: false,
          sceneModePicker: false,
          navigationHelpButton: false,
          fullscreenButton: false,
          infoBox: false,
          selectionIndicator: false,

          requestRenderMode: false,

          shouldAnimate: true,
        }
      );

    viewerRef.current = viewer;

    // 🌞 LIGHT FIX
    viewer.clock.currentTime =
      Cesium.JulianDate.fromDate(
        new Date(
          "2025-05-12T12:00:00Z"
        )
      );

    if (
      viewer.scene.skyAtmosphere
    ) {
      viewer.scene.skyAtmosphere.show =
        true;
    }

    viewer.scene.globe.enableLighting =
      true;

    viewer.scene.requestRenderMode =
      false;

    return () => {
      viewer.destroy();
    };
  }, []);

  // 🌍 START VIEW
  useEffect(() => {
    if (
      !viewerRef.current ||
      !position
    )
      return;

    const viewer =
      viewerRef.current;

    viewer.entities.removeAll();

    // 🟢 USER POINT
    viewer.entities.add({
      position:
        Cesium.Cartesian3.fromDegrees(
          position.lng,
          position.lat
        ),

      point: {
        pixelSize: 12,

        color:
          Cesium.Color.LIME,
      },
    });

    // 🌍 CAMERA START
    viewer.camera.flyTo({
      destination:
        Cesium.Cartesian3.fromDegrees(
          position.lng,
          position.lat,
          18000000
        ),

      duration: 4,
    });
  }, [position]);

  // 🌍 ANTIPODE
  const antipode = position
    ? {
        lat: -position.lat,

        lng:
          position.lng > 0
            ? position.lng - 180
            : position.lng + 180,
      }
    : null;

  // =================================
  // 🚀 MAIN CINEMATIC PIPELINE
  // =================================

  const handleSequenceStart =
    async (
      phase: string
    ): Promise<void> => {
      const viewer =
        viewerRef.current;

      if (
        !viewer ||
        !position ||
        !antipode
      ) {
        return;
      }

      const userLat =
        position.lat;

      const userLng =
        position.lng;

      // =================================
      // 🌍 DIVE
      // =================================

      if (phase === "dive") {
        await new Promise<void>(
          (resolve) => {
            viewer.camera.flyTo({
              destination:
                Cesium.Cartesian3.fromDegrees(
                  userLng,
                  userLat,
                  15
                ),

              orientation: {
                heading: 0,

                pitch:
                  Cesium.Math.toRadians(
                    -90
                  ),

                roll: 0,
              },

              duration: 15,

              complete: () =>
                resolve(),
            });
          }
        );
        return;
      }

      // =================================
      // 🌌 SPACE
      // =================================

      if (phase === "space") {
        await new Promise<void>(
          (resolve) => {
            viewer.camera.flyTo({
              destination:
                Cesium.Cartesian3.fromDegrees(
                  antipode.lng,
                  antipode.lat,
                  42000000
                ),

              orientation: {
                heading:
                  Cesium.Math.toRadians(
                    180
                  ),

                pitch:
                  Cesium.Math.toRadians(
                    0
                  ),

                roll: 0,
              },

              duration: 11,

              complete: () =>
                resolve(),
            });
          }
        );

        return;
      }

      // =================================
      // 🌍 REVEAL
      // =================================

      if (phase === "reveal") {
        viewer.entities.add({
          position:
            Cesium.Cartesian3.fromDegrees(
              antipode.lng,
              antipode.lat
            ),

          point: {
            pixelSize: 10,

            color:
              Cesium.Color.RED,
          },
        });

        await new Promise<void>(
          (resolve) => {
            viewer.camera.flyTo({
              destination:
                Cesium.Cartesian3.fromDegrees(
                  antipode.lng,
                  antipode.lat,
                  18000000
                ),

              orientation: {
                heading: 0,

                pitch:
                  Cesium.Math.toRadians(
                    -90
                  ),

                roll: 0,
              },

              duration: 8,

              complete: () =>
                resolve(),
            });
          }
        );

        return;
      }

      // =================================
      // 🌍 DESCENT
      // =================================

      if (phase === "descent") {
        await new Promise<void>(
          (resolve) => {
            viewer.camera.flyTo({
              destination:
                Cesium.Cartesian3.fromDegrees(
                  antipode.lng,
                  antipode.lat,
                  7000000
                ),

              orientation: {
                heading: 0,

                pitch:
                  Cesium.Math.toRadians(
                    -85
                  ),

                roll: 0,
              },

              duration: 14,

              complete: () =>
                resolve(),
            });
          }
        );

        return;
      }
    };

  return (
    <>
      {/* 🌍 CESIUM */}
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          inset: 0,
        }}
      />

      {/* 🚀 SEQUENCE */}
      <ThroughEarthSequence
        onStart={
          handleSequenceStart
        }
      />
    </>
  );
}