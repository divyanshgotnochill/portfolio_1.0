import type { WorkProject } from '../data/workProjects'

interface ProjectCardProps {
  project: WorkProject
  onOpenPreview: (project: WorkProject) => void
}

function ProjectCard({ project, onOpenPreview }: ProjectCardProps) {
  return (
    <article className="w-full rounded-lg border border-rule bg-surface">
      <img
        alt={project.thumbnailAlt}
        className="aspect-video w-full border-b border-rule object-cover"
        height="176"
        src={project.thumbnail}
        width="280"
      />
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h2 className="font-editorial text-2xl tracking-[-0.03em] text-ink sm:text-[1.7rem]">
            {project.title}
          </h2>
          {project.preview ? (
            <button
              aria-haspopup="dialog"
              className="inline-flex min-h-10 items-center rounded-sm px-3 py-2 text-xs text-secondary transition-colors hover:border-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
              onClick={() => onOpenPreview(project)}
              type="button"
            >
              Open Preview <span aria-hidden="true" className="ml-1">↗</span>
            </button>
          ) : null}
        </div>
        <p className="mt-2 text-[13px] leading-6 text-secondary sm:text-sm">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.12em] text-muted">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        {project.demoUrl || project.sourceUrl ? (
          <div className="mt-4 flex gap-4 text-xs text-secondary">
            {project.demoUrl ? (
              <a className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" href={project.demoUrl} rel="noreferrer" target="_blank">
                Live demo ↗
              </a>
            ) : null}
            {project.sourceUrl ? (
              <a className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink" href={project.sourceUrl} rel="noreferrer" target="_blank">
                Source code ↗
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export default ProjectCard
