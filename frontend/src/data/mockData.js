export const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123" // In real app, this would be hashed
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123"
  }
];

export const mockRainData = [
  {
    id: 1,
    user_id: 1,
    level: 45,
    valve_status: "open",
    timestamp: "2024-03-15T10:30:00Z"
  },
  {
    id: 2,
    user_id: 1,
    level: 60,
    valve_status: "closed",
    timestamp: "2024-03-15T11:30:00Z"
  },
  {
    id: 3,
    user_id: 1,
    level: 75,
    valve_status: "open",
    timestamp: "2024-03-15T12:30:00Z"
  },
  {
    id: 4,
    user_id: 1,
    level: 30,
    valve_status: "closed",
    timestamp: "2024-03-15T13:30:00Z"
  },
  {
    id: 5,
    user_id: 1,
    level: 90,
    valve_status: "open",
    timestamp: "2024-03-15T14:30:00Z"
  }
]; 