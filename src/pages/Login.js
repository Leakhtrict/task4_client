import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function Login() {
    let history = useHistory();

    const initialValues = {
        nameOrEmail: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        nameOrEmail: Yup.string().required("Username or E-Mail are required."),
        password: Yup.string().required("Password is required.")
    });

    const onSubmit = (data) => {
        axios.post("https://itransition-summer-task4.herokuapp.com/users/login", data).then((response) => {
            if (response.data.error){
                alert(response.data.error);
            }
            else{
                localStorage.setItem("accessToken", response.data);
                history.push("/");
                history.go(0);
            }
        });
    };

    return (
        <div className="loginPage">
            <Formik 
            initialValues={initialValues} 
            onSubmit = {onSubmit}
            validationSchema={validationSchema}>
                <Form className="loginForm">
                    <ErrorMessage name="nameOrEmail" component="span"/>
                    <Field 
                    autocomplete="off" 
                    id="loginFormField" 
                    name="nameOrEmail" 
                    placeholder="Username or E-mail" />
                    <ErrorMessage name="password" component="span"/>
                    <Field 
                    autocomplete="off" 
                    type="password"
                    id="loginFormField" 
                    name="password" 
                    placeholder="Password" />

                    <button type="submit"> Log In</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Login;
