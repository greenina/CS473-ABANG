// 액션 타입 정의
const CHANGE_COLOR = 'counter/CHANGE_COLOR';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';
const SET_EMAIL = 'counter/SETEMAIL';
const SET_VOTE = 'counter/SETVOTE';

// 액션 생섬함수 정의
export const changeColor = color => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const setEmail = email => ({type:SET_EMAIL, email })
export const setVote = vid => ({type:SET_VOTE, vid })

// **** 초기상태 정의
const initialState = {
  email:"",
  vid:"aa"
};

// **** 리듀서 작성
export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_EMAIL:
      return{
          ...state,
          email: action.email
      };
    default:
      return state;
  }
}