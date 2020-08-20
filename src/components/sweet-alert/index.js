/* eslint-disable react/prop-types */
import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

export default function BasicSweetCallback({
  title,
  description,
  alert,
  onCancel,
  onSuccess,
  name,
}) {
  return (
    <>
      <SweetAlert
        title={title}
        warning
        show={alert}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Sim"
        cancelBtnText="Não"
        onConfirm={() => {
          onSuccess();
        }}
        onCancel={() => {
          onCancel();
        }}
      >
        {description} {name}?
      </SweetAlert>
    </>
  );
}
