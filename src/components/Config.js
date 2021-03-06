import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MinutesSeconds from "./MinutesSeconds";
import Button from "./Button";
import Icon from "./Icon";
import VisuallyHidden from "./VisuallyHidden";
import { plus, minus } from "../scripts/icons";
import { enterOrSpacePress } from "../scripts/enterOrSpacePress";
import { getSeconds, getMinutes } from "../scripts/time";

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0 0.25rem;
  justify-items: center;
  align-items: center;
`;

const Title = styled.h2`
  padding: 1.5rem 0 0.25rem 0;
  line-height: 1;
  font-size: 1.25rem;
  font-weight: normal;
  text-align: center;
  grid-column: 1 / -1;
`;

const P = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  & span {
    padding: 0 0.5rem;
  }
  ${({ hide }) => hide && `display: none;`}
`;

const SmallButton = styled(Button)`
  font-size: 1rem;
  grid-column: 1 / -1;
`;

let isMobile = false;
(function(a) {
  if (
    // eslint-disable-next-line
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      a
    ) ||
    // eslint-disable-next-line
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    )
  )
    isMobile = true;
})(navigator.userAgent || navigator.vendor || window.opera);

let timeoutId;
let intervalId;
const clearTimers = () => {
  clearTimeout(timeoutId);
  clearInterval(intervalId);
};
const interval = (fct = () => {}) => {
  fct();
  clearTimers();
  timeoutId = setTimeout(() => (intervalId = setInterval(fct, 100)), 500);
};

export default function Config({
  resetConfig,
  decrementCounter,
  incrementCounter,
  counter,
  incrementWorkInterval,
  decrementWorkInterval,
  workInterval,
  decrementRestInterval,
  incrementRestInterval,
  restInterval
}) {
  const workIntervalMinutes = getMinutes(workInterval).toString();
  const workIntervalSeconds = getSeconds(
    workInterval,
    workIntervalMinutes
  ).toString();

  const restIntervalMinutes = getMinutes(restInterval).toString();
  const restIntervalSeconds = getSeconds(
    restInterval,
    restIntervalMinutes
  ).toString();

  return (
    <Fragment>
      <Row>
        <Title>How many work intervals?</Title>
        <Button
          aria-label="Decrement number of work intervals"
          onKeyDown={event =>
            enterOrSpacePress(event, () => interval(decrementCounter))
          }
          onKeyUp={event => enterOrSpacePress(event, clearTimers)}
          onMouseUp={() => !isMobile && clearTimers()}
          onMouseLeave={() => !isMobile && clearTimers()}
          onMouseDown={() => !isMobile && interval(decrementCounter)}
          onTouchEnd={() => clearTimers()}
          onTouchCancel={() => clearTimers()}
          onTouchStart={() => interval(decrementCounter)}
        >
          <Icon icon={minus} />
        </Button>

        <P aria-hidden="true">{counter}</P>
        <VisuallyHidden>{`${counter} work intervals`}</VisuallyHidden>

        <Button
          aria-label="Increment number of work intervals"
          onKeyDown={event =>
            enterOrSpacePress(event, () => interval(incrementCounter))
          }
          onKeyUp={event => enterOrSpacePress(event, clearTimers)}
          onMouseUp={() => !isMobile && clearTimers()}
          onMouseLeave={() => !isMobile && clearTimers()}
          onMouseDown={() => !isMobile && interval(incrementCounter)}
          onTouchEnd={() => clearTimers()}
          onTouchCancel={() => clearTimers()}
          onTouchStart={() => interval(incrementCounter)}
        >
          <Icon icon={plus} />
        </Button>
      </Row>
      <Row>
        <Title>Work interval</Title>
        <Button
          aria-label="Decrement work interval duration"
          onKeyDown={event =>
            enterOrSpacePress(event, () => interval(decrementWorkInterval))
          }
          onKeyUp={event => enterOrSpacePress(event, clearTimers)}
          onMouseUp={() => !isMobile && clearTimers()}
          onMouseLeave={() => !isMobile && clearTimers()}
          onMouseDown={() => !isMobile && interval(decrementWorkInterval)}
          onTouchEnd={() => clearTimers()}
          onTouchCancel={() => clearTimers()}
          onTouchStart={() => interval(decrementWorkInterval)}
        >
          <Icon icon={minus} />
        </Button>

        <P aria-hidden="true">
          <MinutesSeconds
            minutes={workIntervalMinutes}
            seconds={workIntervalSeconds}
          />
        </P>
        <VisuallyHidden>{`Work interval of ${workIntervalMinutes} minutes and ${workIntervalSeconds} seconds`}</VisuallyHidden>

        <Button
          aria-label="Increment work interval duration"
          onKeyDown={event =>
            enterOrSpacePress(event, () => interval(incrementWorkInterval))
          }
          onKeyUp={event => enterOrSpacePress(event, clearTimers)}
          onMouseUp={() => !isMobile && clearTimers()}
          onMouseLeave={() => !isMobile && clearTimers()}
          onMouseDown={() => !isMobile && interval(incrementWorkInterval)}
          onTouchEnd={() => clearTimers()}
          onTouchCancel={() => clearTimers()}
          onTouchStart={() => interval(incrementWorkInterval)}
        >
          <Icon icon={plus} />
        </Button>
      </Row>
      <Row>
        <Title>Rest interval</Title>
        <Button
          aria-label="Decrement rest interval duration"
          onKeyDown={event =>
            enterOrSpacePress(event, () => interval(decrementRestInterval))
          }
          onKeyUp={event => enterOrSpacePress(event, clearTimers)}
          onMouseUp={() => !isMobile && clearTimers()}
          onMouseLeave={() => !isMobile && clearTimers()}
          onMouseDown={() => !isMobile && interval(decrementRestInterval)}
          onTouchEnd={() => clearTimers()}
          onTouchCancel={() => clearTimers()}
          onTouchStart={() => interval(decrementRestInterval)}
        >
          <Icon icon={minus} />
        </Button>

        <P aria-hidden="true">
          <MinutesSeconds
            minutes={restIntervalMinutes}
            seconds={restIntervalSeconds}
          />
        </P>
        <VisuallyHidden>{`Rest interval of ${restIntervalMinutes} minutes and ${restIntervalSeconds} seconds`}</VisuallyHidden>

        <Button
          aria-label="Increment rest interval duration"
          onKeyDown={event =>
            enterOrSpacePress(event, () => interval(incrementRestInterval))
          }
          onKeyUp={event => enterOrSpacePress(event, clearTimers)}
          onMouseUp={() => !isMobile && clearTimers()}
          onMouseLeave={() => !isMobile && clearTimers()}
          onMouseDown={() => !isMobile && interval(incrementRestInterval)}
          onTouchEnd={() => clearTimers()}
          onTouchCancel={() => clearTimers()}
          onTouchStart={() => interval(incrementRestInterval)}
        >
          <Icon icon={plus} />
        </Button>
      </Row>
      <Row>
        <SmallButton
          onKeyPress={event => enterOrSpacePress(event, resetConfig)}
          onClick={resetConfig}
        >
          Reset
        </SmallButton>
      </Row>
    </Fragment>
  );
}

Config.propTypes = {
  resetConfig: PropTypes.func.isRequired,
  decrementCounter: PropTypes.func.isRequired,
  incrementCounter: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
  incrementWorkInterval: PropTypes.func.isRequired,
  decrementWorkInterval: PropTypes.func.isRequired,
  workInterval: PropTypes.number.isRequired,
  decrementRestInterval: PropTypes.func.isRequired,
  incrementRestInterval: PropTypes.func.isRequired,
  restInterval: PropTypes.number.isRequired
};
