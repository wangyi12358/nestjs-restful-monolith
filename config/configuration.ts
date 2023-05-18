import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as process from 'process';

let env = 'dev';
if (process.env.ENV) {
  env = process.env.ENV;
}

const YAML_CONFIG_FILENAME = `config.${env}.yaml`;

export default () => {
  return yaml.load(
    readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
  ) as Record<string, any>;
};
