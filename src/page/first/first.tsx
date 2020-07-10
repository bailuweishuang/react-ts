import * as React from 'react';
import useBanlan from '../components/useBanlan';
import './style.scss';

let ar: string;

interface getName {
  name?: string;
  people?: string;
}

interface getAge extends getName {
  age: Number;
  isVoild: boolean;
}

const First: React.FC<getName> = props => {
  const { name, people } = props;
  const message: getAge = {
    age: 12,
    isVoild: true
  };
  const banlan = useBanlan(12);
  ar == name;
  return (
    <div className="content">
      <code>456465</code>
      {name}:{message.age}:{people}-{ar}
      <p>{banlan}</p>
    </div>
  );
};
First.defaultProps = {
  name: '你是空 你是空 你是空空的空空',
  people: '1231'
};
export default First;
