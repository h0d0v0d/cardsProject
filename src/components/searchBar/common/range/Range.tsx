import * as React from "react"
import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"
import { useDebounce } from "use-debounce"

import { useActions, useAppSelector } from "@/common/hooks"
import { packsActions } from "@/features/packs/packs.slice"
import { packsSelectors } from "@/features/packs/packs.selectors"

import "./range.scss"

export const Range: React.FC = () => {
  const minCardsCount = useAppSelector(packsSelectors.selectMetaMin)
  const maxCardsCount = useAppSelector(packsSelectors.selectMetaMax)
  const min = useAppSelector(packsSelectors.selectSearchParamsMin)
  const max = useAppSelector(packsSelectors.selectSearchParamsMax)
  const [values, setValues] = useState<number[]>([
    min || minCardsCount,
    max || maxCardsCount,
  ])
  const [debonucesValue] = useDebounce<number[]>(values, 1500)
  const { editMinMax } = useActions(packsActions)

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValues(newValue)
    }
  }

  useEffect(() => {
    editMinMax({ min: debonucesValue[0], max: debonucesValue[1] })
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
