export function bili(node) {
  if (node.type !== 'leafDirective') throw (`[${node.type}] for [${node.name}] not supported!`)
  const data = node.data || (node.data = {})

  data.hName = 'iframe'
  data.hProperties = {
    src: "//player.bilibili.com/player.html?bvid=" + node.attributes.id,
    scrolling: "no",
    border: "0",
    frameborder: "no",
    framespacing: "0",
    allowfullscreen: "true"
  }
}