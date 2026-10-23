export type BlogPost = {
  id: string
  title: string
  category: string
  date: string
  readTime: string
  thumbnail: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '01',
    title: 'Glasshouses in the fog',
    category: 'Architecture',
    date: 'Oct 12, 2026',
    readTime: '6 min',
    thumbnail: '/images/blog-list/01.jpg',
  },
  {
    id: '02',
    title: 'A kitchen that remembers summers',
    category: 'Food',
    date: 'Sep 28, 2026',
    readTime: '8 min',
    thumbnail: '/images/blog-list/02.jpg',
  },
  {
    id: '03',
    title: 'Night trains and sodium light',
    category: 'Travel',
    date: 'Sep 04, 2026',
    readTime: '11 min',
    thumbnail: '/images/blog-list/03.jpg',
  },
  {
    id: '04',
    title: 'The slow geometry of tide pools',
    category: 'Nature',
    date: 'Aug 19, 2026',
    readTime: '5 min',
    thumbnail: '/images/blog-list/04.jpg',
  },
  {
    id: '05',
    title: 'Type, paper, and the last analog hour',
    category: 'Design',
    date: 'Jul 30, 2026',
    readTime: '9 min',
    thumbnail: '/images/blog-list/05.jpg',
  },
  {
    id: '06',
    title: 'Listening rooms after midnight',
    category: 'Music',
    date: 'Jul 08, 2026',
    readTime: '7 min',
    thumbnail: '/images/blog-list/06.jpg',
  },
]
