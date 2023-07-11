import * as React from "react"
import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import { useDebounce } from "use-debounce"

import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { packsActions } from "@/features/packs/packs.slice"

import "./range.scss"

export const Range: React.FC = () => {
  const { minCardsCount, maxCardsCount } = useAppSelector(
    (state) => state.pack.meta,
  )
  const { min, max } = useAppSelector((state) => state.pack.searchParams)
  const [values, setValues] = useState<number[]>([
    min || minCardsCount,
    max || maxCardsCount,
  ])
  const [debonucesValue] = useDebounce<number[]>(values, 1500)
  const dispatch = useAppDispatch()

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValues(newValue)
    }
  }

  useEffect(() => {
    dispatch(
      packsActions.editMinMax({
        min: debonucesValue[0],
        max: debonucesValue[1],
      }),
    )
  }, [debonucesValue])

  return (
    <div className="range">
      <h2>Number of cards</h2>
      <div className="slider-wrapp">
        <div className="value-wrapper">
          <span>{values[0]}</span>
        </div>
        <Box sx={{ width: 155 }}>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={values}
            onChange={handleChange}
            valueLabelDisplay="auto"
            max={maxCardsCount}
          />
        </Box>
        <div className="value-wrapper">
          <span>{values[1]}</span>
        </div>
      </div>
    </div>
  )
}
