import React, { useEffect, useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CheckboxInput, CheckboxLabel, CheckboxWrapper } from './checkbox.style';
import Stars from '../stars';

const Checkbox = ({
  className,
  label,
  value = null,
  items = null,
  stars = null,
  onChange = () => {},
  defaultValue = false
}) => {
  const [checked, setChecked] = useState(defaultValue);

  const handleCheck = (e) => {
    onChange({ value, checked: !checked });
    setChecked(!checked);
  }

  return (
    <CheckboxWrapper className={className} onClick={handleCheck}>
      <CheckboxInput className={checked ? 'checked' : null}>
        <FontAwesomeIcon icon={faCheck} />
      </CheckboxInput>
      { !stars && <CheckboxLabel className={checked ? 'checked' : null}>{label} {items && <span>({items})</span>}</CheckboxLabel> }
      { stars && <CheckboxLabel className={checked ? 'checked' : null}><Stars defaultValue={stars} /> {items && <span>({items})</span>}</CheckboxLabel> }
    </CheckboxWrapper>
  );
};

export default Checkbox;