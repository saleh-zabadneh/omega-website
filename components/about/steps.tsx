import { details } from "@/constants";
import Image from "next/image";
export interface Step {
  _id: string;
  icon: { url: string };
  title: string;
}

interface StepsProps {
  steps: Step[];
}
export function Steps({ steps }: StepsProps) {
  return (
    <>
      {details.map(({ id, icon, title }) => (
        <li
          key={id}
          className="relative pt-16 text-white px-4 pb-14 overflow-hidden"
        >
          <div className="absolute top-8 bottom-0 left-1/2 bg-s3/20 w-[1px] h-full z-10" />

          <div className="flex items-center justify-center mx-auto mb-3 border-2 border-s2 rounded-full hover:border-s4 transition-all duration-500 shadow-500 size-20">
            <img
              src={icon}
              alt={title}
              className="size-17/20 object-contain z-20"
            />
          </div>

          <h3 className="relative z-2 max-w-36 mx-auto my-0 base-small text-center uppercase">
            {title}
          </h3>
        </li>
      ))}
    </>
  );
}
