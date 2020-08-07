import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, CardBody, Row, Col, FormGroup, Label } from 'reactstrap';
import { Lock, Check, User } from 'react-feather';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import Checkbox from '~/components/@vuexy/checkbox/CheckboxesVuexy';

import loginImg from '~/assets/img/pages/login.png';
import '~/assets/scss/pages/authentication.scss';
import { signInRequest } from '~/redux/_modules/auth/actions';

const SignInSchema = Yup.object().shape({
  user: Yup.string().required('Digite seu usuário'),
  password: Yup.string().required('Digite sua senha'),
});

export default function Login() {
  const dispatch = useDispatch();

  function handleSubmit({ user, password }) {
    dispatch(signInRequest(user, password));
  }

  return (
    <Row className="m-0 justify-content-center">
      <Col
        sm="8"
        xl="7"
        lg="10"
        md="8"
        className="d-flex justify-content-center"
      >
        <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col
              lg="6"
              className="d-lg-block d-none text-center align-self-center px-1 py-0"
            >
              <img src={loginImg} alt="loginImg" />
            </Col>
            <Col lg="6" md="12" className="p-0">
              <Card className="rounded-0 mb-0 px-2">
                <CardBody>
                  <h4>Acessar</h4>
                  <p>Olá novamente, digite seu login e senha.</p>
                  <Form schema={SignInSchema} onSubmit={handleSubmit}>
                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="text"
                        name="user"
                        value="taiuan@certifis"
                        placeholder="Usuário"
                        className="input-full"
                      />
                      <div className="form-control-position">
                        <User size={15} />
                      </div>
                      <Label>Usuário</Label>
                    </FormGroup>
                    <FormGroup className="form-label-group position-relative has-icon-left">
                      <Input
                        type="password"
                        name="password"
                        value="123456"
                        placeholder="Senha"
                        className="input-full"
                      />
                      <div className="form-control-position">
                        <Lock size={15} />
                      </div>
                      <Label>Senha</Label>
                    </FormGroup>
                    <FormGroup className="d-flex justify-content-between align-items-center">
                      <Checkbox
                        color="primary"
                        icon={<Check className="vx-icon" size={16} />}
                        label="Manter conectado"
                      />
                      {/* <div className="float-right">Esqueceu a senha?</div> */}
                    </FormGroup>
                    <div className="d-flex justify-content-between">
                      <Button.Ripple color="primary" outline>
                        Solicitar Cadastro
                      </Button.Ripple>
                      <Button.Ripple color="primary" type="submit">
                        Acessar
                      </Button.Ripple>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
