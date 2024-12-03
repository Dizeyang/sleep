// 路径：src/store/ExamManages/index.tsx
import { setExaminationList, setStudentGroupList, setClassifyList } from './ExamManageSlice';
// import reducer from './ExamManageSlice';
import { examinationReducer } from './ExamManageSlice';
  // reducers
  // const initialState = {
  //   examinationList: [],
  //   studentGroupList: [],
  //   classifyList: [],
  // };
  
  // export const examinationReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case 'examination/SET_EXAMINATION_LIST':
  //       return { ...state, examinationList: action.payload };
  //     // 其他 cases...
  //     default:
  //       return state;
  //   }
  // };
  
  // export const studentGroupReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case 'studentGroup/SET_STUDENT_GROUP_LIST':
  //       return { ...state, studentGroupList: action.payload };
  //     // 其他 cases...
  //     default:
  //       return state;
  //   }
  // };
  
  // export const classifyReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case 'classify/SET_CLASSIFY_LIST':
  //       return { ...state, classifyList: action.payload };
  //     // 其他 cases...
  //     default:
  //       return state;
  //   }
  // };

  export { setExaminationList, setStudentGroupList, setClassifyList };

export default examinationReducer;