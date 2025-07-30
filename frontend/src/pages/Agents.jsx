import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/Axios';
import { FaPlus, FaEye } from 'react-icons/fa';

export default function Agents() {
    const { token } = useAuth();

    const [agents, setAgents] = useState([]);
    const [filteredAgents, setFilteredAgents] = useState([]);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    });
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchAgents = async () => {
        try {
            const res = await API.get('/agents/get-agents', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAgents(res.data);
            setFilteredAgents(res.data);
        } catch (err) {
            console.error('Error fetching agents:', err);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, []);

    useEffect(() => {
        const filtered = agents.filter((agent) =>
            agent.name.toLowerCase().includes(search.toLowerCase()) ||
            agent.email.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredAgents(filtered);
    }, [search, agents]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await API.post('/agents/create-agent', form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setForm({ name: '', email: '', mobile: '', password: '' });
            setShowModal(false);
            fetchAgents();
        } catch (err) {
            const msg =
                err?.response?.data?.message || 'Failed to add agent. Try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="px-4 pt-6">
            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-6xl mx-auto">
                {/* Combined Header */}
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                    <h2 className="text-2xl font-bold">Agents</h2>
                    <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="border border-gray-500 rounded-md px-4 py-2 text-sm outline-none w-full sm:w-64"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                            title="Add Agent"
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>

                {/* Agent Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-left border-b">
                            <tr className="text-gray-600">
                                <th className="py-2">Name</th>
                                <th className="py-2">Email</th>
                                <th className="py-2">Mobile</th>
                                <th className="py-2">Tasks</th>
                                <th className="py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAgents.map((agent) => (
                                <tr key={agent._id} className="border-b">
                                    <td className="py-2 font-medium">{agent.name}</td>
                                    <td className="py-2">{agent.email}</td>
                                    <td className="py-2">{agent.mobile}</td>
                                    <td className="py-2">{agent.tasks?.length || 0}</td>
                                    <td className="py-2">
                                        <button
                                            onClick={() => setSelectedAgent(agent)}
                                            className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                                        >
                                            <FaEye /> View Tasks
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredAgents.length === 0 && (
                        <p className="text-sm text-gray-500 mt-4">No agents found.</p>
                    )}
                </div>
            </div>

            {/* Modal for Add Agent */}
            {showModal && (
                <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/30">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-3 text-gray-500 text-xl font-bold hover:text-black"
                        >
                            ×
                        </button>
                        <h3 className="text-lg font-semibold mb-4">Add New Agent</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm outline-none"
                                required
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm outline-none"
                                required
                            />
                            <input
                                name="mobile"
                                placeholder="Mobile (+91XXXXXXXXXX)"
                                value={form.mobile}
                                onChange={handleChange}
                                className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm outline-none"
                                required
                            />
                            <input
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border border-gray-500 rounded-md px-3 py-2 text-sm outline-none"
                                required
                            />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
                                disabled={loading}
                            >
                                {loading ? 'Adding...' : 'Add Agent'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Viewing Tasks */}
            {selectedAgent && (
                <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm bg-black/30">
                    <div className="bg-white p-6 rounded-xl w-full max-w-4xl shadow-lg relative max-h-[80vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedAgent(null)}
                            className="absolute top-2 right-3 text-gray-500 text-xl font-bold hover:text-black"
                        >
                            ×
                        </button>
                        <h3 className="text-lg font-semibold mb-4">
                            Tasks for {selectedAgent.name}
                        </h3>

                        {(selectedAgent.tasks || []).length === 0 ? (
                            <p className="text-sm text-gray-600">No tasks assigned yet.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full border text-sm">
                                    <thead className="bg-gray-100 text-gray-700">
                                        <tr>
                                            <th className="border px-4 py-2">#</th>
                                            <th className="border px-4 py-2">First Name</th>
                                            <th className="border px-4 py-2">Phone</th>
                                            <th className="border px-4 py-2">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedAgent.tasks.map((task, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50">
                                                <td className="border px-4 py-2 text-center">{idx + 1}</td>
                                                <td className="border px-4 py-2">{task.firstName}</td>
                                                <td className="border px-4 py-2">{task.phone}</td>
                                                <td className="border px-4 py-2">{task.notes || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
