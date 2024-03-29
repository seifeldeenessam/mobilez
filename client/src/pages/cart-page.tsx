import { useEffect, useMemo, useState } from "react";
import OrderCard from "../components/cards/order";
import Loading from "../components/loading";
import Message from "../components/message";
import Section from "../components/section";
import Checkout from "../components/tables/checkout";
import useAuthToken from "../hooks/auth-token";
import useWindowSize from "../hooks/window-size";
import getOrders from "../services/get-orders";
import OrderType from "../types/order";

declare type CheckoutValues = {
	price: number;
	quantity: number;
};

function CartPage() {
	const [loading, setLoading] = useState<boolean>(true);
	const [items, setItems] = useState<OrderType["items"]>([]);
	const authToken = useAuthToken();
	const windowSize = useWindowSize();

	useEffect(() => {
		const controller: AbortController = new AbortController();
		if (authToken) getOrders({ id: authToken.id, setter: setItems, loading: setLoading });
		return () => controller.abort();
	}, [authToken]);

	function checkoutValues(): CheckoutValues {
		let price: number = 0;
		let quantity: number = 0;
		items.map((item) => price += item.price);
		items.map((item) => quantity += item.quantity);
		return { price, quantity };
	}

	const getCheckoutValues = useMemo(() => checkoutValues, [items]);

	if (loading) {
		return <Loading message="Loading..." />;
	} else {
		if (items.length === 0) {
			return (
				<Section alignment="main" centerContent>
					<Message message="Empty Cart" decription="Your cart is empty. add any device to be shown here" redirect="/" />
				</Section>
			);
		} else {
			return (
				<Section alignment={windowSize.width! < 767 ? "column" : "row"} addSpacing>
					<Section alignment="column" addSpacing>
						{items.map((order) => <OrderCard id={order.device} quntity={order.quantity} price={order.price} key={order._id} />)}
					</Section>
					<Checkout count={items.length} totalCount={getCheckoutValues().quantity} price={getCheckoutValues().price} />
				</Section>
			);
		}
	}
}

export default CartPage;