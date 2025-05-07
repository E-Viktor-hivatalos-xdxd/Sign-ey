import { Circle } from "@phosphor-icons/react";
import { UserSquare } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const dataBelepes = [
    { name: "Jan", value: 303 },
    { name: "Már", value: 50 },
];

const dataKilepes = [
    { name: "Jan", value: 200 },
    { name: "Már", value: 35 },
];
export default function Statisztika() {
    const [state, setState] = useState({

        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },


    });
    return (
        <div className="min-h-screen bg-white">
            <nav className="bg-blue-500 m-10 p-5 rounded-4xl flex flex-col md:flex-row gap-y-10 items-center justify-between text-white  text-xl font-medium italic">
                <div className="flex items-center">
                    <img src="/logo.png" className="w-16 mr-2.5" />
                    <a href="/" className="text-white"> Sign-ey</a>
                </div>

                <a href="/" className="text-white">Kezdőlap</a>
                <a href="/naplo" className="hover:text-white/60 transition duration-150">Napló</a>
                <a href="/statisztika" className="hover:text-white/60 transition duration-150">Statisztika</a>
                <a href="/felhasznalok " className="hover:text-white/60 transition duration-150">Felhasználók</a>
                <UserSquare size={60} className="text-white" weight="bold" />
            </nav>

            <div>
                <div id="chart">
                    <Chart options={state.options} series={state.series} type="pie" width={380} />
                </div>
            </div>
        </div>
    );
}