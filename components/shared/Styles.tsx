import { css } from "@emotion/react";

export const Scroll = css`
  overflow-y: scroll;
  overflow-x: hidden;
  transition-property: color, scrollbar-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  scrollbar-width: thin;
  backface-visibility: hidden;
  color: var(--sectionLine);
  scrollbar-color: var(--sectionLine) transparent;
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    border: 1px solid transparent;
    box-shadow: inset 0 0 0 10px;
  }
  &::-webkit-scrollbar {
    width: 8px;
    height: 0px;
  }
`;
