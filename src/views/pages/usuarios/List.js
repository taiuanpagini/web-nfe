/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Spinner, Card, CardBody, Badge, Button, Input } from 'reactstrap';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Search, Edit, Trash } from 'react-feather';
import Moment from 'moment';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import history from '~/history';
import Breadcrumbs from '~/components/@vuexy/breadCrumbs/BreadCrumb';
import api from '~/services/api';
import BasicSweetCallback from '~/components/sweet-alert';
import { FormataFone } from '~/services/funcoesGlobais';

const CustomHeader = (props) => {
  const { value } = props;
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple color="primary" onClick={() => history.push('/usuario')}>
          Novo Usuário
        </Button.Ripple>
      </div>
      <div className="position-relative has-icon-left mb-1">
        <Input value={value} onChange={(e) => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  );
};

function ActionsComponent(props) {
  return (
    <div className="data-list-action">
      <Edit
        className="cursor-pointer mr-1"
        size={20}
        onClick={() => props.currentData(props.row)}
      />
      <Trash
        className="cursor-pointer"
        size={20}
        onClick={() => {
          props.deleteRow(props.row);
        }}
      />
    </div>
  );
}

export default function ListUsuarios() {
  const token = useSelector((state) => state.auth.token);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [valueState, setValue] = useState('');
  const [columns] = useState([
    {
      name: 'Name',
      selector: 'name',
      sortable: true,
      minWidth: '200px',
      cell: (row) => (
        <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
          <div className="user-img ml-xl-0 ml-2">
            <img
              className="img-fluid rounded-circle"
              height="36"
              width="36"
              src={
                row.avatar
                  ? row.avatar
                  : `https://api.adorable.io/avatars/285/${row.name}.png`
              }
              alt={row.name}
            />
          </div>
          <div className="user-info text-truncate ml-xl-50 ml-0">
            <span
              title={row.name}
              className="d-block text-bold-500 text-truncate mb-0"
            >
              {row.name}
            </span>
            <small title={row.email}>{row.email}</small>
          </div>
        </div>
      ),
    },
    {
      name: 'Usuário',
      selector: 'user',
      sortable: true,
      cell: (row) => <p className="text-bold-500 mb-0">{row.user}</p>,
    },
    {
      name: 'Telefone',
      selector: 'phone',
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">{FormataFone(row.phone)}</p>
      ),
    },
    {
      name: 'Status',
      selector: 'active',
      sortable: true,
      cell: (row) => (
        <Badge
          color={row.active === false ? 'light-danger' : 'light-success'}
          pill
        >
          {row.active ? 'Ativo' : 'Inativo'}
        </Badge>
      ),
    },
    {
      name: 'Data de Criação',
      selector: 'created_at',
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 text-truncate mb-0">
          {format(parseISO(row.created_at), "dd 'de' MMMM', às' H:mm'h'", {
            locale: pt,
          })}
        </p>
      ),
    },
    {
      name: 'Ações',
      sortable: true,
      maxWidth: '100px',
      cell: (row) => (
        <ActionsComponent
          row={row}
          currentData={handleCurrentData}
          deleteRow={handleDelete}
        />
      ),
    },
  ]);
  const [alert, setAlert] = useState(false);
  const [selectRegister, setSelectRegister] = useState({});

  useEffect(() => {
    async function getUsuarios() {
      api.defaults.headers.Authorization = `Bearer ${token}`;

      const response = await api.get('/users');

      const { data } = response;

      setUsuarios(data);
      setLoading(false);
    }

    getUsuarios();
  }, [token]);

  function handleDelete(row) {
    setAlert(true);
    setSelectRegister(row);
  }

  function handleCurrentData(row) {
    console.tron.log(row);
    // setCurrentData(obj);
    // handleSidebar(true);
  }

  function onCancelAlert() {
    setAlert(false);
  }

  function onConfirmDelete() {
    setAlert(false);
  }

  function handleFilter(e) {
    const { value } = e.target;
    let filteredDataVar = filteredData;
    setValue(value);

    if (valueState.length) {
      filteredDataVar = usuarios.filter((item) => {
        const startsWithCondition =
          item.name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.email.toLowerCase().startsWith(value.toLowerCase());
        const includesCondition =
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase());

        if (startsWithCondition) {
          return startsWithCondition;
        }
        if (!startsWithCondition && includesCondition) {
          return includesCondition;
        }
        return null;
      });
      setFilteredData(filteredDataVar);
    }
  }

  return (
    <>
      <Breadcrumbs
        breadCrumbTitle="Usuários"
        breadCrumbParent="Usuários"
        breadCrumbActive="Listagem de usuários"
      />
      {loading ? (
        <div className="text-center">
          <Spinner color="primary" />
        </div>
      ) : (
        // <Row>
        //   <Col sm="12">
        //     <ThumbViewConfig data={usuarios} thumbView />
        //   </Col>
        // </Row>
        <>
          <Card>
            <CardBody className="rdt_Wrapper">
              <DataTable
                className="dataTable-custom"
                data={valueState.length ? filteredData : usuarios}
                columns={columns}
                noHeader
                pagination
                subHeader
                subHeaderComponent={
                  <CustomHeader
                    value={valueState}
                    handleFilter={handleFilter}
                  />
                }
              />
            </CardBody>
          </Card>

          <BasicSweetCallback
            title="Atenção"
            description="Deseja realmente excluir o usuário"
            alert={alert}
            onCancel={onCancelAlert}
            onSuccess={onConfirmDelete}
            name={selectRegister.name}
          />
        </>
      )}
    </>
  );
}
