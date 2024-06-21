type AtRules =
  | "@container"
  | "@layer"
  | "@media"
  | "@scope"
  | "@starting-style"
  | "@supports"
  | "@-moz-document";

type AtRuleString = `${AtRules} ${string}`;

type Selectors = "&" | "#" | "." | "[" | ":" | ">" | "+" | "~" | "*";

type HTMLTagNames = Exclude<keyof JSX.IntrinsicElements, "filter">;

type SelectorString = `${Selectors}${string}`;

export type CSSProp = Omit<React.CSSProperties, "filter"> & {
  [Key in AtRuleString | SelectorString | HTMLTagNames]?: CSSProp;
} & {
  filter?: React.CSSProperties["filter"] | CSSProp;
};

export declare namespace CSSPropJSX {
  export type Element = React.JSX.Element;
  export type ElementType = React.JSX.ElementType;
  export type ElementClass = React.JSX.ElementClass;
  export type ElementAttributesProperty = React.JSX.ElementAttributesProperty;
  export type ElementChildrenAttribute = React.JSX.ElementChildrenAttribute;
  export type LibraryManagedAttributes<C, P> =
    React.JSX.LibraryManagedAttributes<C, P>;
  export type IntrinsicAttributes = React.JSX.IntrinsicAttributes;
  export type IntrinsicClassAttributes<T> =
    React.JSX.IntrinsicClassAttributes<T>;
  export type IntrinsicElements = {
    [K in keyof JSX.IntrinsicElements]: React.JSX.IntrinsicElements[K] & {
      css?: CSSProp;
    };
  };
}
