import React from "react";

const Title = ({ subtitle, title }) => {
  return (
    <>
      <div id="heading">
        <h3>{subtitle}</h3>
        <h1>{title}</h1>
        <div class="heading-border"></div>
      </div>
    </>
  );
};

export default Title;
