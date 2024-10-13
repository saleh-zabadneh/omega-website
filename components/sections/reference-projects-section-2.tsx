import { ValidLocale } from "@/config/i18n-config";
import ReferenceProjectCard2, {
  ReferenceProject2,
} from "../reference-projects/reference-projects-card-2";
import { LocaleString } from "@/types/types";

export interface ReferenceProjectSection2Props {
  _type: "referenceProjectSection2";
  id: string;
  lang: ValidLocale;
  heading: LocaleString;
  specialWord?: LocaleString;
  referenceProjects: ReferenceProject2[];
}

export default function ReferenceProjectSection2({
  id,
  lang,
  heading,
  specialWord,
  referenceProjects,
}: ReferenceProjectSection2Props) {
  console.log(referenceProjects);
  return (
    <section id={id} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {heading[lang]}
          {specialWord && (
            <span className="text-primary">{specialWord[lang]}</span>
          )}
        </h2>

        {referenceProjects?.map((project) => (
          <ReferenceProjectCard2
            key={project._id}
            project={project}
            lang={lang}
          />
        ))}
      </div>
    </section>
  );
}
