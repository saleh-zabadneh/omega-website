import React from "react";
import { WorkExperience } from "@/lib/sanity/queries/aboutWork";

interface WorkExperienceProps {
  workExperience: WorkExperience[];
}

interface CustomButtonProps {
  children: React.ReactNode;
  duration: number;
  borderRadius: string;
  style: React.CSSProperties;
  className: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  duration,
  borderRadius,
  style,
  className,
}) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        transition: `all ${duration} ms ease-in-out`,
        borderRadius: borderRadius,
      }}
    >
      {children}
    </div>
  );
};

export default function WorkExperienceComponent({
  workExperience,
}: WorkExperienceProps) {
  return (
    <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
      {workExperience.map((card) => (
        <CustomButton
          key={card._id}
          duration={Math.floor(Math.random() * 10000) + 10000}
          borderRadius="1.75rem"
          style={{
            background: "rgb(4,7,29)",
            backgroundImage:
              "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
          }}
          className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
            <img
              src={card?.thumbnail?.asset?.url}
              alt={card.title}
              className="lg:w-32 md:w-20 w-16"
            />
            <div className="lg:ms-5">
              <h2 className="text-start text-xl md:text-2xl font-bold text-white">
                {card.title}
              </h2>
              <p className="text-start text-white-100 mt-3 font-semibold">
                {card.description}
              </p>
            </div>
          </div>
        </CustomButton>
      ))}
    </div>
  );
}
