import { useState, useRef, useEffect } from 'react';
import { cc } from 'utils/combineClasses';
import styles from './styles.module.scss';

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  className?: string;
  optionsClassName?: string;
  selectClassName?: string;
  placeholder?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
}

const MultiDropdown = ({ options, className, optionsClassName, selectClassName, value = [], onChange, placeholder }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOption = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];

    setSelectedValues(newSelectedValues);
    onChange?.(newSelectedValues);
  };

  useEffect(() => {
    if (value) {
      setSelectedValues(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cc(styles.multiDropdownRoot, className)}
      ref={dropdownRef}>
      <button
        className={selectClassName}
        onClick={() => setIsOpen(!isOpen)}>
        {selectedValues.length > 0
          ? options
            .filter(opt => selectedValues.includes(opt.value))
            .map(opt => opt.label)
            .join(', ')
          : `${placeholder}`}
      </button>

      {isOpen && (
        <div className={optionsClassName}>
          {options.map(option => (
            <button
              key={option.value}
              className={selectedValues.includes(option.value) ? styles.selected : ''}
              onClick={() => toggleOption(option.value)}>
              {option.label}
            </button>))
          }
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
