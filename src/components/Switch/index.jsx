import React from "react";
import PropTypes from "prop-types";

const sizes = {
  xs: {
    width: 32,
    height: 16,
  },
};

const Switch = ({
  value = false,
  className,
  checkedIcon = <></>,
  uncheckedIcon = <></>,
  onChange,
  size = "xs",
}) => {
  const [selected, setSelected] = React.useState(value);
  
  const handleChange = (event) => {
    const newValue = event.target.checked;
    setSelected(newValue);
    onChange?.(newValue);
  };
  
  return (
    <div className={className}>
      <div
        style={{
          width: sizes[size].width,
          height: sizes[size].height,
          borderRadius: sizes[size].height / 2,
          backgroundColor: selected ? "#4CAF50" : "#ccc",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          padding: 2,
        }}
        onClick={() => handleChange({ target: { checked: !selected } })}
      >
        <span
          style={{
            display: "inline-block",
            width: sizes[size].height - 4,
            height: sizes[size].height - 4,
            borderRadius: "50%",
            backgroundColor: "#fff",
            transition: "transform 0.3s ease",
            transform: selected ? `translateX(${sizes[size].width - sizes[size].height}px)` : "translateX(0)",
          }}
        />
      </div>
    </div>
  );
};

Switch.propTypes = {
  value: PropTypes.bool,
  className: PropTypes.string,
  checkedIcon: PropTypes.node,
  uncheckedIcon: PropTypes.node,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(["xs"]),
};

export { Switch };
