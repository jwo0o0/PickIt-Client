import { css, Interpolation } from "styled-components";

/*
  small: 0px ~ 600px
  medium: 601px ~ 1119px
  large: 1200px ~
 */
const sizes: { [key: string]: number } = {
  desktop: 1281,
  laptop: 801,
  tablet: 501,
  mobile: 0,
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
