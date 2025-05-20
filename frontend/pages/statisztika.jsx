import React, { useState } from "react";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Login from "@/components/Login";
import moment from "moment";
import "moment/locale/hu";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const dataBelepes = [
    { name: "Jan", value: 2 },
    { name: "Feb", value: 2 },
    { name: "Már", value: 2 },
    { name: "Ápr", value: 2 },
    { name: "Máj", value: 3 },
];

const dataKilepes = [
    { name: "Jan", value: 2 },
    { name: "Feb", value: 2 },
    { name: "Már", value: 2 },
    { name: "Ápr", value: 2 },
    { name: "Máj", value: 3 },
];

export default function Statisztika({ user, logs }) {

    moment.locale("hu");

    const groups = Object.groupBy(logs, (log) => log?.User?.Group?.name
    );
    var groupNames = Object.keys(groups)

    const [pieState, setPieState] = useState({
        series: groupNames.map(name => {
            return groups[name]?.length
        }),
        options: {
            chart: {
                type: "pie",
            },
            labels: groupNames.map(name => {
                if (name == "undefined") {
                    return "Manuális"
                } else return name
            }),
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: "bottom",
                        },
                    },
                },
            ],
        },
    });

    const entry = Object.groupBy(logs?.filter(l => l?.entryTime != null), (log) => new Date(log?.entryTime).getMonth());
    const exit = Object.groupBy(logs?.filter(l => l?.exitTime != null), (log) => new Date(log?.exitTime).getMonth());

    const [barState, setBarState] = useState({
        series: [

            {
                name: "Belépések",
                data: Object.keys(entry)?.map(e => {
                    return entry[e]?.length
                })
            },
            {
                name: "Kilépések",
                data: Object.keys(exit)?.map(e => {
                    return exit[e]?.length
                })
            },
        ],
        options: {
            chart: {
                type: "bar",
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    endingShape: "rounded",
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"],
            },
            xaxis: {
                categories: Object.keys(exit)?.map(e => {
                    return moment().month(e).startOf("month").format('MMMM')
                }),
            },
            yaxis: {
                title: {
                    text: "Események száma",
                },
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: (val) => `${val} esemény`,
                },
            },
        },
    });

    if (user == null) return <Login />;
    return (
        <div className="bg-gray-100">
            <Nav user={user} />

                {/* Tartalom */}
                <div className="m-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Kördiagram */}
                    <div className="bg-white p-6 rounded-4xl shadow-lg">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">Osztályok aránya</h2>
                        <Chart options={pieState.options} series={pieState.series} type="pie" width="100%" />
                    </div>

                    {/* Oszlopdiagram */}
                    <div className="bg-white p-6 rounded-4xl shadow-lg">
                        <h2 className="text-xl font-bold text-gray-700 mb-4">Belépések és Kilépések</h2>
                        <Chart options={barState.options} series={barState.series} type="bar" height={350} />
                    </div>
                </div>

        </div>
    );
}




export async function getServerSideProps(ctx) {
    const cookie = ctx.req.headers?.cookie;

    const res = await fetch(`http://127.0.0.1:8080/api/user`, {
        headers: { cookie },
    });
    const user = res.ok ? await res.json() : null;


    const res2 = await fetch(`http://127.0.0.1:8080/api/logs?limit=200`, {
        headers: { cookie },
    });
    const logs = res2.ok ? await res2.json() : null;

    return {
        props: {
            logs: logs,
            user: user
        },

    };
}