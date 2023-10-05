import { ROUTES } from "@/constant/routes";
import { ibm_plex_mono } from "@/fonts/fonts";
import Link from "next/link";
import React from "react";

const ExperimentList = () => {
  const renderRoutes = () => {
    return ROUTES.map((route, index) => {
      return (
        <Link
          key={`exp-${index + 1}`}
          href={`experiments/${route.route}`}
          className="text-sm hover:underline underline-offset-4"
        >
          /{route.route}
        </Link>
      );
    });
  };
  return (
    <section className={`${ibm_plex_mono.className} mt-160 w-full grid responsive-grid gap-2`}>
      {renderRoutes()}
    </section>
  );
};

export default ExperimentList;
