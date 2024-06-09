import React, { ChangeEvent, FC } from "react";
import Cookies from "js-cookie";

interface IProps {
  value: number;
  minValue: number;
  title: string;
  onChange: (n: number) => void;
  onMinus: () => void;
  onPlus: () => void;
  mainService: string;
}

const NON_ZERO_COUNTER_MAIN_SERVICES = [
  "Deep",
  "Move in/out",
  "After party",
  "While sickness",
  "Airbnb",
  "Regular",
  "Subscription",
  "Eco cleaning",
];

export const Counter: FC<IProps> = (props) => {
  const {
    value,
    title = "",
    minValue,
    onChange,
    onMinus,
    onPlus,
    mainService,
  } = props;
  const limit = value === minValue;

  const minimumCounterValue = NON_ZERO_COUNTER_MAIN_SERVICES.includes(
    mainService
  )
    ? 1
    : 0;

  const enterNumbers = ({
    target: { value: updatedValue },
  }: ChangeEvent<HTMLInputElement>) => {
    onChange(+updatedValue || minimumCounterValue);
  };

  //everyone understands it's bad, but we keep it just because i18n
  // can't work with some pluralization, 3-5 is few for him, but in russian,
  // for example, 5 is different then 4
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
    if (Cookies.get("locale") === "ua") {
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
    <div className="_relative _w-full _h-12 lg:_h-20 _rounded-full _bg-light _overflow-hidden">
      <div
        className={`_z-10 _cursor-pointer _absolute _top-1/2 _-translateY-50 _left-4 ${
          limit ? "_text-gray-lighter" : "hover:_text-primary"
        }`}
        onClick={limit ? () => {} : onMinus}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="81"
          height="80"
          viewBox="0 0 81 80"
          fill="none"
          className="_h-12 _w-12 lg:_h-auto lg:_w-auto"
        >
          <rect x="0.5" width="80" height="80" rx="40" fill="#ECF0FF" />
          <path
            d="M31.167 40L49.8337 40"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        className={`_absolute _top-1/2 _right-0 _left-0 _-translateY-50 _text-center
          lg:_text-xl _select-none _font-semibold`}
      >
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
      <div
        className={`hover:_text-primary _cursor-pointer _absolute _top-1/2
          _-translateY-50 _right-4`}
        onClick={onPlus}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="81"
          height="80"
          viewBox="0 0 81 80"
          fill="none"
          className="_h-12 _w-12 lg:_h-auto lg:_w-auto"
        >
          <rect x="0.5" width="80" height="80" rx="40" fill="#ECF0FF" />
          <path
            d="M40.5 30.6689V49.3356"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M31.1689 40L49.8356 40"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
