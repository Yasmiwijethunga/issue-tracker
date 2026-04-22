import { Box, Button, Stack, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        mt: 4,
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      <Button
        variant="outlined"
        size="small"
        startIcon={<ChevronLeftIcon />}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        sx={{ minWidth: 100 }}
      >
        Previous
      </Button>

      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
        {pageNumbers[0] > 1 && (
          <>
            <Button
              variant="outlined"
              size="small"
              onClick={() => onPageChange(1)}
              disabled={isLoading}
              sx={{ minWidth: 40 }}
            >
              1
            </Button>
            {pageNumbers[0] > 2 && (
              <Typography sx={{ px: 1, display: "flex", alignItems: "center" }}>
                ...
              </Typography>
            )}
          </>
        )}

        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "contained" : "outlined"}
            size="small"
            onClick={() => onPageChange(page)}
            disabled={isLoading}
            sx={{ minWidth: 40 }}
          >
            {page}
          </Button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <Typography sx={{ px: 1, display: "flex", alignItems: "center" }}>
                ...
              </Typography>
            )}
            <Button
              variant="outlined"
              size="small"
              onClick={() => onPageChange(totalPages)}
              disabled={isLoading}
              sx={{ minWidth: 40 }}
            >
              {totalPages}
            </Button>
          </>
        )}
      </Box>

      <Button
        variant="outlined"
        size="small"
        endIcon={<ChevronRightIcon />}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        sx={{ minWidth: 100 }}
      >
        Next
      </Button>
    </Stack>
  );
}

export default Pagination;