"use client";

import * as Cesium from "cesium";
import "./cesium-setup";
import "cesium/Build/Cesium/Widgets/widgets.css";

import {
  useEffect,
  useRef
} from "react";


export default function CesiumViewer() {

  const ref =
    useRef<HTMLDivElement | null>(
      null
    );

  const viewerRef =
    useRef<Cesium.Viewer | null>(
      null
    );


  useEffect(() => {

    console.log(
      "TOKEN:",
      process.env
        .NEXT_PUBLIC_CESIUM_TOKEN
    );


    if (
      !ref.current ||
      viewerRef.current
    ) {
      return;
    }


    async function init() {

      try {

        Cesium.Ion.defaultAccessToken =
          process.env
            .NEXT_PUBLIC_CESIUM_TOKEN!;


        console.log(
          "ION TOKEN:",
          Cesium.Ion.defaultAccessToken
        );


        console.log(
          "TOKEN MATCH:",
          Cesium.Ion.defaultAccessToken ===
          process.env
            .NEXT_PUBLIC_CESIUM_TOKEN
        );


        const terrainProvider =

          await Cesium
            .createWorldTerrainAsync();


        console.log(
          "TERRAIN:",
          terrainProvider
        );


        viewerRef.current =

          new Cesium.Viewer(

            ref.current!,

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


              terrainProvider:
                terrainProvider,

            }

          );


        console.log(
          "VIEWER OK"
        );


        viewerRef.current
          .camera
          .flyTo({

            destination:

              Cesium.Cartesian3
                .fromDegrees(

                  0,
                  30,
                  20000000

                ),

          });

      }

      catch (e) {

        console.error(

          "CESIUM FAIL:",

          e

        );

      }

    }


    init();


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