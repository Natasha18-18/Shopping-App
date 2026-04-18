import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "./Multistep.css";

function MultiStepForm() {
  const { cart } = useContext(CartContext);
  const { login } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    pincode: ""
  });

  const [errors, setErrors] = useState({});

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
  const validate = () => {
    let err = {};

    if (step === 1) {
      if (!formData.name) err.name = "Name required";
      if (!formData.email) err.email = "Email required";
    }

    if (step === 2) {
      if (!formData.city) err.city = "City required";
      if (!formData.pincode) err.pincode = "Pincode required";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const next = () => {
    if (validate()) setStep(step + 1);
  };

  const prev = () => setStep(step - 1);

  // Submit
  const submit = () => {
    login(); // 🔥 login AFTER form
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="form-container">

      {/* Success Message */}
      {success && <p className="success">Login Successfully ✅</p>}

      {/* Step Indicator */}
      <div className="step-indicator">
        <div className={`step ${step === 1 ? "active" : ""}`}>1</div>
        <div className={`step ${step === 2 ? "active" : ""}`}>2</div>
        <div className={`step ${step === 3 ? "active" : ""}`}>3</div>
      </div>

      <h2>Step {step}</h2>

      {/* Step 1 */}
      {step === 1 && (
        <>
          <input name="name" placeholder="Name" onChange={handleChange} />
          {errors.name && <p className="error">{errors.name}</p>}

          <input name="email" placeholder="Email" onChange={handleChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <>
          <input name="city" placeholder="City" onChange={handleChange} />
          {errors.city && <p className="error">{errors.city}</p>}

          <input name="pincode" placeholder="Pincode" onChange={handleChange} />
          {errors.pincode && <p className="error">{errors.pincode}</p>}
        </>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <>
          <h3>Review</h3>
          <p><b>Name:</b> {formData.name}</p>
          <p><b>Email:</b> {formData.email}</p>
          <p><b>City:</b> {formData.city}</p>

          <h3>Cart Items</h3>
          {cart.map(item => (
            <p key={item.id}>
              {item.title} x {item.qty}
            </p>
          ))}
        </>
      )}

      {/* Buttons */}
      <div className="buttons">
        {step > 1 && <button onClick={prev}>Back</button>}
        {step < 3 && <button onClick={next}>Next</button>}
        {step === 3 && <button onClick={submit}>Submit</button>}
      </div>

    </div>
  );
}

export default MultiStepForm;