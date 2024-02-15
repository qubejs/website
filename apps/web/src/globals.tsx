import { globals, utils } from '@qubejs/web-react';

const { translate } = utils.translate;
const { formatters } = utils.format;

export const CONSTANTS = {
  ...globals.CONSTANTS,
};

export const GLOBAL_OPTIONS = {
  ...globals.GLOBAL_OPTIONS,
};

utils.processor.registerOptions(GLOBAL_OPTIONS);
