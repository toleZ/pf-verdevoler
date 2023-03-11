import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ cond, children }) => {
  if (!cond) return <Navigate to={'/home'} />;

  return children;
};

export default ProtectedRoute;
