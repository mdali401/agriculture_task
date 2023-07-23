import {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'userId',
    headerName: 'User ID',
    width: 100,
    editable: true,
  },
  {
    field: 'title',
    headerName: 'Title',
    width: 300,
    editable: true,
  },
  {
    field: 'body',
    headerName: 'Body',
    width: 900,
    type: 'string',
    editable: true,
  },
];


const Posts = () => {
  interface Post {
    body: string,
    id: number,
    title: string,
    userId: string
  }
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => setPosts(data || []))
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={posts}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  )
}

export default Posts