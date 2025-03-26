import { Avatar, CardHeader } from "@mui/material";

export default function ContactSide({ user }) {
  return (
    <div>
      <CardHeader
        avatar={<Avatar src={user?.photo} aria-label="recipe" />}
        title={user?.name}
      />
    </div>
  );
}
