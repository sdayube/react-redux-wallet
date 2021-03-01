import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ExpenseInput from './ExpenseInput';
import { fetchCurrencies, addExpense, finishesEdit } from '../actions';
import './ExpenseForm.css';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddExpense = this.handleAddExpense.bind(this);
    this.handleFinishEditing = this.handleFinishEditing.bind(this);
  }

  async componentDidMount() {
    const { fetchCurrencies: fetchCurrenciesAction } = this.props;
    await fetchCurrenciesAction();
  }

  async handleAddExpense(event) {
    event.preventDefault();
    event.persist();
    const {
      addExpense: addExpenseAction,
      fetchCurrencies: fetchCurrenciesAction,
    } = this.props;
    await fetchCurrenciesAction();
    addExpenseAction();
    event.target.parentNode.reset();
  }

  handleFinishEditing(event) {
    event.preventDefault();
    const { finishesEdit: finishesEditAction } = this.props;
    finishesEditAction();
  }

  render() {
    const { editing, currencies } = this.props;

    const buttonGen = (isEditing) => (
      <button
        type="submit"
        onClick={ isEditing ? this.handleFinishEditing : this.handleAddExpense }
      >
        {isEditing ? 'Editar despesa' : 'Adicionar despesa'}
      </button>
    );

    return (
      <section
        className="expense-form"
        style={ editing ? { background: 'orange' } : null }
      >
        <h2>{editing ? 'Editar despesa' : 'Nova despesa'}</h2>
        <form>
          <ExpenseInput name="description" label="Descrição" />
          <div className="dual-wrapper">
            <ExpenseInput
              name="currency"
              type="select"
              label="Moeda"
              options={ currencies }
            />
            <ExpenseInput name="value" label="Valor" />
          </div>
          <div className="dual-wrapper">
            <ExpenseInput
              name="method"
              type="select"
              label="Método de Pagamento"
              options={ ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'] }
            />
            <ExpenseInput
              name="tag"
              type="select"
              label="Categoria"
              options={ ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'] }
            />
          </div>
          {buttonGen(editing)}
        </form>
      </section>
    );
  }
}

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array]))
    .isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  finishesEdit: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  editing: PropTypes.bool,
};

ExpenseForm.defaultProps = {
  editing: false,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editing: state.wallet.editing,
});

const mapDispatchToProps = {
  fetchCurrencies,
  addExpense,
  finishesEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
