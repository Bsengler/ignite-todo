import React, { useState, useRef, useEffect } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import { EditTasksArgs } from '../pages/Home';
import { Task } from './TasksList';

import editIcon from '../assets/icons/pen/pen.png';

interface TasksItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTasksArgs) => void;
}


export function TaksItem({ task, toggleTaskDone, removeTask, editTask }: TasksItemProps) {

  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEditing(true);
  }

  function handleCancelEditing() {
    setEditValue(task.title);
    setEditing(false)
  }

  function handleSubmitEditing() {
    editTask({ taskId: task.id, taskNewTitle: editValue });
    setEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (editing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editing])


  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            style={task.done ? styles.taskMarkerDone :
              styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={editValue}
            editable={editing}
            onChangeText={setEditValue}
            onSubmitEditing={handleSubmitEditing}
          />

        </TouchableOpacity>
      </View>

      <View style={styles.containerItens}>
        {editing ?
          <>
            <TouchableOpacity
              onPress={handleCancelEditing}
            >
              <Icon name="x" size={24} color="#c73a40" />
            </TouchableOpacity>
          </>
          :
          <>
            <TouchableOpacity
              onPress={handleStartEditing}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
          </>
        }
        <View style={styles.iconSeparator}/>

        <TouchableOpacity
          onPress={() => removeTask(task.id)}
          disabled={editing}
        >
          <Image source={trashIcon} style={{ opacity: editing ? .2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerItens: {
    flexDirection: 'row', 
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 24
  },
  iconSeparator: {
    width: 1,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
    height: 24,
    marginHorizontal: 12
  },

  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 5,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
})