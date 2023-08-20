import React from "react";

import CheckedSvg from "@/images/checked.svg";
import UncheckedSvg from "@/images/unchecked.svg";

interface Props {
  className?: string;
  checked?: boolean;
}

const CheckBox = ({ className, checked }: Props) => {
  if (checked) return <CheckedSvg className={className}></CheckedSvg>;
  else return <UncheckedSvg className={className}></UncheckedSvg>;
};

export default CheckBox;
