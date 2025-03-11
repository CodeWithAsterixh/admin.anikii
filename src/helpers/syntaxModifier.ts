import type { JsonSyntaxPalette } from '@/_types/_colorPallete'

export function syntaxHighlight(palette: JsonSyntaxPalette, json?: object) {
  const jsonStr = JSON.stringify(json, null, 4)
  return jsonStr.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d*)?([eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = palette.string // Default for strings

      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = palette.key // Keys
        } else {
          cls = palette.string // String values
        }
      } else if (/true|false/.test(match)) {
        cls = palette.boolean // Booleans
      } else if (/null/.test(match)) {
        cls = palette.null // Null values
      } else if (/-?\d+(\.\d*)?([eE][+\-]?\d+)?/.test(match)) {
        cls = palette.number // Numbers
      }
      return `<span style='color:${cls} ;'>${match}</span>`
    },
  )
}
