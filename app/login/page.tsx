"use client";
import React from "react";
import "@/app/styles/login-style.css";
import Image from "next/image";
import loginLogo from "@/public/haytek-login-logo.png";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormState } from "react-dom";
import logInAction from "./loginAction";
import Link from "next/link";

const LogInPage = () => {
  const [error, formAction] = useFormState(logInAction, undefined);
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
            <Form.Label>Şifre:</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Şifrenizi giriniz"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="submit-button">
            Giriş Yap
          </Button>
          {error && <p className="error-message">{error}</p>}
          <Link href={"/signup"} className="form-link">
            Hesabınız yok mu? Kayıt ol
          </Link>
        </Form>
      </div>
    </main>
  );
};

export default LogInPage;
