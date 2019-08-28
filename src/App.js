import React from "react";
import "./App.css";
import { Header, Cover } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ReactComponent as QuestionsSVG } from "./svgs/questions.svg";
import { ContactUs } from "./pages";
function App() {
  return (
    <div className="App">
      <Router>
        <Header
          pages={[
            {
              title: "Quizzes",
              color: "#855dc2",
              route: "/"
            },
            {
              title: "Contact Us",
              color: "#3573BC",
              route: "/contact"
            }
          ]}
        />

        <Route path="/contact" exact component={ContactUs} />
        <Route
          path="/"
          exact
          render={() => (
            <Cover Illustration={QuestionsSVG}>
              <h1>What makes you, You?</h1>
              <p>
                Are there things that make you different from everyone else or
                are you more similar to others than you might think? Ratheron
                designed a set of would you rather questions to help you learn
                more about yourself and the world around you in a fun way.
              </p>
              <button></button>
            </Cover>
          )}
        />
      </Router>
    </div>
  );
}

export default App;
