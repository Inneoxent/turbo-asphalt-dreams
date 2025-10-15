import { RacingGame } from "@/components/RacingGame";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Play = () => {
  const navigate = useNavigate();
  const handleExit = useCallback(() => navigate("/"), [navigate]);
  return <RacingGame onExit={handleExit} />;
};

export default Play;
