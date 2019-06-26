import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import "./styles.css";

/**
    Допиши конвертер валют.
    - Если пользователь ввел значение в рублях, то количество евро обновляется согласно курсу
    - Если пользователь ввел значение в евро, то количество рублей обновляется согласно курсу
 */

// const RUBLES_IN_ONE_EURO = 70;

class MoneyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.RUBLES_IN_ONE_EURO = 70;
    this.state = {
      ruble: "0",
      euro: "0"
    };
  }
  
  // Mama Mia! Mario, Валюта в центробанке!
  componentDidMount() {
    fetch("https://www.cbr-xml-daily.ru/daily_json.js", {
      // credentials: "include",
      body: null,
      method: "GET",
      mode: "cors"
    })
      .then(response => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error(
          "Не могу получить курс валют с центробанка, беру 70 р в евро!"
        );
      })
      .then(data => {
        this.RUBLES_IN_ONE_EURO = data.Valute.EUR.Value;
        console.log(this.RUBLES_IN_ONE_EURO);
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (
      <div className="root">
        <div className="form">
          <h2>Конвертер валют</h2>
          <div>
            <span>&#8381;</span>
            <Money
              value={this.state.ruble}
              onChange={this.handleChangeRuble}
              onBlur={this.handleOnBlur}
            />
            &mdash;
            <Money
              value={this.state.euro}
              onChange={this.handleChangeEuro}
              onBlur={this.handleOnBlur}
            />
            <span>&euro;</span>
          </div>
        </div>
      </div>
    );
  }
  handleChangeRuble = event => {
    const ruble = extractNumberString(event.target.value);
    this.setState({
      ruble: ruble,
      euro: String(ruble / this.RUBLES_IN_ONE_EURO)
    });
  };
  handleChangeEuro = event => {
    const euro = extractNumberString(event.target.value);
    this.setState({
      ruble: String(euro * this.RUBLES_IN_ONE_EURO),
      euro: euro
    });
  };
  handleOnBlur = event => {
    this.setState({
      ruble: Number(this.state.ruble).toFixed(2),
      euro: Number(this.state.euro).toFixed(2)
    });
  };
}

function Money(props) {
  return (
    <input
      type="text"
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  );
}

Money.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

function extractNumberString(value) {
  const str = value.replace(/^0+/g, "").replace(/[^\.0-9]/g, "");
  const parts = str.split(".");
  return parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : str;
}

ReactDom.render(<MoneyConverter />, document.getElementById("app"));

/**
    Подсказки:
    - Сейчас каждый компонент Money хранит свое значение в собственном состоянии,
      чтобы конвертер работал, нужно уметь обновлять значение извне, поэтому нужно получать его из props.
    - В MoneyConverter наоборот надо создать состояние, которое будет хранить значения в обеих валютах.
      Таким образом ты сделаешь Lift State Up.
    - Заметь, что компонент Money теперь не содержит состояние и его можно переделать в функциональный компонент.
 */
