import { Clear, Refresh } from '@mui/icons-material';
import { Box, Divider, FormControl, IconButton, InputBase, InputLabel, List, ListItem, ListItemText, MenuItem, Pagination, Paper, Select, Snackbar, Stack, type SelectChangeEvent } from '@mui/material';
import { useEffect, useState, useMemo, useCallback, type FC } from 'react';
import { mockFetchAssets } from './utils';
import { AssetStatusList, STATUS_COLOR_MAP, type Asset } from './types';
import Chip from '@mui/material/Chip';

const COUNT_PER_PAGE = 5;

const searchByName = (items: Asset[], query: string): Asset[] => {
  if (!query) return items;
  const lowerQuery = query.toLowerCase();
  return items.filter((item) => item.name.toLowerCase().includes(lowerQuery));
};

const searchByStatus = (items: Asset[], status: string): Asset[] => {
  if (!status || status === 'ALL') return items;
  const lowerStatus = status.toLowerCase();
  return items.filter((item) => item.status.toLowerCase() === lowerStatus);
};

interface CustomListViewProps {
  data?: Asset[];
};

const CustomListView: FC<CustomListViewProps> = ({ data }) => {
  return (
    <List className="text-black">
      {data?.map((item, i) => (
        <ListItem key={`${item.id}-${i}`} className='shadow-sm flex flex-row w-full'>
          <div className="">
            <ListItemText>{item.name}</ListItemText>
            <Chip label={item.type} size='small' />
          </div>
          <div className="ml-auto text-right">
            <Divider orientation="vertical" />
            <Chip
              label={item.status}
              size='small'
              color={STATUS_COLOR_MAP[item.status]}
              variant='outlined'
              className='rounded-xs'
            />
            <h1 className='text-right text-xl font-semibold text-neutral-700'>{item.value}</h1>
          </div>
        </ListItem>
      ))}
    </List>
  );
}

export const AssetList: FC = () => {
  const [data, setData] = useState<Asset[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredStatus, setFilteredStatus] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>();
  const [open, setOpen] = useState<boolean>(false);

  const derivedFilteredData = useMemo(() => {
    let result = data;

    if (searchQuery) {
      result = searchByName(result, searchQuery);
    }
    if (filteredStatus) {
      result = searchByStatus(result, filteredStatus);
    }

    return result;
  }, [data, searchQuery, filteredStatus]); 

  const derivedVisibleData = useMemo(() => {
    const start = (currentPage - 1) * COUNT_PER_PAGE;
    const end = currentPage * COUNT_PER_PAGE;
    return derivedFilteredData.slice(start, end);
  }, [derivedFilteredData, currentPage]);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    mockFetchAssets()
      .then((objects) => {
        setData(objects);
      })
      .catch((reason) => {
        setError(reason);
        setOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleToastClose = useCallback(() => {
    setOpen(false);
    setError(undefined);
  }, []);

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  }, []);

  const handleStatusFilterChange = useCallback((event: SelectChangeEvent) => {
    setFilteredStatus(event.target.value as string);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <div><h1>loading...</h1></div>;

  return (
    <div className=''>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', width: 600, backgroundColor: "Background" }}
      >
        <IconButton
          sx={{ p: '10px' }}
          aria-label="clear"
          onClick={handleClearSearch}
        >
          <Clear />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="status-select"
              value={filteredStatus}
              label="Status"
              onChange={handleStatusFilterChange}
            >
              <MenuItem value={"ALL"}>ALL</MenuItem>
              {AssetStatusList.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <div className='flex flex-row justify-between'>
        <h2 className='mt-4 mb-2'>Showing ({derivedFilteredData.length}) results</h2>
        <IconButton
          sx={{ p: '10px' }}
          aria-label="refresh"
          color='primary'
          onClick={fetchData}
        >
          <Refresh />
        </IconButton>
      </div>

      <Divider className='mt-4' flexItem />

      {derivedVisibleData.length > 0 ? (
        <CustomListView data={derivedVisibleData} />
      ) : (
        <div className=''>
          <h1 className=''>No data to display!!</h1>
        </div>
      )}

      <Stack spacing={2} className='w-full justify-center'>
        {derivedFilteredData.length > 0 && (
          <Pagination
            // Calculate Pages based on FILTERED results, not total results
            count={Math.ceil(derivedFilteredData.length / COUNT_PER_PAGE)}
            page={currentPage}
            color="primary"
            variant="outlined"
            showFirstButton
            showLastButton
            onChange={handlePageChange}
          />
        )}
      </Stack>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleToastClose}
        message={error?.message}
      />
    </div>
  );
};