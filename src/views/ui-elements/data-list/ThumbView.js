import React from 'react';
import { Row, Col } from 'reactstrap';
import queryString from 'query-string';
import Breadcrumbs from '~/components/@vuexy/breadCrumbs/BreadCrumb';
import ThumbViewConfig from './DataListConfig';

class ThumbView extends React.Component {
  render() {
    return (
      <>
        <Breadcrumbs
          breadCrumbTitle="Thumb View"
          breadCrumbParent="Data List"
          breadCrumbActive="Thumb View"
        />
        <Row>
          <Col sm="12">
            <ThumbViewConfig
              thumbView
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default ThumbView;
