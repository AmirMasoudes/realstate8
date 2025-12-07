import React from "react";
import Hero from "./components/hero";
import ListProp from "./components/listprop";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ListProp />
    </div>
  );
}
