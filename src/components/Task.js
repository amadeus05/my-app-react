import React from 'react'
class Task extends React.Component {
    render() {
        return (
            <div className="font">
                <div className="registration">
                    <h1>Задание</h1>
                    <form className="form-reg">
                        <input type="text" name="head" placeholder="Заголовок" />
                            <textarea rows="3" name="task" placeholder="Нипишите вашу заметку"></textarea>
                            <input type="datetime-local" />
                                <button className="btn" type="sibmit">Создать</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Task;