import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Group {
  _id: string;
  name: string;
  teacher: string;
  classify: string;
  createTime: number;
}

interface GroupState {
  groupList: Group[];
  totalGroups: number;
  currentPage: number;
  pageSize: number;
  editingGroup: Group | null;
}

const initialState: GroupState = {
  groupList: [],
  totalGroups: 0,
  currentPage: 1,
  pageSize: 5,
  editingGroup: null,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroupList: (state, action: PayloadAction<Group[]>) => {
      state.groupList = action.payload;
    },
    setTotalGroups: (state, action: PayloadAction<number>) => {
      state.totalGroups = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;

      // 调整 currentPage，确保它不超过最大页数
      if (state.currentPage > Math.ceil(state.totalGroups / action.payload)) {
        state.currentPage = Math.ceil(state.totalGroups / action.payload);
      }
    },
    setEditingGroup: (state, action: PayloadAction<Group | null>) => {
      state.editingGroup = action.payload;
    },
    updateGroup: (state, action: PayloadAction<Group>) => {
      const index = state.groupList.findIndex(group => group._id === action.payload._id);
      if (index !== -1) {
        state.groupList[index] = action.payload;
      }
    },
    deleteGroup: (state, action: PayloadAction<string>) => {
      // 删除指定的班级
      state.groupList = state.groupList.filter(group => group._id !== action.payload);
      state.totalGroups -= 1;

      // 如果当前页面是最后一页且数据条数小于当前每页的条数，调整 currentPage
      if (state.currentPage > Math.ceil(state.totalGroups / state.pageSize)) {
        state.currentPage = Math.max(1, Math.ceil(state.totalGroups / state.pageSize));
      }
    },
  },
});

export const {
  setGroupList,
  setTotalGroups,
  setCurrentPage,
  setPageSize,
  setEditingGroup,
  updateGroup,
  deleteGroup,
} = groupSlice.actions;

export default groupSlice.reducer;
