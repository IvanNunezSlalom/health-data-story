'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/atoms';
import styles from './SearchInput.module.css';

export interface SearchOption {
  id: string;
  label: string;
}

export interface SearchInputProps {
  options: SearchOption[];
  onSelect: (option: SearchOption) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  options,
  onSelect,
  placeholder = 'Search neighborhoods...',
  className
}: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = query.trim()
    ? options.filter(option =>
        option.label.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.trim().length > 0);
    setHighlightedIndex(-1);
  };

  const handleSelect = (option: SearchOption) => {
    setQuery(option.label);
    setIsOpen(false);
    onSelect(option);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || filteredOptions.length === 0) {
      if (e.key === 'Escape') {
        setQuery('');
        inputRef.current?.blur();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setQuery('');
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div className={`${styles.container} ${className || ''}`} ref={dropdownRef}>
      <Input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={styles.input}
        aria-label="Search for a neighborhood"
        aria-autocomplete="list"
        aria-controls="search-results"
        aria-expanded={isOpen}
      />
      {isOpen && filteredOptions.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          className={styles.dropdown}
        >
          {filteredOptions.map((option, index) => (
            <div
              key={option.id}
              role="option"
              aria-selected={index === highlightedIndex}
              className={`${styles.option} ${
                index === highlightedIndex ? styles.highlighted : ''
              }`}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      {isOpen && query.trim() && filteredOptions.length === 0 && (
        <div className={styles.dropdown}>
          <div className={styles.noResults}>No neighborhoods found</div>
        </div>
      )}
    </div>
  );
}
