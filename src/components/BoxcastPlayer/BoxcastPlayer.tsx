import React from "react";

export interface BoxCastPlayerProps {
  label: string;
}

const BoxCastPlayer = (props: BoxCastPlayerProps) => {
  return <button>{props.label}</button>;
};

export default BoxCastPlayer;