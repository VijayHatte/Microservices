import React, { useEffect, useState } from 'react'
import { fetchNotifications } from '../api/notificationApi'

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNotifications = async () => {
            try {
                const data = await fetchNotifications();
                // console.log('Fetched notifications:', data);
                setNotifications(Array.isArray(data) ? data : data.notifications || []);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            } finally {
                setLoading(false);
            }
        };
        getNotifications();
    }, []);

    return (
        <div className='p-4 rounded-lg shadow-md bg white'>
            <h2 className='text-xl font-semibold mb-4'>Notifications</h2>
            {loading ? (
                <p>Loading...</p>
            ) : notifications.length > 0 ? (
                <ul className='space -y-2'>
                    {notifications.map((note) => (
                        <li key={note.id} className='p-2 border rounded text-sm text-gray-700'>
                            {note.message}<br />
                            <span className='text-xs text-gray-500'>{new Date(note.timestamp).toLocaleString()} </span>
                        </li>
                    ))}
                </ul>
            ) :(
                <p className='text-gray-500'>No notifications found.</p>
            )}
    </div>
    );
};

export default Notifications