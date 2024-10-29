import { TeamMember } from "@/lib/sanity/queries/getTeamSection";
import { ValidLocale } from "@/config/i18n-config";
import { TeamPersonCard } from "./team-card";
import { SectionContainer } from "../common/section-container";
import { Heading } from "../common/heading";

export function TeamList({
  title,
  members,
  lang,
}: {
  title: string;
  members: TeamMember[];
  lang: ValidLocale;
}) {
  return (
    <SectionContainer className="max-w-4xl w-4xl   relative bg-black-100 flex justify-center mx-auto items-center w-full flex-col overflow-hidden">
      <Heading duration={1.6} highlightColor="bg-primary/60" className="mb-4">
        {title}
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {members.map((member) => (
          <TeamPersonCard key={member._id} member={member} />
        ))}
      </div>
    </SectionContainer>
  );
}
