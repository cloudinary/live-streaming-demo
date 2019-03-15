import React from 'react';
import { Button } from 'reactstrap';

export default ({
  color,
  bgColor,
  cls,
  history,
  to,
  type = 'button',
  children,
  doBefore
}) => {
  const style = {};
  if (color) {
    style.color = color;
  }

  if (bgColor) {
    style.backgroundColor = bgColor;
  }
  return (
    <Button
      style={style}
      color={color || 'primary'}
      className={'navbutton ' + cls}
      type={type}
      onClick={() => {
        if (doBefore) {
          doBefore();
        }
        history.push(to);
      }}
    >
      {children}
    </Button>
  );
};
