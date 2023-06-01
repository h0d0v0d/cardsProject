import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    xType?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        xType,
        className,
        disabled,
        ...restProps 
    } 
     
) => {

    const finalClassName = s.button + ' '
        + (disabled ?  s.disabled : xType === 'red' ? s.red : className ? className : restProps.children === 'secondary' ? s.secondary : s.default) 

    return (
        <button
            disabled={disabled}
            className={finalClassName}
            {...restProps} 
        />
    )
}

export default SuperButton