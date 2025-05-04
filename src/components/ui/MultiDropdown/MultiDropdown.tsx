/* import { cc } from 'utils/combineClasses'
import styles from './styles.module.scss'

interface Props {
  className?: string
}

const MultiDropdown = ({ className }: Props) => {
  return <div className={cc(styles.multiDropdownRoot, className)}>MultiDropdown component</div>
}


export default MultiDropdown */

import { useState } from 'react';
import { cc } from 'utils/combineClasses';
import styles from './styles.module.scss';

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  className?: string
  optionsClassName?: string;
  selectClassName?: string;
}

const MultiDropdown = ({ options, className, optionsClassName, selectClassName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const toggleOption = (value: string) => {
    setSelectedValues(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div className={cc(styles.multiDropdownRoot, className)}>
      <div className={selectClassName} onClick={() => setIsOpen(!isOpen)}>
        {selectedValues.length > 0
          ? options
            .filter(opt => selectedValues.includes(opt.value))
            .map(opt => opt.label)
            .join(', ')
          : 'Выберите организации'}
      </div>

      {isOpen && (
        <div className={optionsClassName}>
          {options.map(option => (
            <div key={option.value} className={selectedValues.includes(option.value) ? styles.selected : ''} onClick={() => toggleOption(option.value)}>
              {option.label}
            </div>))
          }
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
