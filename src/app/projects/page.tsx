import Reveal from "@/components/Reveal";
import ProjectsGrid from "@/components/ProjectsGrid";
import { projects } from "@/lib/site";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-16">
      <Reveal className="max-w-2xl space-y-4">
        <p className="kicker">Projects</p>
        <h1 className="display text-4xl text-cream md:text-6xl">
          Platforms I built, systems I shipped.
        </h1>
        <p className="text-sm leading-relaxed text-stone">
          Kingdom Code is the LLC: consulting plus products still in production —
          Kingdom Keys, Righteous Reviews, and Stats Hub. The Go MCP proxy is
          public. The rest ran at PrizePicks, LTK, Vitable, DVx, Cork, and MANTL.
        </p>
      </Reveal>

      <ProjectsGrid projects={projects} />
    </div>
  );
}
