import React from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const  url = "http://symfony-dev/login_check";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            fields: {
                username: '',
                password:'',
            },
            errors: {
                username: '',
                password:'',
            }
        }
    }

    handleChange = (e) => {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        console.log(e.target.name);
        this.setState({fields})
    };


    handleSubmit = (e) => {

        e.preventDefault();
        //let userData = new FormData(e.target);
        let data = {'username': this.state.fields.username,"password": this.state.fields.password};
                        axios.post(url, data, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then(function (res)
                        {
                           console.log( res);
                           cookies.set('jwt',res.data['token'], { path: '/' });
                           console.log(cookies.get('jwt'))
                        }).catch(function (error) {
                            // handle error
                            console.log(error);
                        })


        // axios.get('http://symfony-dev/test'+ userData)
        //     .then(function (response) {
        //         console.log(response);
        //         //todo depends on request make redirect to user page
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    };

    render() {
        const {email, password} = this.state.fields;
        return (
            <div className="font">
                <div className="registration">
                    <h1>Sign up</h1>
                    <form className="form-reg" onSubmit={this.handleSubmit}>
                        <input
                            value={email}
                            type="text"
                            name="username"
                            placeholder='username' //{!this.value || this.state.errors.email === ''? 'hz': this.state.errors.email}
                            onChange={this.handleChange}/>
                        <label htmlFor="in" className="errorMsg">{this.state.errors.email}</label>

                        <input
                            value={password}
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={this.handleChange}/>
                        <label htmlFor="in" className="errorMsg">{this.state.errors.password}</label>
                        <button className="btn" type="submit">Войти</button>
                    </form>
                    <a className="" href="/signin">Create an account?</a>
                </div>
            </div>

        )
    }
}

export default SignUp
