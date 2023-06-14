import * as React from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"

import "./range.scss"

function valuetext(value: number) {
  return `${value}°C`
}

export const Range = () => {
  const [value, setValue] = React.useState<number[]>([20, 37])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  return (
    <div className="range">
      <h2>Number of cards</h2>
      <div className="slider-wrapp">
        <div className="value-wrapper">
          <span>{value[0]}</span>
        </div>
        <Box sx={{ width: 155 }}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            max={90}
          />
        </Box>
        <div className="value-wrapper">
          <span>{value[1]}</span>
        </div>
      </div>
    </div>
  )
}
