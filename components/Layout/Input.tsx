import {ReactNode} from "react";

export interface InputProps {
    label: string;
    name?: string;
    placeholder?: string;
    ref?: React.RefObject<HTMLInputElement>;
    value?: string;
    onChange?: (value: string) => void;
}

const Input = (props: InputProps) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="form-label text-gray-900">{props.label}</label>
            <label className="input">
                {props.ref && (
                    <input
                        ref={props.ref}
                        name={props.name}
                        placeholder={props.placeholder}
                        className="form-control"
                        autoComplete="on"
                    />
                )}

                {(props.value !== undefined && props.onChange !== undefined) && (
                    <input
                        value={props.value}
                        onChange={(event) => props.onChange(event.target.value)}
                        name={props.name}
                        placeholder={props.placeholder}
                        className="form-control"
                        autoComplete="on"
                    />
                )}
            </label>
        </div>
    )
}

export default Input;
