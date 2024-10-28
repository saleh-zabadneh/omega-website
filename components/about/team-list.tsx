import { TeamMember } from "@/lib/sanity/queries/getTeamSection";
import { ValidLocale } from "@/config/i18n-config";
import { TeamPersonCard } from "./team-card";

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
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <TeamPersonCard key={member._id} member={member} />
        ))}
      </div>
    </div>
  );
}
