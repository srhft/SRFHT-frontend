import React from 'react'
import styled, {keyframes} from "styled-components";

const animation = keyframes`
  0% {
    transform: rotateZ(0deg)
  }
  100% {
    transform: rotateZ(360deg)
  }
`


const Svg = styled.svg`
    position: absolute;
    animation: ${animation} 10s linear infinite;
    .a,.b,.c,.d,.j{
        fill:none;
    }
    .a,.b,.c,.d{
        stroke:#f4b07e;stroke-width:0.5px;
    }
    .a{
        opacity:0.1;
    }
    .b{
        opacity:0.4;
    }
    .c,.e{
        opacity:0.8;
    }
    .e,.h{
        fill:#f4b07e;
    }
    .f{
        fill:#eb6400;
    }
    .g{
        fill:#ffbca2;
    }
    .h{
        opacity:0.5;
    }
    .i{
        stroke:none;
    }
`

function RingAnimation({style}) {
  return (
    <Svg style={{...style}} xmlns="http://www.w3.org/2000/svg" width="547.799" height="547.798" viewBox="0 0 547.799 547.798">
        <defs>
        </defs>
        <g transform="translate(-648.201 -1582)">
            <g transform="translate(657.202 1591)">
                <g class="a" transform="translate(-9 -9)">
                    <circle class="i" cx="273.899" cy="273.899" r="273.899"/>
                    <circle class="j" cx="273.899" cy="273.899" r="273.649"/>
                </g>
                <g class="b" transform="translate(18.613 18.613)">
                    <circle class="i" cx="246.287" cy="246.287" r="246.287"/>
                    <circle class="j" cx="246.287" cy="246.287" r="246.037"/>
                </g>
                <g class="c" transform="translate(45.563 45.562)">
                    <circle class="i" cx="219.337" cy="219.337" r="219.337"/>
                    <circle class="j" cx="219.337" cy="219.337" r="219.087"/>
                </g>
                <g class="d" transform="translate(76.999 76.999)">
                    <circle class="i" cx="187.9" cy="187.9" r="187.9"/>
                    <circle class="j" cx="187.9" cy="187.9" r="187.65"/>
                </g>
                <circle class="e" cx="2.442" cy="2.442" r="2.442" transform="translate(45.927 230.09)"/>
                <circle class="f" cx="2.442" cy="2.442" r="2.442" transform="translate(74.69 266.962)"/>
                <circle class="g" cx="2.442" cy="2.442" r="2.442" transform="translate(20.926 311.074)"/>
                <circle class="h" cx="2.442" cy="2.442" r="2.442" transform="translate(249.822 16.44)"/>
                <circle class="e" cx="2.442" cy="2.442" r="2.442" transform="translate(336.006 56.39)"/>
                <circle class="f" cx="2.442" cy="2.442" r="2.442" transform="translate(416.972 157.412)"/>
                <circle class="f" cx="2.442" cy="2.442" r="2.442" transform="translate(206.909 83.489)"/>
                <circle class="h" cx="2.442" cy="2.442" r="2.442" transform="translate(457.807 113.004)"/>
                <circle class="e" cx="2.442" cy="2.442" r="2.442" transform="translate(480.807 240.004)"/>
            </g>
        </g>
    </Svg>
  )
}

export default RingAnimation