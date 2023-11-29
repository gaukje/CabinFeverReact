import React from 'react';

const OrderHistory = ({ orders }) => {
    const getOrderStatus = (order) => {
        const today = new Date();
        const fromDate = new Date(order.fromDate);
        const toDate = new Date(order.toDate);

        if (today < fromDate) return "Upcoming";
        if (today > toDate) return "Completed";
        return "Ongoing";
    };

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Cabin Name</th>
                        <th>Order Time</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Duration (Days)</th>
                        <th>Price</th>
                        <th>Number of Guests</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => {
                        const localOrderDate = order.orderDate ? new Date(order.orderDate).toLocaleString() : 'N/A';
                        const fromDate = order.fromDate ? new Date(order.fromDate) : null;
                        const toDate = order.toDate ? new Date(order.toDate) : null;
                        const duration = fromDate && toDate ? (toDate - fromDate) / (1000 * 3600 * 24) : 'N/A';

                        return (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{order.itemName || 'N/A'}</td>
                                <td>{localOrderDate}</td>
                                <td>{fromDate ? fromDate.toLocaleDateString() : 'N/A'}</td>
                                <td>{toDate ? toDate.toLocaleDateString() : 'N/A'}</td>
                                <td>{duration}</td>
                                <td>{order.totalPrice || 'N/A'}</td>
                                <td>{order.guests || 'N/A'}</td>
                                <td>{getOrderStatus(order)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;

