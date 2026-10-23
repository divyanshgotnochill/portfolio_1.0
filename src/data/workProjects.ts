import type { ComponentType } from 'react'
import BlogList from '../components/BlogList'

export interface WorkProject {
  id: string
  title: string
  description: string
  thumbnail: string
  thumbnailAlt: string
  technologies: string[]
  preview?: ComponentType
  previewInstructions?: string
  demoUrl?: string
  sourceUrl?: string
}

export const workProjects: WorkProject[] = [
  {
    id: 'blog-list',
    title: 'Blog List',
    description: 'An editorial blog index with a pointer-following image preview.',
    thumbnail: '/images/project-thumnail/blog-ss.png',
    thumbnailAlt: 'A sample article thumbnail from the Blog List project',
    technologies: ['React', 'TypeScript', 'Motion', 'Tailwind CSS'],
    preview: BlogList,
    previewInstructions: 'Move across a title to preview its image. On touch screens, tap a title.',
  },
]
