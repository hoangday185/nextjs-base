"use client";
import React from "react";
import "./cart.css";
import custom from "./custom.module.scss";
import clsx from "clsx";
const Cart = () => {
	const [expending] = React.useState(false);
	return (
		<div
			className={clsx("card", {
				[custom.cart]: expending,
			})}
		>
			Cart
		</div>
	);
};

export default Cart;
