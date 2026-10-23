import { useState } from 'react'
import ProjectCard from './ProjectCard'
import ProjectPreview from './ProjectPreview'
import { workProjects, type WorkProject } from '../data/workProjects'

function Work() {
  const [activeProject, setActiveProject] = useState<WorkProject | null>(null)

  return (
    <section aria-labelledby="work-title" className="py-14 sm:py-20" id="work">
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
        Selected work
      </p>
      <h1
        className="font-editorial text-3xl tracking-[-0.04em] text-ink sm:text-4xl"
        id="work-title"
      >
        Work
      </h1>
      <p className="mt-4 max-w-140 text-[14px] leading-7 text-secondary sm:text-base">
        Things I worked on.
      </p>

      <div className="mt-8 space-y-6">
        {workProjects.map((project) => (
          <ProjectCard
            key={project.id}
            onOpenPreview={setActiveProject}
            project={project}
          />
        ))}
      </div>

      {activeProject ? (
        <ProjectPreview
          key={activeProject.id}
          onClose={() => setActiveProject(null)}
          project={activeProject}
        />
      ) : null}
    </section>
  )
}

export default Work
