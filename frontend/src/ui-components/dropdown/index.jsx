import React, { useEffect, useState } from 'react';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DropdownIcon, DropdownInput, DropdownOption, DropdownOptions, DropdownWrapper } from './dropdown.style';

const Dropdown = ({ className = '', defaultValue, placeholder = 'Select an item', options = [], onChange = () => { } }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(options.filter(item => item.value === defaultValue)[0]);
  }, [defaultValue]);

  const handleSelectAnOption = (item) => {
    setSelected(item);
    setOpen(false);

    if (item === null) {
      setSelected(null);
      onChange({ value: null });
      return;
    }

    onChange(item);
  }

  return (
    <DropdownWrapper className={className}>
      <DropdownInput onClick={() => setOpen(!open)}>
        <span>
          {
            !selected ?
              `${placeholder}: n/a` :
              `${placeholder}: ${selected.name}`
          }
        </span>
        <DropdownIcon className={open ? 'upside' : null}>
          <FontAwesomeIcon icon={faAngleDown} />
        </DropdownIcon>
      </DropdownInput>
      <DropdownOptions className={open ? 'open' : null}>
        <DropdownOption onClick={() => handleSelectAnOption(null)}>
          Deseleziona
        </DropdownOption>
        {
          options.map((item, index) => {
            return (
              <DropdownOption key={index} onClick={() => handleSelectAnOption(item)}>{item.name}</DropdownOption>
            )
          })
        }
      </DropdownOptions>
    </DropdownWrapper>
  )
};

export default Dropdown;