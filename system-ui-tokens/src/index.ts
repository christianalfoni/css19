import type { CSSSelectors } from "@css19/css";
import { createTokens as baseCreateTokens } from "@css19/tokens";

type SystemUI = {
  colors?: Record<string, string>;
  fonts?: Record<string, string>;
  fontSizes?: Record<string, string | number>;
  fontWeights?: Record<string, string | number>;
  lineHeights?: Record<string, string | number>;
  letterSpacings?: Record<string, string | number>;
  radii?: Record<string, string | number>;
  sizes?: Record<string, string | number>;
  space?: Record<string, string | number>;
  zIndices?: Record<string, number>;
  shadows?: Record<string, string>;
  transitions?: Record<string, string>;
  borderWidths?: Record<string, string | number>;
  borderStyles?: Record<string, string>;
};

const cssPropToTokensMapping = {
  // Colors
  color: "colors",
  backgroundColor: "colors",
  borderColor: "colors",
  borderBottomColor: "colors",
  borderLeftColor: "colors",
  borderRightColor: "colors",
  borderTopColor: "colors",
  caretColor: "colors",
  columnRuleColor: "colors",
  fill: "colors",
  outlineColor: "colors",
  stroke: "colors",
  textDecorationColor: "colors",
  // Fonts
  fontFamily: "fonts",
  // FontSizes
  fontSize: "fontSizes",
  // FontWeights
  fontWeight: "fontWeights",
  // LineHeights
  lineHeight: "lineHeights",
  // LetterSpacings
  letterSpacing: "letterSpacings",
  // Radii
  borderRadius: "radii",
  borderTopLeftRadius: "radii",
  borderTopRightRadius: "radii",
  borderBottomRightRadius: "radii",
  borderBottomLeftRadius: "radii",
  // Sizes
  blockSize: "sizes",
  minBlockSize: "sizes",
  maxBlockSize: "sizes",
  inlineSize: "sizes",
  minInlineSize: "sizes",
  maxInlineSize: "sizes",
  width: "sizes",
  minWidth: "sizes",
  maxWidth: "sizes",
  height: "sizes",
  minHeight: "sizes",
  maxHeight: "sizes",
  flexBasis: "sizes",
  gridTemplateColumns: "sizes",
  gridTemplateRows: "sizes",
  // Space
  gap: "space",
  gridGap: "space",
  columnGap: "space",
  gridColumnGap: "space",
  rowGap: "space",
  gridRowGap: "space",
  inset: "space",
  insetBlock: "space",
  insetBlockEnd: "space",
  insetBlockStart: "space",
  insetInline: "space",
  insetInlineEnd: "space",
  insetInlineStart: "space",
  margin: "space",
  marginTop: "space",
  marginRight: "space",
  marginBottom: "space",
  marginLeft: "space",
  marginBlock: "space",
  marginBlockEnd: "space",
  marginBlockStart: "space",
  marginInline: "space",
  marginInlineEnd: "space",
  marginInlineStart: "space",
  padding: "space",
  paddingTop: "space",
  paddingRight: "space",
  paddingBottom: "space",
  paddingLeft: "space",
  paddingBlock: "space",
  paddingBlockEnd: "space",
  paddingBlockStart: "space",
  paddingInline: "space",
  paddingInlineEnd: "space",
  paddingInlineStart: "space",
  top: "space",
  right: "space",
  bottom: "space",
  left: "space",
  scrollMargin: "space",
  scrollMarginTop: "space",
  scrollMarginRight: "space",
  scrollMarginBottom: "space",
  scrollMarginLeft: "space",
  scrollMarginX: "space",
  scrollMarginY: "space",
  scrollMarginBlock: "space",
  scrollMarginBlockEnd: "space",
  scrollMarginBlockStart: "space",
  scrollMarginInline: "space",
  scrollMarginInlineEnd: "space",
  scrollMarginInlineStart: "space",
  scrollPadding: "space",
  scrollPaddingTop: "space",
  scrollPaddingRight: "space",
  scrollPaddingBottom: "space",
  scrollPaddingLeft: "space",
  scrollPaddingX: "space",
  scrollPaddingY: "space",
  scrollPaddingBlock: "space",
  scrollPaddingBlockEnd: "space",
  scrollPaddingBlockStart: "space",
  scrollPaddingInline: "space",
  scrollPaddingInlineEnd: "space",
  scrollPaddingInlineStart: "space",
  // ZIndices
  zIndex: "zIndices",
  // Shadows
  boxShadow: "shadows",
  textShadow: "shadows",
  // Transitions
  transitions: "transitions",
  // BorderWidths
  borderWidth: "borderWidths",
  borderTopWidth: "borderWidths",
  borderRightWidth: "borderWidths",
  borderBottomWidth: "borderWidths",
  borderLeftWidth: "borderWidths",
  // BorderStyles
  borderStyle: "borderStyles",
  borderTopStyle: "borderStyles",
  borderRightStyle: "borderStyles",
  borderBottomStyle: "borderStyles",
  borderLeftStyle: "borderStyles",
};

function replaceTokens(css: any, tokens: any) {
  for (let key in css) {
    if (typeof css[key] === "object") {
      replaceTokens(css[key], tokens);
      continue;
    }

    const mapping = cssPropToTokensMapping[key];

    if (!mapping) {
      continue;
    }

    const tokenValue = tokens[mapping][css[key]];

    if (!tokenValue) {
      throw new Error(
        `The CSS property "${key}" has an invalid token value of "${css[key]}"`
      );
    }

    css[key] = tokenValue;
  }

  return css;
}

export function createTokens<T extends SystemUI>(tokens: T) {
  const [evaluatedTokens, style] = baseCreateTokens(tokens);

  function css(
    css: CSSSelectors<
      React.CSSProperties &
        (T["colors"] extends {}
          ? {
              color?: keyof T["colors"];
              backgroundColor?: keyof T["colors"];
              borderColor?: keyof T["colors"];
              borderBottomColor?: keyof T["colors"];
              borderLeftColor?: keyof T["colors"];
              borderRightColor?: keyof T["colors"];
              borderTopColor?: keyof T["colors"];
              caretColor?: keyof T["colors"];
              columnRuleColor?: keyof T["colors"];
              fill?: keyof T["colors"];
              outlineColor?: keyof T["colors"];
              stroke?: keyof T["colors"];
              textDecorationColor?: keyof T["colors"];
            }
          : {}) &
        (T["fonts"] extends {}
          ? {
              fontFamily?: keyof T["fonts"];
            }
          : {}) &
        (T["fontSizes"] extends {}
          ? {
              fontSize?: keyof T["fontSizes"];
            }
          : {}) &
        (T["fontWeights"] extends {}
          ? {
              fontWeight?: keyof T["fontWeights"];
            }
          : {}) &
        (T["lineHeights"] extends {}
          ? {
              lineHeight?: keyof T["lineHeights"];
            }
          : {}) &
        (T["letterSpacings"] extends {}
          ? {
              letterSpacing?: keyof T["letterSpacings"];
            }
          : {}) &
        (T["radii"] extends {}
          ? {
              borderRadius?: keyof T["radii"];
              borderTopLeftRadius?: keyof T["radii"];
              borderTopRightRadius?: keyof T["radii"];
              borderBottomRightRadius?: keyof T["radii"];
              borderBottomLeftRadius?: keyof T["radii"];
            }
          : {}) &
        (T["sizes"] extends {}
          ? {
              blockSize?: keyof T["sizes"];
              minBlockSize?: keyof T["sizes"];
              maxBlockSize?: keyof T["sizes"];
              inlineSize?: keyof T["sizes"];
              minInlineSize?: keyof T["sizes"];
              maxInlineSize?: keyof T["sizes"];
              width?: keyof T["sizes"];
              minWidth?: keyof T["sizes"];
              maxWidth?: keyof T["sizes"];
              height?: keyof T["sizes"];
              minHeight?: keyof T["sizes"];
              maxHeight?: keyof T["sizes"];
              flexBasis?: keyof T["sizes"];
              gridTemplateColumns?: keyof T["sizes"];
              gridTemplateRows?: keyof T["sizes"];
            }
          : {}) &
        (T["space"] extends {}
          ? {
              gap?: "space";
              gridGap?: "space";
              columnGap?: "space";
              gridColumnGap?: "space";
              rowGap?: "space";
              gridRowGap?: "space";
              inset?: "space";
              insetBlock?: "space";
              insetBlockEnd?: "space";
              insetBlockStart?: "space";
              insetInline?: "space";
              insetInlineEnd?: "space";
              insetInlineStart?: "space";
              margin?: "space";
              marginTop?: "space";
              marginRight?: "space";
              marginBottom?: "space";
              marginLeft?: "space";
              marginBlock?: "space";
              marginBlockEnd?: "space";
              marginBlockStart?: "space";
              marginInline?: "space";
              marginInlineEnd?: "space";
              marginInlineStart?: "space";
              padding?: "space";
              paddingTop?: "space";
              paddingRight?: "space";
              paddingBottom?: "space";
              paddingLeft?: "space";
              paddingBlock?: "space";
              paddingBlockEnd?: "space";
              paddingBlockStart?: "space";
              paddingInline?: "space";
              paddingInlineEnd?: "space";
              paddingInlineStart?: "space";
              top?: "space";
              right?: "space";
              bottom?: "space";
              left?: "space";
              scrollMargin?: "space";
              scrollMarginTop?: "space";
              scrollMarginRight?: "space";
              scrollMarginBottom?: "space";
              scrollMarginLeft?: "space";
              scrollMarginX?: "space";
              scrollMarginY?: "space";
              scrollMarginBlock?: "space";
              scrollMarginBlockEnd?: "space";
              scrollMarginBlockStart?: "space";
              scrollMarginInline?: "space";
              scrollMarginInlineEnd?: "space";
              scrollMarginInlineStart?: "space";
              scrollPadding?: "space";
              scrollPaddingTop?: "space";
              scrollPaddingRight?: "space";
              scrollPaddingBottom?: "space";
              scrollPaddingLeft?: "space";
              scrollPaddingX?: "space";
              scrollPaddingY?: "space";
              scrollPaddingBlock?: "space";
              scrollPaddingBlockEnd?: "space";
              scrollPaddingBlockStart?: "space";
              scrollPaddingInline?: "space";
              scrollPaddingInlineEnd?: "space";
              scrollPaddingInlineStart?: "space";
            }
          : {}) &
        (T["zIndices"] extends {}
          ? {
              zIndex?: keyof T["zIndices"];
            }
          : {}) &
        (T["shadows"] extends {}
          ? {
              boxShadow?: keyof T["shadows"];
              textShadow?: keyof T["shadows"];
            }
          : {}) &
        (T["transitions"] extends {}
          ? {
              transitions?: keyof T["transitions"];
            }
          : {}) &
        (T["borderWidths"] extends {}
          ? {
              borderWidth?: keyof T["borderWidths"];
              borderTopWidth?: keyof T["borderWidths"];
              borderRightWidth?: keyof T["borderWidths"];
              borderBottomWidth?: keyof T["borderWidths"];
              borderLeftWidth?: keyof T["borderWidths"];
            }
          : {}) &
        (T["borderStyles"] extends {}
          ? {
              borderStyle?: keyof T["borderStyles"];
              borderTopStyle?: keyof T["borderStyles"];
              borderRightStyle?: keyof T["borderStyles"];
              borderBottomStyle?: keyof T["borderStyles"];
              borderLeftStyle?: keyof T["borderStyles"];
            }
          : {})
    >
  ) {
    return replaceTokens(css, evaluatedTokens);
  }

  return [css, evaluatedTokens, style] as const;
}
