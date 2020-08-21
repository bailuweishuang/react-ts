import React, { FC, useState, ChangeEvent, ReactElement } from 'react';
import Input, { InputProps } from '../Input/Input';
import { Omit } from 'emotion-theming/types/helper';
import Icon from '../Icon/icon';

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
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<dataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value.trim();
    setInputValue(result);
    if (result) {
      const newResult = fetchSuggestions(result);
      if (newResult instanceof Promise) {
        setLoading(true);
        newResult.then((data) => {
          setLoading(false);
          setSuggestions(data);
        });
      } else {
        setSuggestions(newResult);
      }
    } else {
      setSuggestions([]);
    }
  };
  const hanldSelect = (e: dataSourceType) => {
    setInputValue(e.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(e);
    }
  };
  const renderO = (item: dataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    const result = (
      <ul>
        {suggestions.map((item, index) => {
          return (
            <li key={index} onClick={() => hanldSelect(item)}>
              {renderO(item)}
            </li>
          );
        })}
      </ul>
    );
    return result;
  };
  return (
    <div className="auto-complete">
      <Input value={inputValue} {...resetProps} onChange={handleChange} />
      {loading && <Icon icon="spinner" spin />}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};

export default AutoComplete;
