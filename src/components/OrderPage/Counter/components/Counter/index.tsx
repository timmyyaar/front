import React, { ChangeEvent, FC } from "react";
import Cookies from "js-cookie";

import "./style.scss";

interface IProps {
  value: number;
  minValue: number;
  title: string;
  onChange: (n: number) => void;
  onMinus: () => void;
  onPlus: () => void;
  t: any;
}

export const Counter: FC<IProps> = (props) => {
  const { value, title = "", minValue, onChange, onMinus, onPlus, t } = props;
  const limit = value === minValue;

  const enterNumbers = ({
    target: { value: updatedValue },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(+updatedValue || 0);
  };

  const countTitle = () => {
    if (Cookies.get("locale") === "ru") {
      if (title === "bedroom") {
        if (value === 1) return "комната";
        if (value < 5) return "комнаты";
        return "комнат";
      }

      if (title === "bathroom") {
        if (value === 1) return "ванная комната";
        if (value < 5) return "ванные комнаты";
        return "ванных комнат";
      }

      if (title === "windows") {
        if (value === 1) return "окно";
        if (value > 1 && value < 5) return "окна";
        return "окон";
      }

      if (title === "seater sofa") {
        if (value < 1) {
          return "диванных мест";
        }

        if (value < 5) {
          return "диванных места";
        }

        return "диванных мест";
      }
    }
    if (Cookies.get("locale") === "pl") {
      if (title === "bedroom") {
        if (value === 1) return "pokój";
        if (value < 5) return "pokoje";
        return "pokoi";
      }

      if (title === "bathroom") {
        if (value === 1) return "łazienka";
        if (value < 5) return "łazienki";
        return "łazienek";
      }

      if (title === "windows") {
        return "okien";
      }

      if (title === "seater sofa") {
        return "siedziska sofy";
      }
    }
    if (Cookies.get("locale") === "uk") {
      if (title === "bedroom") {
        if (value === 1) return "кімната";
        if (value < 5) return "комнаты";
        return "кімнат";
      }

      if (title === "bathroom") {
        if (value === 1) return "ванна кімната";
        if (value < 5) return "ванні кімнати";
        return "ванних кімнат";
      }

      if (title === "windows") {
        if (value === 1) return "вікно";
        if (value > 1 && value < 5) return "вікна";
        return "вікон";
      }

      if (title === "seater sofa") {
        if (value === 0) {
          return "диванних місць";
        }

        if (value < 5) {
          return "диванних місця";
        }

        return "диванних місць";
      }
    }

    if (Cookies.get("locale") === "en") {
      if (value > 1 && title !== "windows") {
        return title + "s";
      }
    }

    return title;
  };

  const valueLength = value.toString().length;

  return (
    <div className="counter-component">
      <div
        className={`counter-icons icon-minus ${limit ? "icon-limit" : ""}`}
        onClick={limit ? () => {} : onMinus}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="81"
          height="80"
          viewBox="0 0 81 80"
          fill="none"
          className="icon"
        >
          <rect x="0.5" width="80" height="80" rx="40" fill="#ECF0FF" />
          <path
            d="M31.167 40L49.8337 40"
            stroke="#232323"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="counter-title _font-semibold">
        <input
          type="text"
          style={{
            textAlign: "end",
            backgroundColor: "#ECF0FF",
            outline: "none",
            width: `${valueLength}ch`,
            marginRight: "2px",
          }}
          value={value}
          onChange={enterNumbers}
        />{" "}
        {title.indexOf("m2") !== -1 ? (
          <>
            {title.replace("m2", "")}
            <>
              m<sup>2</sup>
            </>
          </>
        ) : (
          countTitle()
        )}
      </div>
      <div className="counter-icons icon-plus" onClick={onPlus}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="81"
          height="80"
          viewBox="0 0 81 80"
          fill="none"
          className="icon"
        >
          <rect x="0.5" width="80" height="80" rx="40" fill="#ECF0FF" />
          <path
            d="M40.5 30.6689V49.3356"
            stroke="#232323"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M31.1689 40L49.8356 40"
            stroke="#232323"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
