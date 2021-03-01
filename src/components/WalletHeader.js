/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './WalletHeader.css';

class WalletHeader extends React.Component {
  handleExpenseValue() {
    const { expenses } = this.props;
    return expenses
      .reduce((acc, expense) => {
        const value = parseFloat(expense.value);
        const rate = parseFloat(expense.exchangeRates[expense.currency].ask);
        return acc + (value * rate);
      }, 0);
  }

  render() {
    const { email } = this.props;

    return (
      <header>
        <img
          src={ require('../images/icon.svg') }
          alt="Trybe Wallet"
        />
        <div className="user-wrapper">
          <div>
            <span data-testid="email-field">{ `Olá, ${email.split('@')[0]}!` }</span>
            <span>
              Você gastou R$
              {' '}
              <span data-testid="total-field">
                {this.handleExpenseValue().toFixed(2)}
              </span>
            </span>
          </div>
        </div>
      </header>
    );
  }
}

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletHeader);
