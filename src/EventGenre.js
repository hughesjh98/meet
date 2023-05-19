import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    const colors = ["#524C9A", "#C9B7AD", "#CED3DC", "#ABA9C3", "#635C51"];


    useEffect(() => {
        setData(() => {

            const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
            const data = genres.map((genre) => {
                const value = events.filter(({ summary }) => summary.split(" ").includes(genre)).length;

                return { name: genre, value, }
            })
            return data.filter((entry) => entry.value > 0);
        })
    }, [events]);

    return (
        <ResponsiveContainer height={400}>
            <PieChart >
                <Pie
                    data={data}
                    labelLine={false}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {
                        data.map((_entry, index) => (
                            <Cell key={`cell-S{index}`} fill={colors[index]} />
                        ))
                    }
                </Pie>
            </PieChart>
        </ResponsiveContainer >
    )
}

export default EventGenre