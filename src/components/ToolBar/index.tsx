import { useState } from "react";

import ToolBarStyled from "./styled";

type Filter = "relevant" | "latest" | "top";
type TimeRange = "week" | "month" | "year" | "all time";

const ToolBar = () => {
  const [filter, setFilter] = useState<Filter>("relevant");
  const [timeRange, setTimeRange] = useState<TimeRange>("week");

  const toggleFilter = (target: Filter) => {
    setFilter(target);
  };

  const toggleTimeRange = (target: TimeRange) => {
    setTimeRange(target);
  };

  const activeStyle = {
    fontWeight: 700,
  };

  return (
    <ToolBarStyled>
      <div className="filter">
        <span
          style={
            filter === "relevant"
              ? activeStyle
              : { backgroundColor: "transparent" }
          }
          onClick={() => {
            toggleFilter("relevant");
          }}
          className="check-box"
        >
          Relevant
        </span>
        <span
          style={
            filter === "latest"
              ? activeStyle
              : { backgroundColor: "transparent" }
          }
          onClick={() => {
            toggleFilter("latest");
          }}
          className="check-box"
        >
          Latest
        </span>
        <span
          style={
            filter === "top" ? activeStyle : { backgroundColor: "transparent" }
          }
          onClick={() => {
            toggleFilter("top");
          }}
          className="check-box"
        >
          Top
        </span>
      </div>

      {filter === "top" ? (
        <div className="time-range">
          <span
            className="check-box"
            style={
              timeRange === "week"
                ? activeStyle
                : { backgroundColor: "transparent" }
            }
            onClick={() => {
              toggleTimeRange("week");
            }}
          >
            Week
          </span>
          <span
            className="check-box"
            style={
              timeRange === "month"
                ? activeStyle
                : { backgroundColor: "transparent" }
            }
            onClick={() => {
              toggleTimeRange("month");
            }}
          >
            Month
          </span>
          <span
            className="check-box"
            style={
              timeRange === "year"
                ? activeStyle
                : { backgroundColor: "transparent" }
            }
            onClick={() => {
              toggleTimeRange("year");
            }}
          >
            Year
          </span>
          <span
            className="check-box"
            style={
              timeRange === "all time"
                ? activeStyle
                : { backgroundColor: "transparent" }
            }
            onClick={() => {
              toggleTimeRange("all time");
            }}
          >
            All Time
          </span>
        </div>
      ) : null}
    </ToolBarStyled>
  );
};

export default ToolBar;
