import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import commonContext from '../../contexts/common/commonContext';
import useForm from '../../hooks/useForm';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';

const AccountForm = ({ setAuth }) => {

    const { isFormOpen, toggleForm } = useContext(commonContext);
    const { inputValues, handleInputValues } = useForm();

    const formRef = useRef();

    useOutsideClose(formRef, () => {
        toggleForm(false);
    });

    useScrollDisable(isFormOpen);

    const [isSignupVisible, setIsSignupVisible] = useState(false);


    // Signup-form visibility toggling
    const handleIsSignupVisible = () => {
        setIsSignupVisible(prevState => !prevState);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log(inputValues);
            if(inputValues.email !== "" && inputValues.password !== ""){
                const formData = new FormData(formRef.current);
                let url = 'http://localhost:8000/api/user/login';
                if(isSignupVisible){
                    url = 'http://localhost:8000/api/user/signup';
                }
                const res = await fetch(url,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(inputValues)
                });
                const data = await res.json();
                if(res.status === 201){
                    alert("user registered");
                }if(res.status === 200){
                    alert("user login successful");
                    localStorage.setItem("token",inputValues.email);
                    localStorage.setItem("auth",data.auth);
                    setAuth(true);
                }else{
                    throw new Error("an server error");
                }
            }else{
                alert("Please enter the credentials");
            }
            } catch (err) {
           console.log(`an error in form:${err}`); 
           alert("an error occurred");
        }
    }

    return (
        <>
            {
                isFormOpen && (
                    <div className="backdrop">
                        <div className="modal_centered">
                            <form id="account_form" ref={formRef} onSubmit={handleSubmit}>

                                <div className="form_head">
                                    <h2>{isSignupVisible ? 'Signup' : 'Login'}</h2>
                                    <p>
                                        {isSignupVisible ? 'Already have an account ?' : 'New to ShopKart?'}
                                        &nbsp;&nbsp;
                                        <button type="button" onClick={handleIsSignupVisible}>
                                            {isSignupVisible ? 'Login' : 'Create an account'}
                                        </button>
                                    </p>
                                </div>

                                <div className="form_body">
                                    {
                                        isSignupVisible && (
                                            <div className="input_box">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="input_field"
                                                    value={inputValues.name || ''}
                                                    onChange={handleInputValues}
                                                    required
                                                />
                                                <label className="input_label">Username</label>
                                            </div>
                                        )
                                    }

                                    <div className="input_box">
                                        <input
                                            type="email"
                                            name="email"
                                            className="input_field"
                                            value={inputValues.email || ''}
                                            onChange={handleInputValues}
                                            required
                                        />
                                        <label className="input_label">Email</label>
                                    </div>

                                    <div className="input_box">
                                        <input
                                            type="password"
                                            name="password"
                                            className="input_field"
                                            value={inputValues.password || ''}
                                            onChange={handleInputValues}
                                            required
                                        />
                                        <label className="input_label">Password</label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn login_btn"
                                    >
                                        {isSignupVisible ? 'Signup' : 'Login'}
                                    </button>

                                </div>

                                <div className="form_foot">
                                    <p>or login with</p>
                                    <div className="login_options">
                                        <Link to="/">Facebook</Link>
                                        <Link to="/">Google</Link>
                                        <Link to="/">Twitter</Link>
                                    </div>
                                </div>

                                <div
                                    className="close_btn"
                                    title="Close"
                                    onClick={() => toggleForm(false)}
                                >
                                    &times;
                                </div>

                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default AccountForm;