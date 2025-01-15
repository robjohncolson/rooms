import { useUser } from '../context/UserContext';
import { useState, useEffect } from 'react';

function UserList() {
  const { users, socket } = useUser();
  const [flashingUsers, setFlashingUsers] = useState(new Set());

  useEffect(() => {
    if (!socket) return;

    socket.on('user-flash', (userId) => {
      setFlashingUsers(prev => {
        const newSet = new Set(prev);
        newSet.add(userId);
        return newSet;
      });

      // Remove flash after 1 second
      setTimeout(() => {
        setFlashingUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
      }, 1000);
    });

    return () => {
      socket.off('user-flash');
    };
  }, [socket]);

  return (
    <div className="user-list">
      <h3>Connected Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span style={{
              color: flashingUsers.has(user.id) 
                ? `cmyk(${user.color.c}% ${user.color.m}% ${user.color.y}% ${user.color.k}%)`
                : 'black'
            }}>
              {user.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList; 