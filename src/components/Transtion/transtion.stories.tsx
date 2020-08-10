import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import Transtion, { AnimationName } from './transtion';
import { action } from '@storybook/addon-actions';
import { Button } from '../Button/button';

const defaultTranstion = () => {
  const [isopen, useOpen] = useState(true);
  return (
    <div>
      <Button onClick={() => useOpen(!isopen)}>点击</Button>
      <Transtion in={isopen} timeout={300} animation="zoom-in-top">
        <div>
          <p>12311231</p>
          <p>12311231</p>
          <p>12311231</p>
          <p>12311231</p>
          <p>12311231</p>
          <p>12311231</p>
        </div>
      </Transtion>
    </div>
  );
};

const differerntDirection = () => {
  const [isopen, useOpen] = useState(true);
  const [direction, useDirection] = useState<AnimationName>('zoom-in-top');
  return (
    <div>
      <Button
        onClick={() => {
          useOpen(!isopen);
          useDirection('zoom-in-top');
          action('click');
        }}
      >
        top
      </Button>
      <Button
        onClick={() => {
          useOpen(!isopen), useDirection('zoom-in-left');
        }}
      >
        left
      </Button>
      <Button
        onClick={() => {
          useOpen(!isopen);
          useDirection('zoom-in-bottom');
        }}
      >
        bottom
      </Button>
      <Button
        onClick={() => {
          useOpen(!isopen);
          useDirection('zoom-in-right');
        }}
      >
        right
      </Button>
      <Transtion in={isopen} timeout={300} animation={direction}>
        <div>
          <p>12311231</p>
          <p>12311231</p>
          <p>12311231</p>
          <p>12311231</p>
          <p>12311231</p>
          <p>12311231</p>
        </div>
      </Transtion>
    </div>
  );
};

storiesOf('transtion 过渡效果', module).add('Transtion', defaultTranstion).add('不同方向', differerntDirection);
