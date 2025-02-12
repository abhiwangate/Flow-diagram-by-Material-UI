import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  alpha,
} from '@mui/material';
import { Plus, ListTodo } from 'lucide-react';
import { useItemStore } from '../store/itemStore';

export const ItemList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  
  const { items, addItem } = useItemStore();

  const handleAdd = () => {
    if (newTitle.trim() && newDescription.trim()) {
      addItem({
        title: newTitle,
        description: newDescription,
      });
      setNewTitle('');
      setNewDescription('');
      setOpen(false);
    }
  };

  return (
    <div className="w-full">
      <Paper elevation={3} className="p-6 rounded-xl border border-emerald-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <ListTodo className="text-emerald-600" size={24} />
            <Typography variant="h6" className="text-emerald-800">Items List</Typography>
          </div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Plus size={20} />}
            onClick={() => setOpen(true)}
            sx={{
              borderRadius: '9999px',
              textTransform: 'none',
              px: 3,
              '&:hover': {
                backgroundColor: alpha('#10B981', 0.9),
              },
            }}
          >
            Add Item
          </Button>
        </div>

        <List className="bg-emerald-50 rounded-lg">
          {items.map((item, index) => (
            <ListItem 
              key={item.id} 
              divider={index !== items.length - 1}
              sx={{
                '&:hover': {
                  backgroundColor: alpha('#10B981', 0.05),
                },
                transition: 'background-color 0.2s',
                borderRadius: index === 0 ? '8px 8px 0 0' : index === items.length - 1 ? '0 0 8px 8px' : '0',
              }}
            >
              <ListItemText
                primary={<span className="font-semibold text-emerald-700">{item.title}</span>}
                secondary={<span className="text-emerald-600">{item.description}</span>}
              />
            </ListItem>
          ))}
          {items.length === 0 && (
            <ListItem>
              <ListItemText
                primary={<span className="text-emerald-600 text-center italic">No items yet. Add your first item!</span>}
              />
            </ListItem>
          )}
        </List>

        <Dialog 
          open={open} 
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: '16px',
              padding: '8px',
            },
          }}
        >
          <DialogTitle className="text-emerald-800">Add New Item</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#10B981',
                  },
                },
              }}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={2}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#10B981',
                  },
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ padding: '16px 24px' }}>
            <Button 
              onClick={() => setOpen(false)}
              sx={{ 
                color: '#64748B',
                '&:hover': {
                  backgroundColor: alpha('#64748B', 0.08),
                },
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAdd} 
              variant="contained" 
              color="primary"
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: alpha('#10B981', 0.9),
                },
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
};