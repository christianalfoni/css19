import hash from "hash-sum";
import { CSSProp } from "./types";
export type { CSSProp } from "./types";

export function css<T extends CSSProp>(css: T): T & { toString(): string } {
  const cssHash = hash(css);

  css.toString = () => ".css-" + cssHash;

  return css;
}
