import yaml from 'js-yaml';
import fs from 'fs';
const configs = yaml.load(fs.readFileSync('theme_config.yml', 'utf8'));
export {configs};
