import React, { useState, useEffect, useCallback } from 'react';
import styles from './TradingWindow.module.css';
//grid layout
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {  useSelector } from 'react-redux';
import AddStrategy from './AddStrategies/AddStrategy';
//icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';


const ResponsiveGridLayout = WidthProvider(Responsive);

const TradingWindow = () => {
  const data = useSelector(e => e.tradingindow)
  const items = data.filter(e => e.visible === true);
  const [layout, setLayout] = useState(JSON.parse(localStorage.getItem("layout")) || items.map(e => e.config))

  const handleLayoutChange = useCallback((layout) => {
    layout.map((item, i) => {
        if(item.w <= 1 || item.h <= 1) layout[i] = data[i].config;
    })
    localStorage.setItem("layout", JSON.stringify(layout))
  })

  useEffect(() => {
    setLayout(JSON.parse(localStorage.getItem("layout")) || items.map(e => e.config))
  },[data])


  //minimize maximize
  const [isMaximized, setisMaxiMized] = useState(null);
  const gridLayout = isMaximized ? (items.filter(i => i.id === isMaximized)).config : layout;

  
  const [IsAddStrategyOpen, setIsAddStrategyOpen] = useState(false)

  const isMobileDevice = () => {
    return window.matchMedia("(max-width: 768px)").matches;
  };

  return (
    <>
      <div className={styles.container}>
        {/* main */}
        {isMaximized ? (
          <div className={styles.gridContainer}>
            <div className={styles.top}>
              <p className={styles.Title}>{isMaximized.title}</p>
              <div className="iconWrapper" title="Add Market Watch" onClick={() => setisMaxiMized(null)} ><CloseFullscreenIcon/></div>
            </div>
            <div style={{height: "85vh"}} className={styles.gridWrapper} onMouseDown={(e) => e.stopPropagation()}>
                {<isMaximized.element/>}
            </div>

          </div>
        ) : (
          <ResponsiveGridLayout
            onLayoutChange={handleLayoutChange}
            className={`${styles.layout}`}
            layouts={{ lg: gridLayout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 20, md: 15, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={40}
            isDraggable={!isMobileDevice()}
            compactType={'vertical'}
          >
            {items.map((i) => (
              <div key={i.id} className={`floatBox ${styles.gridContainer}`}>   
                  <div className={styles.top} >
                    <p className={styles.Title}>{i.title}</p>
                    <div className={styles.actionWrapper} >
                         {i.id === 1 && <div className="iconWrapper" title="Add Market Watch" onClick={() => setIsAddStrategyOpen(true)} ><AddCircleOutlineIcon/></div>} {/* only render this on Strategy window */}
                        <div className="iconWrapper" title={`Maximize ${i.title}`}  onClick={() => setisMaxiMized(i)} > <OpenInFullIcon /></div>
                    </div>
                  </div>
                  <div className={styles.gridWrapper} onMouseDown={(e) => e.stopPropagation()}>
                    {<i.element/>}
                  </div>
              </div>
            ))}
          </ResponsiveGridLayout>
        )}
      </div>
      <AddStrategy isOpen={IsAddStrategyOpen} setIsOpen={setIsAddStrategyOpen}/>
    </>
  );
};

export default TradingWindow;





