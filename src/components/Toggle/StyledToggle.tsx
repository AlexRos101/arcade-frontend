import styled from "styled-components";
import { ToggleProps, HandleProps, InputProps, ScaleKeys, scales } from "./types";

const scaleKeyValues = {
  sm: {
    handleBorderRadius: "50%",
    handleHeight: "16px",
    handleWidth: "16px",
    handleLeft: "2px",
    handleTop: "2px",
    checkedLeft: "calc(100% - 18px)",
    toggleHeight: "20px",
    toggleWidth: "36px",
  },
  md: {
    handleBorderRadius: "14.5px",
    handleHeight: "21px",
    handleWidth: "29px",
    handleLeft: "3px",
    handleTop: "3px",
    checkedLeft: "calc(100% - 30px)",
    toggleHeight: "27px",
    toggleWidth: "66px",
  },
  lg: {
    handleBorderRadius: "16px",
    handleHeight: "26px",
    handleWidth: "32px",
    handleLeft: "4px",
    handleTop: "4px",
    checkedLeft: "calc(100% - 36px)",
    toggleHeight: "32px",
    toggleWidth: "72px",
  },
};

const getScale =
  (property: ScaleKeys) =>
  ({ scale = scales.LG }: ToggleProps) => {
    return scaleKeyValues[scale][property];
  };

export const Handle = styled.div<HandleProps>`
  background-color: ${({ checked }) => checked ? 'rgba(36, 182, 153, 1)' : 'rgba(191, 191, 191, 1)'};
  border-radius: ${getScale("handleBorderRadius")};
  cursor: pointer;
  height: ${getScale("handleHeight")};
  left: ${getScale("handleLeft")};
  position: absolute;
  top: ${getScale("handleTop")};
  transition: left 200ms ease-in;
  width: ${getScale("handleWidth")};
  z-index: 1;
`;

export const Input = styled.input<InputProps>`
  cursor: pointer;
  opacity: 0;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 3;

  &:checked + ${Handle} {
    left: ${getScale("checkedLeft")};
  }

  &:focus + ${Handle} {
    box-shadow: '0px 0px 0px 1px #7645D9, 0px 0px 0px 4px rgba(118, 69, 217, 0.6)';
  }

  &:hover + ${Handle}:not(:disabled):not(:checked) {
    box-shadow: '0px 0px 0px 1px #7645D9, 0px 0px 0px 4px rgba(118, 69, 217, 0.6)';
  }
`;

const StyledToggle = styled.div<ToggleProps>`
  align-items: center;
  background-color: rgba(243, 241, 235, 1);
  border-radius: 24px;
  box-shadow: rgb(74 74 104 / 10%) 0px 2px 2px -1px;
  cursor: pointer;
  display: inline-flex;
  height: ${getScale("toggleHeight")};
  position: relative;
  transition: background-color 200ms;
  width: ${getScale("toggleWidth")};
`;

export default StyledToggle;
