import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { connect } from "react-redux";
import { addTodo } from "../redux/actions.js";
import "../static/Form.css";

const Form = ({ addTodo }) => {
    // const {
    //     updateInputText,
    //     todos,
    //     updateTodos,
    //     updateStatus,
    // } = props;
    const getTodo = () => {
        return document.getElementById("todo-input").value;
    };

    // const inputTextHandler = (e) => {
    //     e.preventDefault();
    //     // get input text
    //     let todo = getTodo();
    //     // update input text to todos
    //     updateInputText(todo);
    //     updateTodos([
    //         ...todos,
    //         { text: todo, completed: false, id: todos.length },
    //     ]);
    //     // clear input field
    //     updateInputText("");
    //     document.getElementById("todo-input").value = "";
    // };

    const handleAddTodo = (e) => {
        // stop refreshing the page
        e.preventDefault();

        let todo = getTodo();
        // post with axios
        // axios.post("https://jsonplaceholder.typicode.com/todos", {
        //     title: todo,
        //     completed: false,
        // }).then(res => addTodo(res.data));
        // dispatch actions to add todo

        // console.log(/^ *$/.test(todo));
        // Only adds non-empty todos
        if (!/^ *$/.test(todo)) {
            addTodo(todo);
            // Clear input field
            document.getElementById("todo-input").value = "";
        }
    };

    return (
        <form>
            <input type="text" id="todo-input" autoFocus />
            <button
                className="todo-button"
                id="submit"
                type="submit"
                onClick={handleAddTodo}
            >
                {/* <FontAwesomeIcon icon="coffe" /> */}
                <FontAwesomeIcon
                    icon={["fas", "plus-square"]}
                    // size="2x"
                />
            </button>
        </form>
    );
};

export default connect(null, { addTodo })(Form);
