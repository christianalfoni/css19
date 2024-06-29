function pad(hash, len) {
  while (hash.length < len) {
    hash = "0" + hash;
  }
  return hash;
}

function fold(hash, text) {
  let i;
  let chr;
  let len;

  if (text.length === 0) {
    return hash;
  }

  for (i = 0, len = text.length; i < len; i++) {
    chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }

  return hash < 0 ? hash * -2 : hash;
}

function foldObject(hash, o) {
  function foldKey(hash, key) {
    return foldValue(hash, o[key], key);
  }

  return Object.keys(o).sort().reduce(foldKey, hash);
}

function foldValue(input, value, key) {
  const hash = fold(fold(fold(input, key), toString(value)), typeof value);

  if (value === null) {
    return fold(hash, "null");
  }

  if (value === undefined) {
    return fold(hash, "undefined");
  }

  if (typeof value === "object") {
    return foldObject(hash, value);
  }

  return fold(hash, value.toString());
}

function toString(o) {
  return Object.prototype.toString.call(o);
}

export function hash(o) {
  return pad(foldValue(0, o, "").toString(16), 8);
}
