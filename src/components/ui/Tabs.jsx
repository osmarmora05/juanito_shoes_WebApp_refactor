import "../../css/tabs.css";
import { useState, useEffect } from "react";

/*
Example
~~~~~~~

tabs = [
    {
        id: 1,
        title: "Title 1,"
        content: <Component/>
    }
]

*/

export default function Tabs({ tabs }) {
  const [currentTab, setCurrentTab] = useState(tabs[0]?.id);
  const handleTabClick = (id) => {
    setCurrentTab(id);
  };
  return (
    <div className="tab-container">
      <div className="tab-container__box-button">
        {tabs.map((tab, i) => (
          <button
            className={`tab-container__button${
              currentTab === tab.id ? "--active" : ""
            }`}
            key={i}
            id={tab.id}
            disabled={currentTab === `${tab.id}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-container__content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            style={{ display: currentTab === tab.id ? "block" : "none" }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}