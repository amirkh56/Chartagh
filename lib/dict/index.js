import fa from './fa';
import en from './en';

const DICTS = { fa, en };
export const getDict = (lang) => DICTS[lang] ?? fa;
