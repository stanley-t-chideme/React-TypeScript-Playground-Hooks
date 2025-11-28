import { Clear, Search } from '@mui/icons-material';
import { Divider, IconButton, InputBase, List, ListItem, ListItemText, Paper } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { mockFetchAssets } from './utils';
import { Asset } from './types';

export const AssetList: FC = () => {
  const [data, setData] = useState<Asset[]>();

  useEffect(()=>{
    mockFetchAssets()
    .then((objects) =>{
      setData(objects);
    })
    .catch((reason)=>{
      console.log("Error: ", reason);
    })
  }, [])

  useEffect(()=>{
    console.log("Data: ", data);
  }, [data])

  return <div className=''>
    {/* Search component */}
    <Paper
      component="form"
      className=''
      sx={{ p: '2px 4px', display: 'flex', width: 400, backgroundColor: "Background" }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="clear">
        <Clear />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <Search />
      </IconButton>
    </Paper>

    {data && <List>
      {data.map((item) => <ListItem key={item.id} className='shadow-sm flex flex-row'>
        <ListItemText>{item.name}</ListItemText>
      </ListItem>)}
    </List>}

  </div>;
};
