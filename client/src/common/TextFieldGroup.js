import React from 'react';
import classnames from 'classnames';


const TextFieldGroup = ({
  name,
  placeholder,
  id,
  ref,
  type,
  value,
  label,
  htmlFor,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames('form-control form-control-lg')}
        placeholder={placeholder}
        name={name}
        id={id}
        ref={ref}
        value={value}
        label={label}
        htmlFor={htmlFor}
      />
    </div>
  );
};


export default TextFieldGroup;