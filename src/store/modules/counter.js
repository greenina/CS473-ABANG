// 액션 타입 정의
const CHANGE_COLOR = 'counter/CHANGE_COLOR';
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';
const SET_EMAIL = 'counter/SETEMAIL';

// 액션 생섬함수 정의
export const changeColor = color => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const setEmail = email => ({type:SET_EMAIL, email })

// **** 초기상태 정의
const initialState = {
  color: 'red',
  number: 3,
  email:"igreen0485@gmail.com"
};

// **** 리듀서 작성
export default function counter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case INCREMENT:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREMENT:
      return {
        ...state,
        number: state.number - 1,
      };
    case SET_EMAIL:
      return{
          ...state,
          email: action.email
      };
    default:
      return state;
  }
}