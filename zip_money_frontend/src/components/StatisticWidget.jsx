import React from 'react'
import { Card } from 'antd';
import PropTypes from "prop-types";

const StatisticWidget = ({ title, value }) => {
	return (
		<Card className="card-box mb-4">
			{title && <h4 className="mb-2">{title}</h4>}
				<div>
					<div className="d-flex align-items-center">
						<h1 className="mb-0 font-weight-bold">{value}</h1>
						{
							status ? 
							<span className={`font-size-md font-weight-bold ml-3 ${status !== 0 && status > 0 ? 'text-success' : 'text-danger'}`} >
								{status}
								{status !== 0 && status > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
							</span> 
							: 
							null
						}
					</div>
				</div>
		</Card>
	)
}

StatisticWidget.propTypes = {
	title: PropTypes.string,
	value: PropTypes.string,
};

export default StatisticWidget