import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useSelector, useDispatch } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';

jest.mock('react-redux');
describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  function renderLoginFormContainer() {
    return render((
      <LoginFormContainer />
    ));
  }

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      loginFields: {
        email: 'test@test',
        password: '1234',
      },
      accessToken: given.accessToken,
    }));
  });

  context('when logged out', () => {
    given('accessToken', () => null);

    it('render input controls', () => {
      const { getByLabelText } = renderLoginFormContainer();

      expect(getByLabelText('E-mail').value).toBe('test@test');
      expect(getByLabelText('Password').value).toBe('1234');
    });

    context('when click "Log In" button', () => {
      it('should called dispatch', () => {
        const { getByText } = renderLoginFormContainer();

        fireEvent.click(getByText('Log In'));

        expect(dispatch).toBeCalled();
      });
    });

    context('when input value changed', () => {
      it('should called dispatch', () => {
        const { getByLabelText } = renderLoginFormContainer();

        fireEvent.change(getByLabelText('E-mail'), {
          target: { value: 'new email' },
        });

        expect(dispatch).toBeCalledWith({
          type: 'changeLoginFields',
          payload: { name: 'email', value: 'new email' },
        });
      });
    });
  });

  context('when logged in', () => {
    given('accessToken', () => 'ACCESS_TOKEN');

    it('render "Log out" button', () => {
      const { getByText } = renderLoginFormContainer();

      expect(getByText('Log out')).toBeInTheDocument();
    });

    it('listens click event and call dispatch', () => {
      const { getByText } = renderLoginFormContainer();

      fireEvent.click(getByText('Log out'));

      expect(dispatch).toBeCalledWith({
        type: 'logout',
      });
    });
  });
});
