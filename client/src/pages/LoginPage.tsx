// react-router-dom
import { PROJECTS } from "@common/utils/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  // react-router-dom logic
  const navigate = useNavigate();

  // redirect to projects page
  useEffect(() => {
    const redirect_location = PROJECTS;
    const timeout = setTimeout(() => {
      navigate(redirect_location);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);
  return <div>Login Page</div>;
}
