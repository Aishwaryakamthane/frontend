import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import WidgetCard from "../../components/WidgetCard";
const ChartWidget = React.lazy(() => import("./ChartWidget"));

export default function Dashboard() {
  const role = useSelector((s) => s.auth.user?.role) || "Employee";

  const widgetsByRole = {
    Admin: [
      { id: "a1", type: "chart", title: "Admin Revenue" },
      { id: "a2", type: "card", title: "Active Services", data: "8" },
    ],
    HR: [
      { id: "h1", type: "card", title: "Employees", data: "124" },
      { id: "h2", type: "chart", title: "Attendance" },
    ],
    Finance: [
      { id: "f1", type: "chart", title: "Revenue" },
      { id: "f2", type: "card", title: "Expenses", data: "$24,000" },
    ],
    Sales: [
      { id: "s1", type: "chart", title: "Sales / Week" },
      { id: "s2", type: "card", title: "Deals", data: "47" },
    ],
    Employee: [
      { id: "e1", type: "card", title: "My Tasks", data: "7" },
      { id: "e2", type: "chart", title: "My Performance" },
    ],
  };

  const widgets = widgetsByRole[role] || widgetsByRole.Employee;

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">Dashboard — {role}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.map((w) =>
          w.type === "chart" ? (
            <div key={w.id}>
              <Suspense fallback={<div className="p-4 bg-white rounded shadow">Loading chart...</div>}>
                <ChartWidget title={w.title} />
              </Suspense>
            </div>
          ) : (
            <WidgetCard key={w.id} title={w.title} value={w.data} color="bg-indigo-600" />
          )
        )}
      </div>
    </div>
  );
}
