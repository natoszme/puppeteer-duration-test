import Promise from "bluebird";
import prettyHrtime from "pretty-hrtime";

export default (prefix) => {
  const debug = require("debug")("api:profile:" + prefix);

  return (label, fn) => {
    const start = process.hrtime();
    const printDuration = (status) => {
      const end = process.hrtime(start);
      return debug("%s %o", label, { status, duration: prettyHrtime(end) });
    };
    return Promise.resolve(fn())
      .tap(() => printDuration(true))
      .catch(err => { printDuration(false); throw err; });
  };
};
