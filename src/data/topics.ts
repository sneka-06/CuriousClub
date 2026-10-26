export type Topic = {
  id: number
  title: string
  category: string
  count: number
  addedAt: number
}

export const initialTopics: Topic[] = [
  { id: 1, title: 'Learning generative AI', category: 'Technology', count: 128, addedAt: 4 },
  { id: 2, title: 'Getting better at UI/UX design', category: 'Design', count: 96, addedAt: 7 },
  { id: 3, title: 'Building my first full-stack app', category: 'Technology', count: 84, addedAt: 2 },
  { id: 4, title: 'Understanding personal finance', category: 'Life skills', count: 112, addedAt: 9 },
  { id: 5, title: 'Learning Blender and 3D design', category: 'Creative', count: 67, addedAt: 6 },
  { id: 6, title: 'Becoming a better public speaker', category: 'Communication', count: 74, addedAt: 8 },
  { id: 7, title: 'Exploring photography', category: 'Creative', count: 58, addedAt: 3 },
  { id: 8, title: 'Building AI agents', category: 'Technology', count: 103, addedAt: 10 },
  { id: 9, title: 'Learning cloud computing', category: 'Technology', count: 49, addedAt: 5 },
  { id: 10, title: 'Writing more consistently', category: 'Writing', count: 91, addedAt: 1 },
]
