import React, { ReactNode } from 'react';

interface CornerBorderProps {
  children: ReactNode;
  size?: string;
  color?: string;
  thickness?: string;
}

const CornerBorder: React.FC<CornerBorderProps> = ({
  children,
  size = '20px',
  color = 'white',
  thickness = '4px',
}) => {
  const cornerStyle = (position: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute',
    width: size,
    height: size,
    backgroundColor: 'transparent',
    border: `${thickness} solid ${color}`,
    ...position,
  });

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    padding: `calc(${size} + 10px)`,
    border: `${thickness} solid transparent`, // transparent border to offset content
    display: 'inline-block',
  };

  return (
    <div style={containerStyle}>
      <div style={cornerStyle({ top: 0, left: 0, borderTop: 'none', borderLeft: 'none' })}></div>
      <div style={cornerStyle({ top: 0, right: 0, borderTop: 'none', borderRight: 'none' })}></div>
      <div style={cornerStyle({ bottom: 0, left: 0, borderBottom: 'none', borderLeft: 'none' })}></div>
      <div style={cornerStyle({ bottom: 0, right: 0, borderBottom: 'none', borderRight: 'none' })}></div>
      <div>{children}</div>
    </div>
  );
};

export default CornerBorder;
