/* eslint-disable react/prop-types */
const containerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
};

const contentStyle = {
  background: 'red',
  height: '2px',
  textAlign: 'center',
  lineHeight: '2px',
  fontFamily: 'sans-serif',
  transition: '1s'
};

const LoadingBar = ({progress}) => {
  const state = `${progress}%`;
  return (
    <div style={containerStyle}>
      <div style={{...contentStyle, width: state}}> 
      </div>
    </div>
  );
};

export default LoadingBar;