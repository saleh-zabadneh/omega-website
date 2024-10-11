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

export function ProductsSection({
  heading,
  featuredProducts,
  specialWord,
  lang,
}: ProductsSectionProps) {
  return (
    <SectionContainer>
      <Heading specialWord={specialWord ? specialWord[lang] : undefined}>
        {heading[lang]}
      </Heading>
      <ProductList products={featuredProducts} lang={lang} />
      <Link href={`/${lang}/products`} passHref>
        <Button className="bg-brand mx-auto flex justify-center capitalize text-lg">
          {getTranslation(lang, "shared", "explore_products")}
        </Button>
      </Link>
    </SectionContainer>
  );
}
