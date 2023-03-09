import chalk from "chalk"

const commands = `${chalk.bgCyan("命令格式")} 
  yarn hsu [command] <params>

${chalk.bgCyan("命令列表")}
  new <文章名>  创建一个新文章
  dev 直接启动开发服务器 可使用 ${chalk.cyan("--port=<端口>")} 指定端口
  build 执行博客构建
`

export default function GetCommands() {
  console.log(commands)
}