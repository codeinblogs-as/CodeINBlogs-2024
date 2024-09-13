export function Sidebar() {
    return (
        <nav className="w-64 bg-gray-800 text-white">
            <ul>
                <li><a href="/admindashboard" className="block p-4">Dashboard</a></li>
                <li><a href="/admindashboard/users" className="block p-4">Users</a></li>
                <li><a href="/admindashboard/settings" className="block p-4">Settings</a></li>
                {/* Add more links as needed */}
            </ul>
        </nav>
    );
}
