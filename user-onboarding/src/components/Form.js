import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import Axios from "axios";
//import axios from "axios";

const UserForm = ({errors, touched, values, status}) => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        status && setUser(users => [...users, status]);
    }, [status]);

    return (
        <div className="user-form">
            <h1>User Form</h1>
            <Form>
                <Field 
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={values.name}
                />
                {touched.name && errors.name && <p>{errors.name}</p>}

                <Field 
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                />
                {touched.email && errors.email && <p>{errors.email}</p>}

                <Field 
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={values.password}
                />
                {touched.password && errors.password && <p>{errors.password}</p>}

                <label>
                    Terms of Services. Check to Accept
                    <Field type="checkbox" name="tos" checked={values.tos} />
                </label>

                <button type="submit">Submit</button>

            </Form>

            {user.map(user => (
                <ul>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: {user.password}</li>
                </ul>
            ))}
        </div>
    );
};

const FormikForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be 6 characters or longer")
            .required("Password is required"), 
        tos: Yup.bool().required("Please check box")
    }),

    handleSubmit(values, {setStatus, resetForm}) {
        console.log("Submitting form:", values);

        Axios
            .post(`https://reqres.in/api/users`, values) 
            .then(res => {
                console.log("Success:", res);
                setStatus(res.data);
                resetForm();
              })
              .catch(err => {
                console.log("Error:", err.response);
              });
    }
})(UserForm);


export default FormikForm;