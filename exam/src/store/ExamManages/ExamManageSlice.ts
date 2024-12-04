// src/store/ExamManages/ExamManageSlice.tsx
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { examinationListApi, studentGroupApi, classifyApi,removeExamApi } from '../../services';
import type { examinationItem, studentGroupItem, classifyItem, removeExamItem } from '../../type';

// 定义 State 类型
interface ExaminationState {
  examinationList: examinationItem[];
  deleteExamination: removeExamItem[];
  studentGroupList: studentGroupItem[];
  classifyList: classifyItem[];
  loading: boolean;
  error: null | unknown; // 使用 unknown 以保持错误类型的最大兼容性
}

// 使用泛型定义 initialState
const initialState: ExaminationState = {
  examinationList: [],
  deleteExamination: [],

  studentGroupList: [],
  classifyList: [],
  loading: false,
  error: null,
};


export const fetchExaminationList = createAsyncThunk(
  'examination/fetchExaminationList',
  async (query, { rejectWithValue }) => {
    try {
      const response = await examinationListApi(query);
      console.log(response?.data.data.list)
      return response?.data.data.list;
    } catch (error) {
      return rejectWithValue(null);
    }
    
  },
  
);

export const fetchStudentGroupList = createAsyncThunk(
  'examination/fetchStudentGroupList',
  async (query, { rejectWithValue }) => {
    try {
      const response = await studentGroupApi(query);
      return response?.data.data.list;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

export const fetchClassifyList = createAsyncThunk(
  'examination/fetchClassifyList',
  async (query, { rejectWithValue }) => {
    try {
      const response = await classifyApi(query);
      return response.data.data.list;
    } catch (error) {
      return rejectWithValue(null);
    }
  }
);

export const deleteExaminations = createAsyncThunk(
  'examination/deleteExamination',
  async (id, { rejectWithValue }) => {
    try {
      const response = await removeExamApi({_id: id}); // 假设这是你的 API 删除操作
      console.log(response);
      return response.data;
    
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


  const examinationSlice = createSlice({
    name: 'examination',
    initialState,
    reducers: {
      // 考试列表
      setExaminationList: (state, action) => {
        state.examinationList = action.payload;
      },
      // 班级列表
      setStudentGroupList: (state, action) => {
        state.studentGroupList = action.payload;
      },
      // 科目列表
      setClassifyList: (state, action) => {
        state.classifyList = action.payload;
      },
      removeExamination: (state, action) => {
        const { id } = action.payload;
        state.examinationList = state.examinationList.filter(item => item._id !== id);
      },  
      deleteExamination: (state, action) => {
        state.examinationList = state.examinationList.filter(item => item._id !== action.payload.id);
      },
    },
    // 处理异步
    extraReducers: (builder) => {
      builder

        // 考试
        .addCase(fetchExaminationList.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchExaminationList.fulfilled, (state, action) => {
          state.loading = false;
          console.log('Fetched data:', action.payload);
          state.examinationList = action.payload;
        })
        .addCase(fetchExaminationList.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // 班级
        .addCase(fetchStudentGroupList.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchStudentGroupList.fulfilled, (state, action) => {
          state.loading = false;
          state.studentGroupList = action.payload;
        })
        .addCase(fetchStudentGroupList.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        // 科目
        .addCase(fetchClassifyList.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchClassifyList.fulfilled, (state, action) => {
          state.loading = false;
          state.classifyList = action.payload;
        })
        .addCase(fetchClassifyList.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

       
        .addCase(deleteExaminations.pending, (state) => {
          state.loading = true;
        })
        // .addCase(deleteExaminations.fulfilled, (state, action) => {
        //   state.loading = false;
        //   state.examinationList = action.payload;
        // })
        .addCase(deleteExaminations.fulfilled, (state, action) => {
          state.loading = false;
          state.examinationList = state.examinationList.filter(item => item._id !== action.payload._id);
        })
        .addCase(deleteExaminations.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { setExaminationList, setStudentGroupList, setClassifyList,removeExamination,deleteExamination } = examinationSlice.actions;
  export const examinationReducer = examinationSlice.reducer;