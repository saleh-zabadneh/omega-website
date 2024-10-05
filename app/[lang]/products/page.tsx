import { Heading } from "@/components/common/heading";
import { Paragraph } from "@/components/common/paragraph";
import { SectionContainer } from "@/components/common/section-container";
import ProductList from "@/components/products/product-list";
import { ValidLocale } from "@/config/i18n-config";
import { getProducts } from "@/lib/sanity/queries/products";
import { Metadata } from "next";

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

  return (
    <main className="relative bg-black-100 flex justify-center mx-auto items-center flex-col overflow-hidden">
      <SectionContainer>
        <Heading specialWord={lang === "ar" ? "الرائجة" : "special"}>
          {lang === "ar" ? "المنتجات الخاصة بنا" : "our products"}
        </Heading>
        <Paragraph className="text-sm">
          {lang === "ar" ? "جميع المنتجات الخاصة بنا " : "all of products"}
        </Paragraph>
        <ProductList products={products} lang={lang} />
      </SectionContainer>
    </main>
  );
}
