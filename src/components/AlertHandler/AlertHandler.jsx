import {CSSTransition} from "react-transition-group";
import * as PropTypes from "prop-types";
import React from "react";
import {TiTimes} from "react-icons/all";

function AlertHandler({message, isShown, onClick, status}) {
	return <CSSTransition unmountOnExit={true} in={isShown} timeout={450} classNames="my-node">
		<div
			className={["fixed alert alert-fixed", status && status === 400 ? "error-alert" : "success-alert"].join(" ")}>
			<div className="flex justify-between items-center">
				<h4>{message && message}</h4>
				<TiTimes
					onClick={onClick && onClick}
					className="ml-3 text-gray-600 cursor-pointer hover:text-red-500"
				/>
			</div>
		</div>
	
	</CSSTransition>;
}

AlertHandler.propTypes = {
	isShown: PropTypes.bool,
	id: PropTypes.string,
	message: PropTypes.string,
	status: PropTypes.string,
	onClick: PropTypes.func
};

export default AlertHandler