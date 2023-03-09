#! /usr/bin/env node

import chalk from "chalk"
import GetCommands from "./commands/comman.js"
import CreateNewBlog from "./commands/new.js"
import cp from "child_process"
import { stderr } from "process"
import { captureRejectionSymbol } from "events"




const [_1, _2, command, ...args] = process.argv

switch (command) {
  case 'n':
  case 'new':
    CreateNewBlog(args.join("-"))
    break

  case 'dev':
    cp.exec(`astro dev --host ${args.join(" ")}`).stdout.on("data", (data) => {
      console.log(`${data}`);
    })
    break;

  case 'help':
    GetCommands()
    break

  default:
    console.log(chalk.bold.bgRed(" ERROR ") + chalk.bold(" 未知指令！可以查看以下指令列表进行指令执行："))
    GetCommands()
    break
}
