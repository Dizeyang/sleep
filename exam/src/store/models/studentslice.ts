import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Student {
  _id: string;
  name: string;
  sex: string;
  age: number;
  className: string;
  createTime: number;
}

interface StudentState {
  studentList: Student[];
  totalStudents: number;
  currentPage: number;
  pageSize: number;
  editingStudent: Student | null;
}

const initialState: StudentState = {
  studentList: [],
  totalStudents: 0,
  currentPage: 1,
  pageSize: 5,
  editingStudent: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudentList: (state, action: PayloadAction<Student[]>) => {
      state.studentList = action.payload;
    },
    setTotalStudents: (state, action: PayloadAction<number>) => {
      state.totalStudents = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;

      if (state.currentPage > Math.ceil(state.totalStudents / action.payload)) {
        state.currentPage = Math.ceil(state.totalStudents / action.payload);
      }
    },
    setEditingStudent: (state, action: PayloadAction<Student | null>) => {
      state.editingStudent = action.payload;
    },
    updateStudent: (state, action: PayloadAction<Student>) => {
      const index = state.studentList.findIndex(student => student._id === action.payload._id);
      if (index !== -1) {
        state.studentList[index] = action.payload;
      }
    },
    deleteStudent: (state, action: PayloadAction<string>) => {
      state.studentList = state.studentList.filter(student => student._id !== action.payload);
      state.totalStudents -= 1;

      if (state.currentPage > Math.ceil(state.totalStudents / state.pageSize)) {
        state.currentPage = Math.max(1, Math.ceil(state.totalStudents / state.pageSize));
      }
    },
  },
});

export const {
  setStudentList,
  setTotalStudents,
  setCurrentPage,
  setPageSize,
  setEditingStudent,
  updateStudent,
  deleteStudent,
} = studentSlice.actions;

export default studentSlice.reducer;

