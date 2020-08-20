import React from 'react';
import { Row, Col } from 'reactstrap';
import queryString from 'query-string';
import Breadcrumbs from '~/components/@vuexy/breadCrumbs/BreadCrumb';
import ListViewConfig from './DataListConfig';

class ListView extends React.Component {
  render() {
    return (
      <>
        <Breadcrumbs
          breadCrumbTitle="List View"
          breadCrumbParent="Data List"
          breadCrumbActive="List View"
        />
        <Row>
          <Col sm="12">
            <ListViewConfig
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default ListView;
