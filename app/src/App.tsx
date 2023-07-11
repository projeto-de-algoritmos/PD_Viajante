import { useState } from 'react'
import './App.css'
import { Button, Dialog, DialogTitle, Divider, List, ListItem, ListItemText, Paper, TextField } from '@mui/material'
import knapsack from './knapsackPd'
interface Task {
  name: string;
    weight: number;
    value: number;
}

const defaultValueTask = {
  name: '',
  weight: 0,
  value: 0
}

function App() {
  const [task, setTask] = useState(defaultValueTask)
  const [capacity, setCapacity] = useState(10)
  const [tasks, setTasks] = useState<Task[]>([])

  const [open, setOpen] = useState(false);

  function onAddTask() {
    setTasks([...tasks, task])
    setTask(defaultValueTask)
  }

  const toggleDialog = () => {
    setOpen(!open)
  };

  const result = knapsack(tasks, capacity)

  return (
    <>
      <div className='logo_icon'>
        <img src='aviao.png'  className="logo react" alt="React logo" />
      </div>
      <h1 className='text'>Mochila do Viajante</h1>
      
      <Paper>
        <TextField defaultValue={10} onChange={({ target }) => !Number.isNaN(target.value) ? setCapacity(parseInt(target.value)) : setCapacity(0)} label="Qual a capacidade da sua mochila?" type='number' variant="standard" style={{ margin: 6}}/>
      </Paper>
      
      <div className='items-list'>
        <Paper elevation={4} style={{ padding: 10, margin: 5, display: 'flex', flexDirection: 'column', alignContent: 'space-around', maxHeight: 300}}>
          <TextField value={task.name} onChange={(e) => setTask({ ...task, name: e.target.value})} label="Nome do item" variant="outlined" style={{ margin: 6}}/>
          <TextField value={task.value} onChange={(e) => setTask({ ...task, value: parseInt(e.target.value)})} label="Valor" type='number' variant="outlined" style={{ margin: 6}}/>
          <TextField value={task.weight} onChange={(e) => setTask({ ...task, weight: parseInt(e.target.value)})} label="Peso" type='number' variant="outlined" style={{ margin: 6}}/>

          <Button onClick={onAddTask} variant='contained'>Adicionar</Button>
          <Button onClick={toggleDialog} variant='contained' style={{marginTop: 8}}>Calcular</Button>
        </Paper>

        <Paper style={{ width: '100%', maxHeight: 400, overflow: 'auto'}}>
          <List>
            <ListItem>
              <ListItemText className="add"
                primary="Itens adicionados"
              />
            </ListItem>
            <Divider />
            {tasks.map(task => (
              <ListItem>
                <ListItemText className="add"
                  primary={task.name}
                  secondary={`Valor:${task.value} Peso:${task.weight}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

      </div>

      <div>
        <img src='viajante.png' height={400} className='viajante' />
      </div>

      <Dialog onClose={toggleDialog} open={open} style={{}}>
        <DialogTitle>Sua mochila ficou assim :)</DialogTitle>
        <span>Valor total: {result.maxValue}</span>
        <span>Peso Total: {result.totalWeight}</span>

        <Paper style={{ width: '100%', maxHeight: 200, overflow: 'auto'}}>
          <List>
            <ListItem>
              <ListItemText className="add"
                primary="Itens para levar"
              />
            </ListItem>
            <Divider />
            {result.selectedItems.map(item => (
              <ListItem>
                <ListItemText className="add"
                  primary={item.name}
                  secondary={`Valor:${item.value} Peso:${item.weight}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Dialog>
    </>
  )
}

export default App
