import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import type { Issue } from "../types/issue";

interface IssueCardProps {
  issue: Issue;
}

function IssueCard({ issue }: IssueCardProps) {
  const statusColor =
    issue.status === "Open"
      ? "primary"
      : issue.status === "In Progress"
        ? "warning"
        : issue.status === "Resolved"
          ? "success"
          : "default";

  const priorityColor =
    issue.priority === "High"
      ? "error"
      : issue.priority === "Medium"
        ? "warning"
        : "success";

  return (
    <Card
      sx={{
        height: "100%",
        minHeight: 290,
        borderRadius: 5,
        transition: "all 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 24px 48px rgba(0,0,0,0.22)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2.2} sx={{ height: "100%" }}>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                mb: 1,
                lineHeight: 1.25,
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              {issue.title}
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                lineHeight: 1.7,
                minHeight: 72,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              {issue.description}
            </Typography>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            <Chip label={issue.status} color={statusColor as any} />
            <Chip
              label={issue.priority}
              color={priorityColor as any}
              variant="outlined"
            />
            {issue.severity && issue.severity.trim() !== "" && (
              <Chip label={issue.severity} variant="outlined" />
            )}
          </Stack>

          <Box sx={{ pt: 1, mt: "auto" }}>
            <Button
              component={RouterLink}
              to={`/issues/${issue._id}`}
              variant="contained"
              endIcon={<ArrowOutwardRoundedIcon />}
              fullWidth
            >
              View Details
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default IssueCard;
