import React, { useEffect } from "react";
import "./Header.scss";
import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import Wave from "react-wavify";
import { Link, withRouter } from "react-router-dom";

const headerMachine = Machine({
  id: "Header",
  context: {
    active: 0,
    hover: 0,
    color: "#855dc2"
  },
  initial: "idle",
  states: {
    idle: {
      on: {
        SELECT: {
          target: "active",
          actions: [
            assign({
              active: (_, { key }) => key,
              hover: (_, { key }) => key,
              color: (_, { color }) => color
            })
          ]
        }
      }
    },
    active: {
      on: {
        MOUSE_IN: {
          target: "hover",
          cond: ({ active }, { key }) => key !== active
        }
      }
    },
    hover: {
      entry: [
        assign({
          hover: (_, { key }) => key
        })
      ],
      exit: [
        assign({
          hover: ({ active }) => active
        })
      ],
      on: {
        MOUSE_OUT: "active",
        SELECT: {
          target: "active",
          actions: [
            assign({
              active: (_, { key }) => key,
              hover: (_, { key }) => key,
              color: (_, { color }) => color
            })
          ]
        }
      }
    }
  }
});

const Indicator = ({ context, tileWidth, type }) => {
  return (
    <span
      className={`Header--${type}--indicator`}
      style={{
        left: `${tileWidth * context[type]}px`,
        width: `${tileWidth - 10}px`
        // display: context[type] === context.active ? "none" : "block"
      }}
    ></span>
  );
};

const Header = props => {
  const { pages, history } = props;
  const tileWidth = 125;
  const [current, send] = useMachine(headerMachine);
  const { context } = current;

  useEffect(() => {
    pages.forEach(({ route, color }, key) => {
      if (route === history.location.pathname) send("SELECT", { key, color });
    });
  }, []);

  return (
    <header
      className="Header"
      style={{
        backgroundColor: context.color
      }}
    >
      <div className="Header--content">
        <div className="Header--left-side">
          <span className="Header--logo">Quiz App</span>
        </div>
        <div
          className="Header--right-side"
          style={{
            width: tileWidth * pages.length
          }}
        >
          <Indicator context={context} tileWidth={tileWidth} type="hover" />
          <Indicator context={context} tileWidth={tileWidth} type="active" />
          {/* display: context.hover === context.active ? "none" : "block" */}

          {!!pages.length && (
            <ul className="Header--list">
              {pages.map(({ title, color, route }, key) => {
                return (
                  <li key={key}>
                    <Link
                      to={route}
                      onClick={() => send("SELECT", { key, color })}
                      style={{
                        width: `${tileWidth}px`,
                        color: context.active === key ? color : "white"
                      }}
                      onMouseEnter={() => send("MOUSE_IN", { key })}
                      onMouseLeave={() => send("MOUSE_OUT")}
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <Wave
        fill={context.color}
        className="Header--wave"
        style={{
          top: "65px",
          fillOpacity: 0.7
        }}
        paused={false}
        options={{
          height: 10,
          amplitude: 10,
          speed: 0.15,
          points: 6
        }}
      />
      <Wave
        fill={context.color}
        className="Header--wave"
        paused={false}
        options={{
          height: 10,
          amplitude: 10,
          speed: 0.15,
          points: 6
        }}
      />
    </header>
  );
};

export default withRouter(Header);
