"use client";

import "./cesium-setup";
import "cesium/Build/Cesium/Widgets/widgets.css";

import {
  useEffect,
  useRef
} from "react";

export default function CesiumViewer({
  CesiumJs
}: any) {

  const ref =
    useRef<HTMLDivElement | null>(
      null
    );

  const viewerRef =
    useRef<any>(
      null
    );


  useEffect(() => {

    if (
      !ref.current ||
      viewerRef.current ||
      !CesiumJs
    ) {
      return;
    }


    viewerRef.current =
      new CesiumJs.Viewer(

        ref.current,

        {

          timeline:
            false,

          animation:
            false,

          baseLayerPicker:
            false,

          geocoder:
            false,

          fullscreenButton:
            false,

          homeButton:
            false,

          sceneModePicker:
            false,

          navigationHelpButton:
            false,

          terrain:
            CesiumJs.Terrain
              .fromWorldTerrain(),

        }

      );


    viewerRef.current
      .camera
      .flyTo({

        destination:

          CesiumJs
            .Cartesian3
            .fromDegrees(

              0,
              30,
              20000000

            ),

      });


    return () => {

      viewerRef
        .current
        ?.destroy();

      viewerRef.current =
        null;

    };

  }, []);


  return (

    <>

      <div
        style={{

          position:
            "fixed",

          top:
            20,

          left:
            20,

          zIndex:
            9999,

          color:
            "red",

        }}
      >

        CESIUM LIVE

      </div>


      <div

        ref={ref}

        style={{

          width:
            "100vw",

          height:
            "100vh",

        }}

      />

    </>

  );

}