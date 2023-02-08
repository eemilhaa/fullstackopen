const InputField = ({ text, value, handleChange }) => {
  return (
    <div>
      {text}
        <input
        type="text"
        value={value}
        name="title"
        onChange={handleChange}
        />
    </div>
  )
}

export default InputField
