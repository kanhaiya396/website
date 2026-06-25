/**
 * Tiny logger that no-ops debug/info/warn in production builds but always
 * surfaces errors. Use this instead of bare `console.*` so production bundles
 * stay quiet without losing the ability to debug locally.
 */
const isProd = import.meta.env.PROD;

type LogFn = (...args: unknown[]) => void;

const noop: LogFn = () => {};

export const logger = {
  debug: (isProd ? noop : console.debug.bind(console)) as LogFn,
  info: (isProd ? noop : console.info.bind(console)) as LogFn,
  warn: (isProd ? noop : console.warn.bind(console)) as LogFn,
  error: console.error.bind(console) as LogFn,
};

export default logger;
