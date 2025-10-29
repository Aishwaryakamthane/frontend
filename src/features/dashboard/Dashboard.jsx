import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import WidgetCard from "../../components/WidgetCard";
import DocumentUpload from "../../components/DocumentUpload";

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
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100">
            Dashboard — <span className="text-indigo-600">{role}</span>
          </h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgets.map((w) =>
            w.type === "chart" ? (
              <div key={w.id} className="min-h-[220px]">
                <Suspense fallback={<div className="glass-card">Loading chart...</div>}>
                  <ChartWidget title={w.title} />
                </Suspense>
              </div>
            ) : (
              <WidgetCard key={w.id} title={w.title} value={w.data} color="bg-indigo-600" />
            )
          )}
        </section>

        <section className="mt-8">
          <DocumentUpload />
        </section>
      </div>
    </div>
  );
}
