import { useState, useEffect } from 'react';

const useBanlan = (number: number) => {
  const [name, setName] = useState(null);
  useEffect(() => {
    if (number > 10)
      setName(number)
  })
  return name;
}

export default useBanlan


/**
 * 组件库考虑的问题
 * 代码结构
 * 样式解决方案
 * 组件的分析和编码 测试
 */