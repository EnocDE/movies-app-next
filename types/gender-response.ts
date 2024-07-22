import z from "zod"

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string()
})

export const GenresSchema = z.object({
  genres: z.array(GenreSchema)
})

export type GenreType = z.infer<typeof GenreSchema>
export type GenresType = z.infer<typeof GenresSchema>