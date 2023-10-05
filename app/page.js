"use client"
import React from "react";
import { pixelify_sans } from "../fonts/fonts";
import ExperimentList from "@/components/experimentList/ExperimentList";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main className={`${pixelify_sans.className} flex min-h-screen max-w-screen-lg flex-col items-center justify-between p-16 mx-auto`}>
      <div className="flex items-center w-full flex-col">
        <h1 className="text-4xl mt-160">{"webgl experiments"}</h1>
        <ExperimentList/>
      </div>
      <Footer/>
    </main>
  );
}
