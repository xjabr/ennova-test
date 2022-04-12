import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { StarItem, StarItems } from "./starts.style";

const Stars = ({
  defaultValue = 0
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <StarItems>
      <StarItem onClick={() => {setValue(1)}}>
        <FontAwesomeIcon icon={value >= 1 ? faStar : faStarRegular } />
      </StarItem>
      <StarItem onClick={() => {setValue(2)}}>
        <FontAwesomeIcon icon={value >= 2 ? faStar : faStarRegular } />
      </StarItem>
      <StarItem onClick={() => {setValue(3)}}>
        <FontAwesomeIcon icon={value >= 3 ? faStar : faStarRegular } />
      </StarItem>
      <StarItem onClick={() => {setValue(4)}}>
        <FontAwesomeIcon icon={value >= 4 ? faStar : faStarRegular } />
      </StarItem>
      <StarItem onClick={() => {setValue(5)}}>
        <FontAwesomeIcon icon={value >= 5 ? faStar : faStarRegular } />
      </StarItem>
    </StarItems>
  )
};

export default Stars;