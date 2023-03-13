import { visit } from 'unist-util-visit'
import { bili } from './bili'
import { note } from './note'
import { hide } from './hide'

const trans = {
  'note': note,
  'bili': bili,
  'hide': hide
}
export function remarkCustomPlugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        if (!trans[node.name]) return
        trans[node.name](node)
      }
    })
  }
};