import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { FaUserFriends, FaQuestionCircle, FaClipboardList, FaCheckSquare } from "react-icons/fa";
import "./Dashboard.scss";
import { useState, useEffect, useCallback } from "react";
import { getDataOverview } from "../../../services/apiService";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DATA_OVERVIEW = {
    total_users: 0,
    total_quizzes: 0,
    total_questions: 0,
    total_answers: 0,
};

const DashBoard = (props) => {
    const [selectedChart, setSelectedChart] = useState("bar");
    const [isLoading, setIsLoading] = useState(true);

    const [dataOverview, setDataOverview] = useState({ ...DATA_OVERVIEW });
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);

    const fetchDataOverview = async () => {
        try {
            const res = await getDataOverview();

            console.log("🚀 ~ Dashboard.js:66 ~ fetchDataOverview ~ res:", res);

            if (res && res.EC === 0) {
                setDataOverview({
                    ...dataOverview,
                    total_answers: res.DT.others.countAnswers,
                    total_questions: res.DT.others.countQuestions,
                    total_quizzes: res.DT.others.countQuiz,
                    total_users: res.DT.users.total,
                });

                const BAR_DATA = [
                    { name: "Quizzes", value: res.DT.others.countQuiz },
                    { name: "Questions", value: res.DT.others.countQuestions },
                    { name: "Answers", value: res.DT.others.countAnswers },
                ];

                setBarData(BAR_DATA);

                const PIE_DATA = [
                    { name: "Users", value: res.DT.users.countUsers },
                    { name: "Admins", value: res.DT.users.countAdmin },
                ];

                setPieData(PIE_DATA);
            } else {
                console.log("Error fetching data overview:", res.EM);
            }
        } catch (error) {
            console.error("Error fetching data overview:", error);
        }
    };

    // Simulate data loading
    useEffect(() => {
        fetchDataOverview();
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="dashboard-container">
            <div className="title">Analytics Dashboard</div>

            {isLoading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading dashboard data...</p>
                </div>
            ) : (
                <div className="content">
                    <div className="c-left">
                        <div className="card">
                            <div className="card-icon">
                                <FaUserFriends />
                            </div>
                            <div className="card-info">
                                <div className="card-title">Total Users</div>
                                <div className="card-value">{dataOverview?.total_users}</div>
                                <div className="card-trend positive">+12% this month</div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-icon">
                                <FaClipboardList />
                            </div>
                            <div className="card-info">
                                <div className="card-title">Active Quizzes</div>
                                <div className="card-value">{dataOverview?.total_quizzes}</div>
                                <div className="card-trend positive">+5% this month</div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-icon">
                                <FaQuestionCircle />
                            </div>
                            <div className="card-info">
                                <div className="card-title">Total Questions</div>
                                <div className="card-value">{dataOverview?.total_questions}</div>
                                <div className="card-trend positive">+8% this month</div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-icon">
                                <FaCheckSquare />
                            </div>
                            <div className="card-info">
                                <div className="card-title">Total Answers</div>
                                <div className="card-value">{dataOverview?.total_answers}</div>
                                <div className="card-trend negative">-3% this month</div>
                            </div>
                        </div>
                    </div>
                    <div className="c-right">
                        <div className="chart-controls">
                            <button
                                className={selectedChart === "bar" ? "active" : ""}
                                onClick={() => setSelectedChart("bar")}
                            >
                                Analytics Quiz
                            </button>
                            <button
                                className={selectedChart === "pie" ? "active" : ""}
                                onClick={() => setSelectedChart("pie")}
                            >
                                Analytics User
                            </button>
                        </div>

                        <div className="chart-container">
                            {selectedChart === "bar" ? (
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={barData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="name" tick={{ fill: "#666" }} />
                                        <YAxis tick={{ fill: "#666" }} />
                                        <RechartsTooltip
                                            contentStyle={{
                                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                                borderRadius: "4px",
                                            }}
                                        />
                                        <Bar
                                            dataKey="value"
                                            name="Analytics Quiz"
                                            radius={[4, 4, 0, 0]}
                                        >
                                            {barData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Bar>
                                        {/* <Legend /> */}
                                    </BarChart>
                                </ResponsiveContainer>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, percent }) =>
                                                `${name}: ${(percent * 100).toFixed(0)}%`
                                            }
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip
                                            contentStyle={{
                                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                                                borderRadius: "4px",
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashBoard;
