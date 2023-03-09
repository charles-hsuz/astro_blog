import yaml from 'js-yaml';
import fs from 'fs';
const configs = yaml.load(fs.readFileSync('theme_config.yml', 'utf8'));
export {configs};

// declare

export interface sidebar{
  author: boolean,
  articles: boolean,
  categories: boolean,
  tags: boolean,
  archives: boolean,
  webinfo: boolean
}

