import { postData } from "@/Interfaces/Interfaces";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid2 as Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { IoMdMore } from "react-icons/io";


export default function PostCard({ post }: postData) {
  return (
    <div>
      <Card key={post._id}>
        <CardHeader
          avatar={<Avatar src={post.user?.photo} aria-label="recipe" />}
          action={
            <IconButton aria-label="settings">
              <IoMdMore />
            </IconButton>
          }
          title={post.user?.name}
          subheader={post.createdAt}
        />
        <CardActionArea>
          {post.image && (
            <CardMedia
              component="img"
              height="140px"
              width="90%"
              image={post.image}
              alt={post.user?.name}
            />
          )}

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.user?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {post.body}
            </Typography>
          </CardContent>
        </CardActionArea>
        <hr className="text-gray-400" />
        <CardActions>
          <Grid container spacing={2}>
            <Grid size={4}>
              <Button size="small" color="primary">
                Like
              </Button>
            </Grid>
            <Grid size={4}>
              <Button size="small" color="primary">
                Comment
              </Button>
            </Grid>
            <Grid size={4}>
              <Button size="small" color="primary">
                Share
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
}
