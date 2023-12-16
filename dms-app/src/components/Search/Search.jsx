import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Search = ({onSubmit, content, searchTerm, setSearchTerm}) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <FormSearch onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder={content}
        value={searchTerm}
        onChange={handleChange}
      />
      <Button type="submit">Search</Button>
    </FormSearch>
  );
};

export default Search;

const FormSearch = styled.form`
  display: flex;
  margin: 20px auto;
`

const Input = styled.input`
  padding: 8px;
  width: 400px;
`

const Button = styled.button`
  padding: 8px;
  cursor: pointer;
  border: none;
  background-color: var(--bg-blue-color);
`