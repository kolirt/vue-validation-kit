type Rule = {
  name: string
  validate: (fieldValue: unknown) => boolean
  options?: Record<string, any>
}

export type { Rule }
