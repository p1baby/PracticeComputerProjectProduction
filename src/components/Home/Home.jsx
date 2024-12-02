import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import db from '../../firebase'; // путь firebase
import CreateTodoField from './create-todo-field/CreateTodoField'
import TodoItem from './item/TodoItem'

const Home = () => {
    const [todolist, setTodolist] = useState([]);

    // Загрузка данных из Firestore
    useEffect(() => {
        const fetchTodos = async () => {
            const querySnapshot = await getDocs(collection(db, 'todos'));
            const todos = querySnapshot.docs.map(doc => ({ ...doc.data(), _id: doc.id }));
            setTodolist(todos);
        };
        fetchTodos();
    }, []);

    // Обновление состояния в Firestore
    const changeTodolist = async id => {
        const todoRef = doc(db, 'todos', id);
        const todo = todolist.find(t => t._id === id);
        await updateDoc(todoRef, { isCompleted: !todo.isCompleted });
        setTodolist(prev => prev.map(t => (t._id === id ? { ...t, isCompleted: !t.isCompleted } : t)));
    };

    const removeTodo = async id => {
        await deleteDoc(doc(db, 'todos', id));
        setTodolist(prev => prev.filter(t => t._id !== id));
    };

    return (
        <section className='text-white w-4/5 mx-auto'>
            <h1 className='text-2xl font-bold text-center mb-8'>TODO Application</h1>
            {todolist.map(todo => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    removeTodo={removeTodo}
                    changeTodolist={changeTodolist}
                />
            ))}
            <CreateTodoField setTodolist={setTodolist} />
        </section>
    );
};

export default Home;
