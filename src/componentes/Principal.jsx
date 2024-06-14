import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Result = ({ result }) => {
  const resultFields = [
    { label: 'Name', value: result.name },
    { label: 'Climate', value: result.climate },
    { label: 'Hair Color', value: result.hair_color },
    { label: 'Eye Color', value: result.eye_color },
    { label: 'Skin Color', value: result.skin_color },
    { label: 'Diameter', value: result.diameter },
    { label: 'Orbital Period', value: result.orbital_period },
    { label: 'Language', value: result.language },
    { label: 'Average height', value: result.average_height },
    { label: 'Classification', value: result.classification },
    { label: 'Director', value: result.director },
    { label: 'Producer', value: result.producer },
    { label: 'Title', value: result.title },
    { label: 'Episode Id', value: result.episode_id },
  ];

  return (
    <div>
      {resultFields.map((field, index) =>
        field.value ? (
          <div key={index} className='result'>
            {field.label}: {field.value}
          </div>
        ) : null
      )}
    </div>
  );
};

const Principal = () => {
  const [select, setSelect] = useState("");
  const [id, setId] = useState("1");
  const [error, setError] = useState(false);
  const [result, setResult] = useState({});
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    axios.get('https://swapi.dev/api/')
      .then(response => {
        const listaResultado = Object.entries(response.data).map(([key, value]) => ({ label: key, url: value }));
        setOpciones(listaResultado);
        setSelect(listaResultado[0]?.url || "");
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    let url = select + id;
    axios.get(url)
      .then(response => {
        setError(false);
        setResult(response.data);
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  };

  return (
    <div>
      <form className='container-contenido' onSubmit={handleBuscar}>
        <p>Search For: </p>
        <select value={select} onChange={(e) => setSelect(e.target.value)} className="select">
          {opciones.map((item, index) =>
            <option key={item.label + index} value={item.url}>{item.label}</option>
          )}
        </select>
        <div>
          <label>
            <p>id: <input type='number' value={id} onChange={(e) => setId(e.target.value)} className="input" /></p>
          </label>
        </div>
        <button type='submit' className='btn'>Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>An error occurred. Please try again.</p>}
      <Result result={result} />
    </div>
  );
};

export default Principal;
