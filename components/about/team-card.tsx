import { TeamMember } from "@/lib/sanity/queries/getTeamMember";
import Image from "next/image";

export function TeamPersonCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-card border-2 border-primary p-1 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Image
        src={member.image}
        alt={member.name}
        width={200}
        height={200}
        className="w-full h-44 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
        <p className="text-muted-foreground mb-2">{member.position}</p>
        {/* <p className="text-sm text-muted-foreground line-clamp-3">
          {member.description}
        </p> */}
      </div>
    </div>
  );
}
