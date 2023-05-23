import React, {useState} from 'react';
import styles from '../styles.module.css';

const AddItem = props => {
    
    const [newItem, setNewitem] = useState("");
    const [todoList, setTodoList] = useState([]);

    const handleNewSubmit = (e) => {
        e.preventDefault();
        if(newItem.length == 0){
            return;
        }

        const todoItem = {
            text: newItem, 
            complete: false
        }

        setTodoList([...todoList, todoItem])
        setNewitem("");
    };

    const handleItemState = (itemIndex) => {
        const toggledList = todoList.map((newItem, i) => {
            if(itemIndex == i) {
                newItem.complete = !newItem.complete;
            }
            return newItem;
        })
        setTodoList(toggledList)
    }

    const handleItemDelete = (indexDelete) => {
        const updatedList = todoList.filter((todoList, i) => {
            return i !== indexDelete
        });

        setTodoList(updatedList);
    }
    
    return (
        <div className={styles.content}>
            <h2>Create your own To Do List!</h2>
            <form onSubmit={(e) => { handleNewSubmit(e)}}>
                    <input type ="text" value={ newItem } onChange={(e) => setNewitem(e.target.value)} />
                <div>
                    <button type='submit'>Add Item</button>
                </div>
            </form>

            <h3>Your list : </h3>
                {
                    todoList.map((todo, index) =>(
                        <div className={styles.inline} key={index}>
                            <input type='checkbox' checked={todo.complete} onChange={(e) => {
                                handleItemState(index)
                            }} />
                            <p className={todo.complete ? styles.completed : ''}>{todo.text}</p>
                            <button className={styles.delete} onClick={(e) =>{handleItemDelete(index)}}>Delete</button>
                            
                        </div>
                    ))
                }
            

        </div>
    );

};

export default AddItem;