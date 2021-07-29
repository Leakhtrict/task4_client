import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router-dom";


function Register() {
    let history = useHistory();

    const initialValues = {
        username: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required."),
        email: Yup.string().email("Wrong input").required("E-Mail is required."),
        password: Yup.string().required("Password is required.")
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/users/register", data).then((response) => {
            localStorage.setItem("accessToken", response.data);
            history.push("/login");
        });
    };

    return (
        <div className="registerPage">
            <Formik 
            initialValues={initialValues} 
            onSubmit = {onSubmit}
            validationSchema={validationSchema}>
                <Form className="registerForm">
                    <ErrorMessage name="username" component="span"/>
                    <Field 
                    autocomplete="off" 
                    id="registerFormField" 
                    name="username" 
                    placeholder="Username" />
                    <ErrorMessage name="email" component="span"/>
                    <Field 
                    autocomplete="off" 
                    id="registerFormField" 
                    name="email" 
                    placeholder="E-mail" />
                    <ErrorMessage name="password" component="span"/>
                    <Field 
                    autocomplete="off" 
                    type="password"
                    id="registerFormField" 
                    name="password" 
                    placeholder="Password" />

                    <button type="submit"> Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Register;
