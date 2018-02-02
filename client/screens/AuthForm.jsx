import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { OauthBttns } from '../components'
import { auth, oauth } from '../store'

const AuthForm = (props) => {
    const { displayName, name, auth, oauth } = props
    console.log(name)
    return (
        <div>
            <div>
                <h2>{ displayName }</h2>
                <form name={ name } onSubmit={ auth } >
                    <input name="email" type="email" placeholder= "Email" />
                    <input name="password" type="password" placeholder="Password" />
                    <button type="submit" >{ name }</button>
                </form>
                <OauthBttns method={ name } oauth={ oauth } />
            </div>
        </div>
    )
}

const mapLogin = (store) => ({
    name: 'login',
    displayName: 'Login',
})
const mapSignup = (store) => ({
    name: 'signup',
    displayName: 'Signup',
})
//Method for the auth thunk will be login/signUp or authentication with google/facebook
const mapDispatch = (dispatch) => ({
    auth(evt){
        evt.preventDefault()
        const method = evt.target.name
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(method, email, password))
    }
})

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm))
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm))
