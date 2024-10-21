import { ColorTypes, TextTypes } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ColorTypes;
    texts: TextTypes;
  }
}
