import type { SkillIconData } from "@/lib/skill-icons";

type SkillIconProps = {
  icon: SkillIconData;
  size?: number;
};

export default function SkillIcon({ icon, size = 18 }: SkillIconProps) {
  if (icon.path) {
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        aria-hidden
        fill="currentColor"
      >
        <path d={icon.path} />
      </svg>
    );
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      fill="currentColor"
      dangerouslySetInnerHTML={{ __html: icon.body ?? "" }}
    />
  );
}
