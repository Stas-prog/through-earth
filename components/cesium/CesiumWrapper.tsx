"use client";

import React from "react";
import dynamic from "next/dynamic";

const Viewer =
dynamic(

()=>
import(
"./CesiumViewer"
),

{
ssr:false
}

);


export default function
CesiumWrapper(){

const[
CesiumJs,

setCesiumJs

]=React.useState<any>(
null
);


React.useEffect(()=>{

if(
CesiumJs
)return;


import(
"cesium"
)

.then(

(Cesium)=>{

setCesiumJs(
Cesium
);

}

);

},[
CesiumJs
]);


if(
!CesiumJs
){

return null;

}


return(

<Viewer
CesiumJs={
CesiumJs
}
/>

);

}