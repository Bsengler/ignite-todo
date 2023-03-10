import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

 export type EditTasksArgs = {
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) { 

    const taskCheck = tasks.find(item => item.title === newTaskTitle)
    if (taskCheck) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }
    
    const newTesk = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(oldState => [...oldState, newTesk]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const foundItem = updatedTasks.find(item => item.id === id);

    if (!foundItem) {
      return;
    }
    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'NÃO',
        style: 'cancel',
      },
      {
        text: 'SIM', onPress: () =>
          setTasks(oldState => oldState.filter(
            tasks => tasks.id !== id
          ))
      },
    ]);
  }

  function handleEditTask({taskId, taskNewTitle }: EditTasksArgs ) {

    const updatedTasks = tasks.map(task => ({ ...task }))
  
    const taskSelected = updatedTasks.find(item => item.id === taskId);
    if (!taskSelected) {
      return;
    }
    taskSelected.title = taskNewTitle;
    setTasks(updatedTasks);


  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})