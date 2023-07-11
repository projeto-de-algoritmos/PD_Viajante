import { useState } from 'react'
import './App.css'
import { Button, Divider, List, ListItem, ListItemText, Paper, TextField } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='logo_icon'>
        <img src='aviao.png'  className="logo react" alt="React logo" />
      </div>
      <h1 className='text'>Mochila do Viajante</h1>

      <div className='items-list'>
        <Paper elevation={4} style={{ padding: 10, margin: 5, display: 'flex', flexDirection: 'column', alignContent: 'space-around'}}>
          <TextField label="Nome do item" variant="outlined" style={{ margin: 6}}/>
          <TextField label="Valor" type='number' variant="outlined" style={{ margin: 6}}/>
          <TextField label="Peso" type='number' variant="outlined" style={{ margin: 6}}/>

          <Button variant='contained'>Adicionar</Button>
        </Paper>

        <Paper style={{ width: '100%'}}>
          <List>
            <ListItem>
              <ListItemText className="add"
                primary="Itens adicionados"
              />
            </ListItem>
            <Divider />
          </List>
        </Paper>

      </div>

      <div>
          <img src='viajante.png' height={400} className='viajante' />
        </div>
    </>
  )
}

export default App
