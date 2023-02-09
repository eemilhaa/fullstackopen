const InputField = ({ prompt, type, value, name, handleChange }) => {
  return (
    <div>
      {prompt}
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
        />
    </div>
  )
}

export default InputField
