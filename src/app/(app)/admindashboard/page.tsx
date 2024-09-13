import { Sidebar } from "@/components/Sidebar"; // Import your Sidebar component
import { Header } from "@/components/Header"; // Import your Header component

export default function AdminDashboard() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Header />
                <main className="p-4">
                    {/* Main content goes here */}
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    {/* Add your dashboard components here */}
                </main>
            </div>
        </div>
    );
}
