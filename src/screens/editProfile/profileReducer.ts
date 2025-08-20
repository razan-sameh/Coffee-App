type State = {
  firstName: string;
  lastName: string;
  phones: string[];
  addresses: any[]; // ideally type this better (lat/lng object)
};

type Action =
  | {type: 'SET_FIRST_NAME'; payload: string}
  | {type: 'SET_LAST_NAME'; payload: string}
  | {type: 'ADD_PHONE'}
  | {type: 'UPDATE_PHONE'; index: number; payload: string}
  | {type: 'SET_PHONES'; payload: string[]}
  | {type: 'ADD_ADDRESS'; payload: any}
  | {type: 'SET_ADDRESSES'; payload: any[]}
  | {type: 'REMOVE_PHONE'; index: number}
  | {type: 'REMOVE_ADDRESS'; index: number}; // added these

export function profileReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FIRST_NAME':
      return {...state, firstName: action.payload};
    case 'SET_LAST_NAME':
      return {...state, lastName: action.payload};
    case 'ADD_PHONE':
      return {...state, phones: [...state.phones, '']};
    case 'UPDATE_PHONE':
      return {
        ...state,
        phones: state.phones.map((p, i) =>
          i === action.index ? action.payload : p,
        ),
      };
    case 'SET_PHONES':
      return {...state, phones: action.payload};
    case 'ADD_ADDRESS':
      return {...state, addresses: [...state.addresses, action.payload]};
    case 'SET_ADDRESSES':
      return {...state, addresses: action.payload};
    case 'REMOVE_PHONE':
      return {
        ...state,
        phones: state.phones.filter((_, idx) => idx !== action.index),
      };
    case 'REMOVE_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.filter((_, idx) => idx !== action.index),
      };
    default:
      return state;
  }
}
