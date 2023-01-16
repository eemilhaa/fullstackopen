const Search = ({ handleSearch }) => {
  return (
    <div>
      search: <input onChange={handleSearch} />
    </div>
  );
};

export default Search

