import { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    // phone validations
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }

    //Call BE api
    setShowOtpInput(true);
  };

  const onOtpSubmit = (otp) => {
    console.log("Login", otp);
  };
  return (
    <div className="form__container">
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Phone number"
            className="input__number"
          />
          <button type="submit">Submit </button>
        </form>
      ) : (
        <div>
          <p className="text">
            Enter Otp Send to <span className="number">{phoneNumber}</span>
          </p>

          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
