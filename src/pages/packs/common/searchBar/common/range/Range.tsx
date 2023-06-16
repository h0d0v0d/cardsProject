import * as React from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"

import { useAppDispatch, useAppSelector } from "@/hooks/hooks"

import "./range.scss"
import { packsActions } from "@/features/packs/packs.slice"

function valuetext(value: number) {
  return `${value}°C`
}

type RangeProps = {
  minCardsCount: number
  maxCardsCount: number
}

export const Range: React.FC = () => {
  const dispatch = useAppDispatch()
  const { minCardsCount, maxCardsCount } = useAppSelector(
    (state) => state.pack.meta,
  )
  const { min, max } = useAppSelector((state) => state.pack.searchParams)

  const handleChange = (event: Event, newValue: number | number[]) => {
    /* if (Array.isArray(newValue)) {
      dispatch(
        packsActions.editSearchParams({
          min: newValue[0],
          max: newValue[1],
        }),
      )
    } */
  }

  return (
    <div className="range">
      <h2>Number of cards</h2>
      <div className="slider-wrapp">
        <div className="value-wrapper">
          <span>{minCardsCount}</span>
        </div>
        <Box sx={{ width: 155 }}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={[min || 10, max || 40]}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            max={90}
          />
        </Box>
        <div className="value-wrapper">
          <span>{maxCardsCount}</span>
        </div>
      </div>
    </div>
  )
}
