"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { SectionContainer } from "../common/section-container";
import { Heading } from "../common/heading";
import { ProductsSectionType } from "@/types/types";
import ProductList from "../products/product-list";
import { ValidLocale } from "@/config/i18n-config";
import { Button } from "../ui/button";
import { getTranslation } from "@/lib/translation";
import Link from "next/link";

interface ProductsSectionProps extends ProductsSectionType {
  lang: ValidLocale;
}

const ShapeBlob = ({ className }: { className: string }) => (
  <svg
    viewBox="-120 -120 240 240"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M 81.52126252603836,0 C 81.98436808196767,19.261535801372776 75.53193737900902,38.18238193900013 62.94961197215532,52.82099618858841 C 50.36728656530161,67.4596104381767 32.80528913878155,76.02002708366598 13.876819784099029,78.69935575567214 C -5.0516495705834945,81.37868442767831 -22.329416583974822,76.80414891164888 -38.812639444258295,67.22546349330727 C -55.29586230454177,57.64677807496567 -67.79849342184757,44.861262680550425 -74.73942474314246,27.202925932682778 C -81.68035606443736,9.544589184815127 -82.8446840713278,-10.202840632807696 -76.1281130278072,-27.708367132974914 C -69.4115419842866,-45.213893633142135 -55.46037554522573,-56.92165002430836 -38.63014520343873,-66.90937419611896 C -21.79991486165173,-76.89709836792956 -4.077723577267708,-84.41297542420638 14.353695054228695,-81.40384980538401 C 32.78511368572509,-78.39472418656165 47.96626462400516,-65.87353821350683 60.459887994386435,-50.731869717109355 C 72.9535113647677,-35.590201220711876 81.05815697010904,-19.261535801372776 81.52126252603836,0 Z"
      fill="currentColor"
    />
  </svg>
);

export function ProductsSection({
  heading,
  featuredProducts,
  specialWord,
  lang,
}: ProductsSectionProps) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <SectionContainer className="relative overflow-hidden">
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="absolute -right-1/4 top-1 -translate-y-11/20 w-1/2 h-72 text-brand pointer-events-none"
        >
          <ShapeBlob className="w-full h-full" />
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute -left-1/4 top-1 -translate-y-11/20 w-1/2 h-72 text-brand pointer-events-none"
        >
          <ShapeBlob className="w-full h-full" />
        </motion.div>

        <Heading specialWord={specialWord ? specialWord[lang] : undefined}>
          {heading[lang]}
        </Heading>
        <ProductList products={featuredProducts} lang={lang} />
        <Link href={`/${lang}/products`} passHref>
          <motion.div className="flex justify-center">
            <Button className="bg-brand capitalize text-lg">
              {getTranslation(lang, "shared", "explore_products")}
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </SectionContainer>
  );
}
