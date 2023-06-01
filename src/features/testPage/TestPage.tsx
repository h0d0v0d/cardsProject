import React from "react"

import SuperButton from "../../components/superButton/SuperButton"
import SuperCheckbox from "../../components/superCheckbox/SuperCheckbox"
import SuperInput from "../../components/superInput/SuperInput"
import SuperRadio from "../../components/superRadio/SuperRadio"
import SuperSelect from "../../components/superSelect/SuperSelect"

const options = [
  { id: 1, value: "slow" },
  { id: 3, value: "middle" },
  { id: 3, value: "fast" },
]

export const TestPage = () => {
  return (
    <div>
      <SuperButton />
      <SuperCheckbox />
      <SuperInput />
      <SuperRadio options={options} />
      <SuperSelect options={options} />
    </div>
  )
}
