import { useState, useEffect } from 'react'
import Charts from 'react-apexcharts'
import { useGetUsersQuery } from '../../redux/api/userApiSlice'
import { useGetTotalOrdersQuery, useGetTotalSalesByDateQuery, useGetTotalSalesQuery } from '../../redux/api/orderApiSlice'
import AdminMenu from './AdminMenu'
import OrdersList from './OrdersList'
import Loader from '../../components/Loader'


const AdminDashboard = () => {
    const { data: sales, isLoading } = useGetTotalSalesQuery();
    const { data: customers, isLoading: loading } = useGetUsersQuery();
    const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery()
    const { data: salesDetails } = useGetTotalSalesByDateQuery();


    const [state, setState] = useState({
        options: {
            chart: {
                type: "line"
            },
            tooltip: {
                theme: 'dark'
            },
            colors: ["#00E396"],
            dataLabels: {
                enable: true,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Sales Trend',
                align: 'left'
            },
            grid: {
                borderColor: "#1d4ed8"
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: [],
                title: {
                    text: "Date"
                },
            },
            yaxis: {
                title: {
                    text: "Sales"
                },
                min: 0,
            },
            legend: {
                position: 'top',
                horizontalAlign: "right",
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
        },
        series: [
            { name: "Sales", data: [] }
        ],
    })


    useEffect(() => {
        if (salesDetails) {
            const formattedSalesDate = salesDetails.map((item) => ({
                x: item._id,
                y: item.totalSales,
            }));

            setState((prevState) => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: formattedSalesDate.map((item) => item.x),
                    },
                },

                series: [
                    { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
                ],
            }));
        }
    }, [salesDetails]);


    return (
        <>
            <AdminMenu />
            <section className="xl:ml-[4rem] md:ml-[0rem]">
                <div className="w-[80%] flex justify-around flex-wrap">
                    <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
                            ₹
                        </div>
                        <p className="mt-5">Sales</p>
                        <h1 className="text-xl font-bold text-white">
                            ₹{loading ? <Loader /> : sales?.totalSales || '0000,00'}
                        </h1>
                    </div>
                    <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
                            👤
                        </div>
                        <p className="mt-5">Customers</p>
                        <h1 className="text-xl font-bold text-white">
                            {loadingTwo ? <Loader /> : customers?.length}
                        </h1>
                    </div>
                    <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
                            🎁
                        </div>
                        <p className="mt-5">All Orders</p>
                        <h1 className="text-xl font-bold text-white">
                            {isLoading ? <Loader /> : orders?.totalOrders}
                        </h1>
                    </div>
                </div>
                <div className="ml-[5rem] mt-[2rem] mr-[5rem]">
                    <Charts options={state.options}
                        series={state.series}
                        type="line"
                        width="705"
                         />
                </div>
                <div className="mt-[4rem]">
                 <h1 className="items-center text-center font-semibold bg-pink-500">Orders</h1>
                    <OrdersList />
                </div>
            </section>
        </>
    )
}

export default AdminDashboard