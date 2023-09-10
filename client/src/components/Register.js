import { useState } from "react";

const Register = ({ register }) => {
  const [clientId, setClientId] = useState(null);

  const handleChange = (event) => {
    setClientId(event.target.value);
  };

  const handleRegister = () => {
    register(clientId);
  };

  return (
    <section>
      <h1>Please Enter A Client ID</h1>
      <input onChange={handleChange} type="text"></input>
      <button onClick={handleRegister}>Send</button>
    </section>
  );
};

export default Register;
