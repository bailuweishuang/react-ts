import * as React from 'react';
import { render } from '@testing-library/react';
import Alert, { AlertProps } from './alert';
import '@testing-library/jest-dom';

const testProps: AlertProps = {
  className: 'alert',
  alertType: 'default'
};
describe('test alert component', () => {
  it('default alert', () => {
    const wrapper = render(<Alert {...testProps} />);
    const element = wrapper.getByTestId('test-alert');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('alert alert-default');
  });
});
