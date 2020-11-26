import React from 'react';

const Header = (props) => {
  const { setChart, myPlotData } = props;

  return (
    <div className="headerContents">
      <div className="logo" onClick={() => setChart(myPlotData)}>
        hindsight
      </div>
    </div>
  )
}

export default Header;