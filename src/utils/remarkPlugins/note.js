import { h } from 'hastscript'
export function note(node) {
  const data = node.data || (node.data = {})

  data.hName = 'div'
  // data.hProperties = h('div', node.attributes).properties
}