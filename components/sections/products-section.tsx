import { SectionContainer } from "../common/section-container";
import { Heading } from "../common/heading";
import { ProductsSectionType } from "@/types/types";
import ProductList from "../products/product-list";
import { ValidLocale } from "@/config/i18n-config";

interface ProductsSectionProps extends ProductsSectionType {
  lang: ValidLocale;
}

export function ProductsSection({
  heading,
  featuredProducts,
  specialWord,
  lang,
}: ProductsSectionProps) {
  console.log(heading[lang]);
  return (
    <SectionContainer>
      <Heading specialWord={specialWord ? specialWord[lang] : undefined}>
        {heading[lang]}
      </Heading>
      <ProductList products={featuredProducts} lang={lang} />
    </SectionContainer>
  );
}
