import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"

import "./editableSpan.scss"
import Button from "../button/Button"

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo(
  ({ value, onChange }) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(value)

    const activateEditMode = () => {
      setEditMode(true)
      setTitle(value)
    }
    const activateViewMode = () => {
      setEditMode(false)
      onChange(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }

    return (
      <div className="editable-span">
        {editMode ? (
          <Input
            title={title}
            changeTitle={changeTitle}
            activateViewMode={activateViewMode}
          />
        ) : (
          <Span title={title} activateEditMode={activateEditMode} />
        )}
      </div>
    )
  },
)

type InputProps = {
  title: string
  changeTitle: (e: ChangeEvent<HTMLInputElement>) => void
  activateViewMode: () => void
}

const Input: React.FC<InputProps> = ({
  title,
  changeTitle,
  activateViewMode,
}) => {
  return (
    <div className="input-wrapper">
      <TextField
        value={title}
        onChange={changeTitle}
        autoFocus
        margin="dense"
        variant="standard"
      />
      <Button onClick={activateViewMode} width="60px" height="24px">
        Save
      </Button>
    </div>
  )
}

type SpanProps = {
  title: string
  activateEditMode: () => void
}

const Span: React.FC<SpanProps> = ({ title, activateEditMode }) => {
  return (
    <div className="span-wrapper">
      <span>{title}</span>
      <Button onClick={activateEditMode} width="60px" height="24px">
        Edit
      </Button>
    </div>
  )
}
