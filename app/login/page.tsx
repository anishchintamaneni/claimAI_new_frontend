'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';

// Import styles from the `css` folder
import './css/util.css';
import './css/main.css';
// Import vendor styles
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
// Import any other needed styles
import './images/docquest_logo.png';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username && password) {
      router.push('/userhome'); // Redirect to userhome page
    } else {
      alert('Please enter valid credentials');
    }
  };
  return (
    <>
      <Head>
        <title>DocQuest Login</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/images/icons/favicon.ico" />
        <link rel="stylesheet" href="/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/fonts/font-awesome-4.7.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/vendor/animate/animate.css" />
        <link rel="stylesheet" href="/vendor/css-hamburgers/hamburgers.min.css" />
        <link rel="stylesheet" href="/vendor/select2/select2.min.css" />
        <link rel="stylesheet" href="/css/util.css" />
        <link rel="stylesheet" href="/css/main.css" />
      </Head>

      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form">
              <img
                src="/docquest_logo.png"
                alt="DocQuest Logo"
                className="logo"
                width="300px"
                height="100px"
                style={{ display: 'block', margin: '0 auto' }}
              />
              <span className="login100-form-title">Welcome</span>

              <div className="wrap-input100 validate-input" data-validate="Username is required">
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button
                  type="button"
                  className="login100-form-btn"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>

              <div className="text-center p-t-12">
                <span className="txt1">Forgot</span>
                <Link href="#" legacyBehavior>
                  <span className="txt2"> Username / Password?</span>
                </Link>
              </div>

              <div className="text-center p-t-136">
                <Link href="#">
                  Create your Account
                  <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
