import React from "react";
import Hero from "./components/hero";
import ListProp from "./components/listprop";
import PropertieMap from "../properties/components/PropertieMap";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ListProp />
    </div>
  );
}
