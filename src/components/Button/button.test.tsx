import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './button';
import '@testing-library/jest-dom';

const defaultProps = {
  onClick: jest.fn()
};

const testProps: ButtonProps = {
  className: 'testClass',
  btnType: 'primary',
  size: 'lg'
};

const testSecondProps: ButtonProps = {
  btnType: 'link',
  href: 'http://www.baidu.com'
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
};

describe('test button component', () => {
  test('should render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>first</Button>);
    const element = wrapper.getByText('first');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  test('should render the correct component based on different props', () => {
    const wrapper = render(<Button {...testProps}>second</Button>);
    const element = wrapper.getByText('second');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg testClass');
  });

  it('should render a link when btnType equals link and href is provided', () => {
    const wrapper = render(<Button {...testSecondProps}>second</Button>);
    const element = wrapper.getByText('second');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual('A');
    expect(element).toHaveClass('btn btn-link');
  });

  it('should render disabled button when disabled set to true', () => {
    const wrapper = render(<Button {...disabledProps}>second</Button>);
    const element = wrapper.getByText('second') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
