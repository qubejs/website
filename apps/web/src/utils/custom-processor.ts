import { utils } from '@qubejs/web-react';
import { GLOBAL_OPTIONS } from '../globals';
import { urlMapping } from '../config';

const { formatters } = utils.format;
const { DateTime } = utils.datetime;
const { object } = utils;

utils.processor.registerOptions(GLOBAL_OPTIONS);
