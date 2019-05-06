/* eslint-disable no-negated-condition */
import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCheckDouble,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { selectEvent } from '../../store/actions/DashBoardActions';
import './dateComponent.css';
import imgPending from '../../img/pending.svg';
import imgDeny from '../../img/deny.svg';
import imgConfirmed from '../../img/confirmed.svg';


class DateComponent extends Component {
  state = {};

  getEventInfo() {
    const { events, date } = this.props;
    return events.filter(event => {
      const dateMoment = new moment(event.eventDate).date();
      return dateMoment === date;
    });
  }
  eventSelected(id) {
    // console.log(id);
    this.props.selectEvent(id);
  }

  render() {
    const now = moment();
    const { month, year, date, selectedEventId } = this.props;
    const eventInfo = this.getEventInfo()[0];
    console.log(now.month());
    let icon;
    let style = 'default';
    if (eventInfo != undefined) {
      if (eventInfo.eventApprovedStatus === 'PUBLISHED') {
        icon = <FontAwesomeIcon icon={faCheckDouble} className="single_tick" />;
      } else if (eventInfo.eventApprovedStatus === 'confirmed') {
        // icon = <FontAwesomeIcon icon={faCheck} className="single_tick" />;
        icon = <Avatar src={imgConfirmed} size="20" className="single_tick" />
      } else if (eventInfo.eventApprovedStatus === 'pending') {
        icon = (
          // <FontAwesomeIcon icon={faExclamationTriangle} className="warning" />
          <Avatar src={imgPending} size="20" className="warning" />
        );
      } else {
        icon = <p id="dummy_para" />;
      }
    } else {
      icon = <p id="dummy_para" />;
    }

    if (now.year() == year && now.month() == month && now.date() == date) {
      style = 'today';
    }
    if (eventInfo != undefined && selectedEventId === eventInfo.eventId) {
      style = 'selected';
    }
    return (
      <React.Fragment>
        <td
          onClick={() => {
            if (eventInfo != undefined) {
              return this.eventSelected(eventInfo.eventId);
            }
          }}
          className={style}
        >

          <Row>
            {/* <Col className="col-3" /> */}
            <Col className="col-12">
              <p id="date"> {date}</p>
            </Col>
          </Row>
          <Row >
            <Col className="col-6" id="notIcon">

              {icon}
            </Col>
          </Row>

        </td>
      </React.Fragment >
    );
  }
}

const mapStateToProps = state => ({
  events: state.dashboard.events,
  selectedEventId: state.dashboard.selectedEventId
});

export default connect(
  mapStateToProps,
  { selectEvent }
)(DateComponent);
