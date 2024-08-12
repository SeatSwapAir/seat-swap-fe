const Timeline = ({ className = '', ...props }) => {
  return (
    <svg
      width='25'
      height='340'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 60 340'
      className={className}
      {...props}
    >
      <g className='layer'>
        <title>Layer 1</title>
        <g id='svg_9'>
          <line
            cx='75'
            fill='none'
            id='svg_4'
            stroke='#C5C6C7'
            strokeWidth='10'
            x1='32.3'
            x2='32.3'
            y1='54.8'
            y2='291.6'
          />
          <circle
            cx='30'
            cy='33.41'
            fill='#ffffff'
            id='svg_5'
            r='18.91'
            stroke='#C5C6C7'
            strokeWidth='10'
          />
          <circle
            cx='30'
            cy='306.23'
            fill='none'
            id='svg_7'
            r='18.91'
            stroke='#C5C6C7'
            strokeWidth='10'
          />
        </g>
      </g>
    </svg>
  );
};

export default Timeline;
