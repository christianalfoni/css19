import hash from "hash-sum";
import { CSSProp } from "./types";
export type { CSSProp } from "./types";

export function css<T extends CSSProp>(css: T): T & { toString(): string } {
  css.toString = () => "." + hash(css);

  return css;
}
