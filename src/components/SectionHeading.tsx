import type { ReactNode } from "react";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  body?: string;
  action?: ReactNode;
};

export default function SectionHeading({
  kicker,
  title,
  body,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl space-y-2">
        <p className="kicker">{kicker}</p>
        <h2 className="display text-3xl text-cream md:text-4xl">{title}</h2>
        {body ? <p className="text-sm leading-relaxed text-stone">{body}</p> : null}
      </div>
      {action}
    </div>
  );
}
