import { ValidLocale } from "@/config/i18n-config";
import Header from "./Header";
import {
  getSettingsData,
  SettingsData,
} from "@/lib/sanity/queries/productsNavNames";

interface HeaderWrapperProps {
  lang: ValidLocale;
}

export default async function HeaderWrapper({ lang }: HeaderWrapperProps) {
  const settingsData: SettingsData = await getSettingsData(lang);

  return (
    <Header
      lang={lang}
      dynamicProducts={settingsData.productsNavNames}
      showLanguageSwitcher={settingsData.showLanguageSwitcher}
    />
  );
}
