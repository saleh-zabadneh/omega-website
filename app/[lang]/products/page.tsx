import { ValidLocale } from "@/config/i18n-config";
import { getProducts } from "@/lib/sanity/queries/products";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductPageLayout } from "@/components/products/product-page-layout";
import { getProductsSection } from "@/lib/sanity/queries/product-layout-section";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Browse our wide range of products",
};

export default async function ProductsPage({
  params: { lang },
}: {
  params: { lang: ValidLocale };
}) {
  const products = await getProducts();
  const productsSection = await getProductsSection(lang);

  return (
    <main className="relative bg-background flex justify-center mx-auto items-center flex-col overflow-hidden">
      <div className="w-full relative">
        {productsSection.productHeading &&
          productsSection.productDescription &&
          productsSection.productPageImage && (
            <ProductPageLayout
              lang={lang}
              productHeading={productsSection.productHeading}
              productDescription={productsSection.productDescription}
              productPageImage={productsSection.productPageImage}
            />
          )}
        {/* Products Grid with negative margin to overlap with arch */}
        <div className="relative mt-4 px-6 md:px-10 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl mx-auto">
            {products.map((product, index) => (
              <div
                key={product._id}
                className={`animate-fade-in-up`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105 group bg-background">
                  <CardHeader className="p-0 relative">
                    <div className="relative h-72 w-full overflow-hidden">
                      <Image
                        src={product.image.url}
                        alt={product.title[lang]}
                        fill
                        objectFit="cover"
                        placeholder={
                          product.image.metadata?.lqip ? "blur" : "empty"
                        }
                        blurDataURL={product.image.metadata?.lqip}
                        className="transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-6 relative z-10">
                    <CardTitle className="text-2xl mb-4 group-hover:text-primary transition-colors duration-300">
                      {product.title[lang]}
                    </CardTitle>
                    <p className="text-muted-foreground line-clamp-3 group-hover:text-foreground transition-colors duration-300">
                      {product.description[lang]}
                    </p>
                    <div className="flex items-center mt-4 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                  <Separator className="w-[90%] mx-auto" />
                  <CardFooter className="p-6">
                    <Link
                      href={`/${lang}/products/${product.urlPath}`}
                      passHref
                      className="w-full"
                    >
                      <Button className="w-full group relative overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center w-full transition-transform duration-300 group-hover:translate-x-[-8px]">
                          {lang === "ar" ? "عرض التفاصيل" : "View Details"}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 bg-primary z-0 transition-transform duration-300 translate-x-full group-hover:translate-x-0" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
