import { css, Interpolation } from "styled-components";

/*
  small: 0px ~ 768px
  medium: 769px ~ 1119px
  large: 1200px ~
 */
const sizes: { [key: string]: number } = {
  large: 1200,
  medium: 769,
  small: 0,
};
type SimpleInterpolation = Interpolation<object>;
export type Media = {
  [key: string]: (...args: Parameters<typeof css>) => SimpleInterpolation;
};

export const media = Object.keys(sizes).reduce((acc: Media, label: string) => {
  acc[label] = (...args: Parameters<typeof css>) => css`
    @media screen and (min-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {} as Media);
