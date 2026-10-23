import { useEffect, useRef } from 'react'
import { MdClose } from 'react-icons/md'
import type { WorkProject } from '../data/workProjects'

interface ProjectPreviewProps {
  project: WorkProject
  onClose: () => void
}

function stopLenisSmoothScroll(event: Event) {
  Object.assign(event, { lenisStopPropagation: true })
}

function ProjectPreview({ project, onClose }: ProjectPreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const PreviewContent = project.preview

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  useEffect(() => {
    const scrollY = window.scrollY
    const body = document.body
    const previousStyles = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    }

    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'

    return () => {
      body.style.position = previousStyles.position
      body.style.top = previousStyles.top
      body.style.width = previousStyles.width
      body.style.overflow = previousStyles.overflow
      window.scrollTo(0, scrollY)
    }
  }, [])

  const titleId = `${project.id}-preview-title`

  return (
    <dialog
      aria-labelledby={titleId}
      className="m-auto h-[min(85dvh,720px)] max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-1rem)] w-[calc(100%-2rem)] max-w-3xl overflow-hidden border border-rule bg-paper p-0 text-ink backdrop:bg-black/45 sm:max-h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom)-3rem)]"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close()
      }}
      ref={dialogRef}
    >
      <div className="flex h-full min-h-0 flex-col p-5 sm:p-8">
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-rule pb-5">
          <div>
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
              Interactive preview
            </p>
            <h2 className="font-editorial text-3xl tracking-[-0.04em] text-ink sm:text-4xl" id={titleId}>
              {project.title}
            </h2>
          </div>
          <button
            aria-label={`Close ${project.title} preview`}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-reduce:transition-none"
            onClick={() => dialogRef.current?.close()}
            type="button"
          >
            <MdClose aria-hidden="true" className="size-5" />
          </button>
        </div>
        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain touch-pan-y"
          data-lenis-prevent
          onWheelCapture={(event) => stopLenisSmoothScroll(event.nativeEvent)}
          onTouchMoveCapture={(event) => stopLenisSmoothScroll(event.nativeEvent)}
        >
          {project.previewInstructions ? (
            <p className="mt-4 text-[13px] leading-6 text-secondary sm:text-sm">
              {project.previewInstructions}
            </p>
          ) : null}
          {PreviewContent ? <PreviewContent /> : null}
        </div>
      </div>
    </dialog>
  )
}

export default ProjectPreview
