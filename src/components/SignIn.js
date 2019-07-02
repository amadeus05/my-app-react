import React from 'react'
import "../styles/SignIn.css"
import axios from 'axios';

const requestUrl = "http://symfony-dev/register";
const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
const possibleErrors = {
    username: {
        length: 'user name i too short'
    },
    password: {
        length: 'too short password'
    }
};

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {

            },
            errors: {
                username: '',
                password: '',
                email: '',
                passwordConfirm: ''
            },
            disabled: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit = (e) => {

        e.preventDefault();
        if (this.validation()) {
            this.setState({disabled: true});
            let formData = new FormData(e.target);
            console.log("submit event");
            axios.post(requestUrl, formData).then((res)=>{
                console.log(res);
                window.location = "/signup"
            })
        }
    };

    onChange = (e) => {
        console.log(e.target.value);
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState(fields);
        // const {name, value} = e.target;
        // let errors = this.state.errors;
        // switch (name) {
        //     case "username":
        //         errors.username = value.length < 5 && value.length > 0 ? possibleErrors.username.length : '';
        //         break;
        //     case 'password':
        //         errors.password = value.length < 6 && value.length > 0 ? possibleErrors.password.length : '';
        //         if (this.state.errors.password ==='' || !this.state.errors.password){
        //             this.setState( {disabled: false})
        //         }else {
        //             this.setState( {disabled: true})
        //         }
        //         break;
        //     case "email":
        //         if (!this.state.fields.email){
        //         errors.email = "*Please enter your email.";
        //         }else errors.email = !pattern.test(value) ? 'Please enter valid email': '';
        //
        //         break;
        //     case "confirmPassword":
        //         break;
        //     default:
        //         break
        // }
        //
        //
        // this.setState({ errors, [name]: value }, () => console.log(this.state));
    };



    validation() {
        let fields = this.state.fields;
        let errors = {};
        let isFormValid = true;

        /*****************************
         *         user name         *
         *****************************/

        if (!fields['username']) {
            isFormValid = false;
            errors['username'] = '*Mb enter u name ?'
        }

        if (typeof fields['username'] === 'undefined') {
            if (fields['username'].match(/^[a-zA-Z ]*$/)) {
                isFormValid = false;
                errors['username'] = '*Omg use ONLY alphabet characters...'
            }
        }

        /******************************
         *         user email         *
         ******************************/
        if (!fields["email"]) {
            isFormValid = false;
            errors["email"] = "*Please enter your email.";
        }

        if (typeof fields["email"] !== 'undefined') {
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

            if (!pattern.test(fields["email"])) {
                isFormValid = false;
                errors["email"] = "*Please enter valid email.";
            }
        }



        /******************************         *
         *         user password         *
         ******************************/

        if (!fields["password"]) {
            isFormValid = false;
            errors["password"] = "*Please enter your password.";
        }

        /******************************         *
         *    user password confirm         *
         ******************************/

        if (fields["password"] !== fields['passwordConfirm']) {

            this.setState({fields: {passwordConfirm: ''}});

            isFormValid = false;
            errors["passwordConfirm"] = "*Passwords dont match try again loser";
        } else if (typeof fields["password"] === undefined) {

            isFormValid = false;

            errors["passwordConfirm"] = "*Enter something ... ";
        }

        this.setState({errors: errors});
        if (isFormValid){
            this.setState( {disabled: false} )
        }
        return isFormValid;
    }


    render() {
        return (
            <div className="font">
                <div className="registration">
                    <h1>Registration</h1>
                    <form onSubmit={this.onSubmit} className="form-reg">

                        <input value={this.state.fields.email}
                               type="email"
                               name="email"
                               placeholder='Email'
                               onChange={this.onChange}/>
                        <label htmlFor="in"
                               className="errorMsg">{this.state.errors.email}</label>

                        <input value={this.state.fields.username}
                               type="text"
                               name="username"

                               placeholder="User name"

                               onChange={this.onChange}/>
                        <label htmlFor="in"
                               className="errorMsg">{this.state.errors.username}</label>

                        <input value={this.state.fields.password}
                               type="password"
                               name="password"
                               placeholder="Your password"
                               onChange={this.onChange}
                        onBlur={this.handleBlur}/>
                        <label htmlFor="in"
                               className="errorMsg">{this.state.errors.password}</label>

                        <input value={this.state.fields.passwordConfirm}
                               type="password"
                               name="passwordConfirm"
                               placeholder="Confirm password"
                               onChange={this.onChange}
                               disabled={(this.state.disabled) ? "disabled" : ""}
                        />
                        <label htmlFor="in" className="errorMsg">{this.state.errors.passwordConfirm}</label>
                        <button className="btn" type="submit">Register</button>
                    </form>
                    <a className="" href="/signup">Already have an account?</a>

                </div>
            </div>


        )
    }
}

export default SignIn
//         if (errors['email'] === '' || !errors['email']){
// //todo
//                     if (this.state.errors.email === undefined) {
//                         let exist = '';
//                         let data = this.state.fields['email'];
//                         axios.get(`api/${data}`)
//                             .then(response => {
//                                 console.log(response);
//                                 exist = response;
//                             })
//                             .catch(error => {
//                                 console.log(error.response)
//                             });
//                         errors['email'] = exist === 'dontExist' ? '' : 'this Email is in used!'
//                     }
//         }
//         if (fields["password"] !== "undefined") {
//             if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
//                 isFormValid = false;
//                 errors["password"] = "*Please enter secure and strong password (suffer bitch =))))";
//             }
//         }