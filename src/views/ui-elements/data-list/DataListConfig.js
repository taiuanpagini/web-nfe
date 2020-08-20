/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import {
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
} from 'reactstrap';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';
import {
  Edit,
  Trash,
  ChevronDown,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'react-feather';
import history from '~/history';
import Checkbox from '~/components/@vuexy/checkbox/CheckboxesVuexy';

import '~/assets/scss/plugins/extensions/react-paginate.scss';
import '~/assets/scss/pages/data-list.scss';
import Avatar from '~/components/@vuexy/avatar/AvatarComponent';
import Chip from '~/components/@vuexy/chips/ChipComponent';
import BasicSweetCallback from '~/components/sweet-alert';

const chipColors = {
  false: 'warning',
  true: 'success',
};

const selectedStyle = {
  rows: {
    selectedHighlighStyle: {
      backgroundColor: 'rgba(115,103,240,.05)',
      color: '#7367F0 !important',
      boxShadow: '0 0 1px 0 #7367F0 !important',
      '&:hover': {
        transform: 'translateY(0px) !important',
      },
    },
  },
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

const CustomHeader = (props) => {
  return (
    <div className="data-list-header d-flex justify-content-between flex-wrap">
      <div className="actions-left d-flex flex-wrap">
        <UncontrolledDropdown className="data-list-dropdown mr-1">
          <DropdownToggle className="p-1" color="primary">
            <span className="align-middle mr-1">Ações</span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu tag="div" right>
            <DropdownItem tag="a">Excluir</DropdownItem>
            <DropdownItem tag="a">Exportar</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <Button
          className="add-new-btn"
          color="primary"
          onClick={() => history.push('/usuario')}
          outline
        >
          <Plus size={15} />
          <span className="align-middle">Novo Usuário</span>
        </Button>
      </div>
      <div className="actions-right d-flex flex-wrap mt-sm-0 mt-2">
        <UncontrolledDropdown className="data-list-rows-dropdown mr-1 d-md-block d-none">
          <DropdownToggle color="" className="sort-dropdown">
            <span className="align-middle mx-50">{`${0} - ${0} de ${0}`}</span>
            <ChevronDown size={15} />
          </DropdownToggle>
          <DropdownMenu tag="div" right>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(4)}>
              4
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(10)}>
              10
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(15)}>
              15
            </DropdownItem>
            <DropdownItem tag="a" onClick={() => props.handleRowsPerPage(20)}>
              20
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className="filter-section">
          <Input type="text" onChange={(e) => props.handleFilter(e)} />
        </div>
      </div>
    </div>
  );
};

function DataListConfig({ data }) {
  const [dados, setData] = useState(data);
  const [totalPages] = useState(0);
  const [columns] = useState([
    {
      name: 'Avatar',
      selector: 'avatar',
      sortable: true,
      maxWidth: '100px',
      cell: (row) => (
        <Avatar
          img={
            row.avatar
              ? row.avatar
              : `https://api.adorable.io/avatars/285/${row.name}.png`
          }
          size="md"
        />
      ),
    },
    {
      name: 'Nome',
      selector: 'name',
      sortable: true,
      minWidth: '200px',
      cell: (row) => (
        <p title={row.name} className="text-truncate text-bold-500 mb-0">
          {row.name}
        </p>
      ),
    },
    {
      name: 'E-mail',
      selector: 'email',
      sortable: true,
    },
    {
      name: 'Usuário',
      selector: 'user',
      sortable: true,
    },
    {
      name: 'Permissão',
      selector: 'provider',
      sortable: true,
      cell: (row) => (row.provider ? 'Admin' : 'Usuário'),
    },
    {
      name: 'Status',
      selector: 'active',
      sortable: true,
      cell: (row) => (
        <Chip
          className="m-0"
          color={chipColors[row.active]}
          text={row.active ? 'Ativo' : 'Inativo'}
        />
      ),
    },
    {
      name: 'Ações',
      sortable: true,
      cell: (row) => (
        <ActionsComponent
          row={row}
          currentData={handleCurrentData}
          deleteRow={handleDelete}
        />
      ),
    },
  ]);
  const [setValue] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [setSidebar] = useState(false);
  const [setCurrentData] = useState(null);
  const [setSelected] = useState([]);
  const [totalRecords] = useState(0);
  const [sortIndex] = useState([]);
  const [alert, setAlert] = useState(false);
  const [selectRegister, setSelectRegister] = useState({});

  function handleFilter(e) {
    setValue(e.target.value);
  }

  function handleRowsPerPage(value) {}

  function handleSidebar(boolean, addNew = false) {
    setSidebar(boolean);
    if (addNew === true) {
      setCurrentData(null);
    }
  }

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

  function handlePagination(page) {
    // let { parsedFilter, getData } = this.props
    // let perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : 4
    // let urlPrefix = this.props.thumbView
    //   ? "/data-list/thumb-view/"
    //   : "/data-list/list-view/"
    // history.push(
    //   `${urlPrefix}list-view?page=${page.selected + 1}&perPage=${perPage}`
    // )
    // getData({ page: page.selected + 1, perPage: perPage })
    // this.setState({ currentPage: page.selected })
  }

  return (
    <div className="data-list thumb-view">
      <DataTable
        columns={columns}
        data={dados}
        pagination
        paginationServer
        paginationComponent={() => (
          <ReactPaginate
            previousLabel={<ChevronLeft size={15} />}
            nextLabel={<ChevronRight size={15} />}
            breakLabel="..."
            breakClassName="break-me"
            pageCount={totalPages}
            containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
            activeClassName="active"
            // forcePage={
            //   this.props.parsedFilter.page
            //     ? parseInt(this.props.parsedFilter.page - 1)
            //     : 0
            // }
            onPageChange={(page) => handlePagination(page)}
          />
        )}
        noHeader
        subHeader
        selectableRows
        responsive
        pointerOnHover
        selectableRowsHighlight
        onSelectedRowsChange={(data) => setSelected(data.selectedRows)}
        customStyles={selectedStyle}
        subHeaderComponent={
          <CustomHeader
            handleSidebar={handleSidebar}
            handleFilter={handleFilter}
            handleRowsPerPage={handleRowsPerPage}
            rowsPerPage={rowsPerPage}
            total={totalRecords}
            index={sortIndex}
          />
        }
        sortIcon={<ChevronDown />}
        selectableRowsComponent={Checkbox}
        selectableRowsComponentProps={{
          color: 'primary',
          icon: <Check className="vx-icon" size={12} />,
          label: '',
          size: 'sm',
        }}
      />
      {/* <Sidebar
        show={sidebar}
        data={currentData}
        updateData={this.props.updateData}
        addData={this.props.addData}
        handleSidebar={this.handleSidebar}
        thumbView={this.props.thumbView}
        getData={this.props.getData}
        dataParams={this.props.parsedFilter}
        addNew={this.state.addNew}
      /> */}
      <BasicSweetCallback
        title="Atenção"
        description="Deseja realmente excluir o usuário"
        alert={alert}
        onCancel={onCancelAlert}
        onSuccess={onConfirmDelete}
        name={selectRegister.name}
      />
    </div>
  );
}

export default DataListConfig;
