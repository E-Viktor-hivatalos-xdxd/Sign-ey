import { Circle } from "@phosphor-icons/react";
import { UserSquare } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";
import dynamic from "next/dynamic";

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

export default function Statisztika() {
    const [pieState, setPieState] = useState({
        series: [40, 30, 30],
        options: {
            chart: {
                type: "pie",
            },
            labels: ["9A", "10D", "13DC"],
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

    const [barState, setBarState] = useState({
        series: [
            {
                name: "Belépések",
                data: dataBelepes.map((item) => item.value),
            },
            {
                name: "Kilépések",
                data: dataKilepes.map((item) => item.value),
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
                categories: dataBelepes.map((item) => item.name),
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

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navigáció */}
            <nav className="bg-blue-500 m-10 p-5 rounded-4xl flex flex-col md:flex-row gap-y-10 items-center justify-between text-white text-xl font-medium italic">
                <div className="flex items-center">
                    <img src="/logo.png" className="w-16 mr-2.5" alt="Sign-ey logó" />
                    <a href="/" className="text-white">
                        Sign-ey
                    </a>
                </div>

                <a href="/" className="text-white">
                    Kezdőlap
                </a>
                <a href="/naplo" className="hover:text-white/60 transition duration-150">
                    Napló
                </a>
                <a href="/statisztika" className="hover:text-white/60 transition duration-150">
                    Statisztika
                </a>
                <a href="/felhasznalok" className="hover:text-white/60 transition duration-150">
                    Felhasználók
                </a>
                <UserSquare size={60} className="text-white" weight="bold" />
            </nav>

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
