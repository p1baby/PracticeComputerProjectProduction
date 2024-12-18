// import React, { useState } from 'react'

// const CreateTodoField = ({setTodolist}) => {

//     const [title, setTitle] = useState('')

//     const addTodo = (title) => {
//         setTodolist(prev => [
//             {
//                 _id: new Date(),
//                 title,
//                 isCompleted:false
//             },
//             ...prev, 
//         ])
//         setTitle('')
//     }

//   return (
//     <section className='flex items-center justify-between mb-4 rounded-2xl border-zinc-800 border-2 px-5 py-3 w-full mt-20'>
//         <input 
//         type='text' 
//         onChange={e => setTitle(e.target.value)} 
//         value={title}
//         onKeyPress={e => e.key === 'Enter' && addTodo(title)}
//         className='bg-transparent w-full border-none outline-none'  
//         placeholder='Add some task' 
//         />
//     </section>
//   )
// }
import { addDoc, collection } from 'firebase/firestore'
import React, { useState } from 'react'
import db from '../../../firebase'

const CreateTodoField = ({ setTodolist }) => {
    const [title, setTitle] = useState('');

    const addTodo = async title => {
        const newTodo = {
            title,
            isCompleted: false,
        };
        const docRef = await addDoc(collection(db, 'todos'), newTodo);
        setTodolist(prev => [{ ...newTodo, _id: docRef.id }, ...prev]);
        setTitle('');
    };

    return (
        <section className='flex items-center justify-between mb-4 rounded-2xl border-zinc-800 border-2 px-5 py-3 w-full mt-20'>
            <input
                type='text'
                onChange={e => setTitle(e.target.value)}
                value={title}
                onKeyPress={e => e.key === 'Enter' && addTodo(title)}
                className='bg-transparent w-full border-none outline-none'
                placeholder='Add some task'
            />
        </section>
    );
};

export default CreateTodoField;
