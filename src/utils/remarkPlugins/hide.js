import { h } from 'hastscript'

export function hide(node) {
  const data = node.data || (node.data = {})
  node.children[0].data.hName = 'summary'
  data.hName = 'details'
}