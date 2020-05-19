import React, { useEffect, useState } from "react";
import api from 'services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const data = Date.now();

    api.post('repositories', {
      "title": `Repositório ${data}`,
      "url": `URL ${data}`,
      "techs": ["tech1", "tech2"]
      
    }).then(response => {
      const repository = response.data;
      setRepositories([...repositories, repository]);
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      const index = repositories.findIndex(repository => repository.id === id);
      const newRepositories = repositories;
      newRepositories.splice(index, 1);

      if(index >= 0) setRepositories([...newRepositories]);
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
  
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
        </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
