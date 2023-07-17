import { CardRole } from "../../types";
import { GameMapField } from "../atoms";

type Props = {
  isBlurred: boolean;
  rolesForRound: Array<CardRole>;
};

const mapStyle = {
  width: "34vh",
  height: "34vh",
  display: "flex",
  flexWrap: "wrap" as const,
  justifyContent: "space-around",
  border: "15px solid black",
  borderRadius: "12px",
  backgroundColor: "black",
  marginBottom: "32px",
  marginTop: "16px",
  boxShadow: "0 0 0 4px #bcbcbc",
};

export function GameMap({ rolesForRound, isBlurred }: Props) {
  const map = (
    <div
      style={{
        ...mapStyle,
      }}
    >
      {rolesForRound.map((role, index) => (
        <GameMapField key={index} role={role} isRoleRevealed={!isBlurred} />
      ))}
    </div>
  );

  return map;
}