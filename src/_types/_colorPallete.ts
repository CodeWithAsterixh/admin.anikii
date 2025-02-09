export type JsonSyntaxPalette = {
  key: string // Property keys
  string: string // String values
  number: string // Numeric values
  boolean: string // Boolean values (true/false)
  null: string // Null values
}

export type JsonSyntaxPalettes = {
  [paletteName: string]: JsonSyntaxPalette
}
