import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';
import './toggle.css';

/**
    Допиши компонент Toggle.
    Пусть флаг хранится во внутреннем состоянии,
    а при изменении передается наружу через onChange.
 */

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true
    }
  }

  render() {
    return (
      <span
        className={'container' + (this.state.checked ? ' isChecked' : '')}
        onClick={this.handleClick}
      >
        <span className="handle">
          <div className="bg" />
          <span className="hinge" />
        </span>
      </span>
    );
  }

  handleClick = () => {
    const newCheck = !this.state.checked;
    // console.log(newCheck);
    this.setState({checked: newCheck});
    if(this.props.onChange) {
      this.props.onChange(newCheck);
    }
  };
}

Toggle.propTypes = {
  onChange: PropTypes.func
};

ReactDom.render(
  <div className="page">
    <Toggle onChange={value => console.log(value)} /> Использовать умные
    компоненты
  </div>,
  document.getElementById('app')
);

/**
    Подсказки:
    - Начальное состояние компонента хранится в this.state и обычно инициируется в конструкторе.
    - Не забудь добавить super(props) первой строчкой конструктора, чтобы вызвать конструктор базового типа.
    - this.setState({property: value}) обновляет часть состояния и инициирует перерисовку.
 */
