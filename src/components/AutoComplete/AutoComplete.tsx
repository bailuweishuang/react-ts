import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react';
import Input, { InputProps } from '../Input/Input';
import classNames from 'classnames';
import { Omit } from 'emotion-theming/types/helper';
import Icon from '../Icon/icon';
import Transtion from '../Transtion/transtion';
import useDebounce from '../../hooks/useDebounce';
import useClickOut from '../../hooks/useClickOut';

interface dataSourceObject {
  value: string;
}

export type dataSourceType<T = {}> = T & dataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**数据处理 */
  fetchSuggestions: (str: string) => dataSourceType[] | Promise<dataSourceObject[]>;
  /**选择回调 */
  onSelect?: (item: dataSourceType) => void;
  /**自定义下拉框 */
  renderOption?: (item: dataSourceType) => ReactElement;
}

/**
 * 输入框自动完成功能。
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'react-ts'
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...resetProps } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<dataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDrapDown, setShowDrapDown] = useState(false);
  const [lightHeight, setLightHeight] = useState(-1);
  const componentRef = useRef<HTMLDivElement>(null);
  const debounceValue = useDebounce(inputValue, 1000);
  useClickOut(componentRef, () => setSuggestions([]));
  const selectRef = useRef(false);
  useEffect(() => {
    if (debounceValue && selectRef.current) {
      const newResult = fetchSuggestions(debounceValue);
      if (newResult instanceof Promise) {
        setLoading(true);
        newResult.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) {
            setShowDrapDown(true);
          }
        });
      } else {
        setSuggestions(newResult);
        setShowDrapDown(true);
      }
    } else {
      setShowDrapDown(false);
    }
    setLightHeight(-1);
  }, [debounceValue]);
  const keyDownOk = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setLightHeight(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[lightHeight]) {
          hanldSelect(suggestions[lightHeight]);
        }
        break;
      case 38:
        keyDownOk(lightHeight - 1);
        break;
      case 40:
        keyDownOk(lightHeight + 1);
        break;
      case 27:
        setShowDrapDown(false);
        break;
      default:
        break;
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value.trim();
    setInputValue(result);
    selectRef.current = true;
  };
  const hanldSelect = (e: dataSourceType) => {
    setInputValue(e.value);
    setShowDrapDown(false);
    if (onSelect) {
      onSelect(e);
    }
    selectRef.current = false;
  };
  const renderO = (item: dataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    const result = (
      <Transtion in={loading || showDrapDown} timeout={300} animation="zoom-in-top">
        <ul className="viking-suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const classes = classNames('suggestion-item', {
              'is-active': index === lightHeight
            });
            return (
              <li key={index} className={classes} onClick={() => hanldSelect(item)}>
                {renderO(item)}
              </li>
            );
          })}
        </ul>
      </Transtion>
    );
    return result;
  };
  return (
    <div className="auto-complete" ref={componentRef}>
      <Input value={inputValue} {...resetProps} onChange={handleChange} onKeyDown={handleKeyDown} />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
