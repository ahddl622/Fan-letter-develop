const { useState } = require("react");

const useForm = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState);
  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormState(initialState);
  };
  return { formState, onChangeInput, resetForm };
};

export default useForm
