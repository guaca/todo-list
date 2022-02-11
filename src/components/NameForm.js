import { useState } from 'react';

const NameForm = ({ name, setName }) => {
    const [inputText, setInputText] = useState('');
    const nameHandler = (e) => {
        setInputText(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        setName(inputText);
        setInputText('');
        localStorage.setItem('name', JSON.stringify(name));
    };

    return (
        <form>
            <input
                value={inputText}
                onChange={nameHandler}
                type="text"
                className="todo-input" />
            <button onClick={submitHandler} type="submit">
                <i className="fas fa-plus-square"></i>
            </button>
        </form>
    );
};
export default NameForm;