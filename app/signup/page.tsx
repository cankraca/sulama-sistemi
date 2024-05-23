"use client";

import React from "react";
import "@/app/styles/login-style.css";
import { Button, Form } from "react-bootstrap";
import Image from "next/image";
import { useFormState } from "react-dom";
import loginLogo from "@/public/haytek-login-logo.png";
import signUpAction from "./signupAction";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

const SignUpForm = () => {
  const [error, formAction] = useFormState(signUpAction, undefined);
  return (
    <main>
      <Image src={loginLogo} alt="Logo" style={{ pointerEvents: "none" }} />
      <div className="log-in-container">
        <Form className="login-form" action={formAction}>
          <Form.Group className="form-group">
            <Form.Label>E-posta:</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="E-posta adresinizi giriniz"
              required
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Kullanıcı Adı:</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Kullanıcı Adı Belirleyin"
              required
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Şifre:</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Şifre Belirleyin"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-button">
            Kayıt Ol
          </Button>
          {error && <p className="error-message">{error}</p>}
          <Link href={"/login"} className="form-link">
            Hesabınız var mı? Giriş yap
          </Link>
        </Form>
      </div>
    </main>
  );
};

export default SignUpForm;
