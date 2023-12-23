/**
 *
 * @param {Date} start
 * @param {Number} expires expires after seconds
 * @returns
 */
const isExpired = (start, expires) => {
  return (
    Date.now() >= new Date(start).getMilliseconds() + Number(expires) * 1000
  );
};
