import { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));

  const inputRef = useRef([]);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];

    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combineOtp = newOtp.join("");

    if (combineOtp.length === length) {
      onOtpSubmit(combineOtp);
    }

    //Move to next input if current field is filled
    if (value && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1].focus();
      inputRef.current[newOtp.indexOf("")].focus();
    }
  };

  const handleClick = (index) => {
    inputRef.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRef.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRef.current[index - 1].focus();
    } else if (e.key !== "Backspace" && inputRef.current[otp.indexOf("")]) {
      // Move focus to the first empty input field when a digit is entered
      inputRef.current[otp.indexOf("")].focus();
    }
  };

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            ref={(input) => (inputRef.current[index] = input)}
            type="text"
            key={index}
            value={value}
            onChange={(e) => {
              handleChange(e, index);
            }}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
