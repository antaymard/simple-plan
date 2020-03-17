import React from 'react';
let moment = require('moment');

const WeekNumbers = (props) => {

    const renderWeekNumbers = () => {
        let nowWeek = moment().format('W');
        if (props.weeknb) {
            return props.weeknb.map((item, i) => {
                return (
                    <div className={"weekNumbers " + (Number(item) === Number(nowWeek) ? "weekNumbers-now" : (Number(item) < Number(nowWeek) ? "weekNumbers-past" : "weekNumbers-future"))} key={i}>
                        {item}
                    </div>
                )
            })
        }
        else return null;
    }

    return (
        <div className="d-flex flex-row">
            {renderWeekNumbers()}
        </div>
    )

}

export default WeekNumbers;