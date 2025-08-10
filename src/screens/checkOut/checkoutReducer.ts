import {enmPaymentMethod} from '../../Content/Enums';
import {CardFieldInput} from '@stripe/stripe-react-native';

type State = {
  isCheckOut: boolean;
  isAddingAddress: boolean;
  isAddingPhoneNumber: boolean;
  savePhone: boolean;
  saveAddress: boolean;
  cardDetails: CardFieldInput.Details | null;
  paymentType: enmPaymentMethod;
};

type Action =
  | {type: 'SET_CHECKOUT_LOADING'; payload: boolean}
  | {type: 'TOGGLE_ADD_ADDRESS'; payload?: boolean}
  | {type: 'TOGGLE_ADD_PHONE'; payload?: boolean}
  | {type: 'SET_SAVE_PHONE'; payload: boolean}
  | {type: 'SET_SAVE_ADDRESS'; payload: boolean}
  | {type: 'SET_CARD_DETAILS'; payload: CardFieldInput.Details | null}
  | {type: 'SET_PAYMENT_TYPE'; payload: enmPaymentMethod};

export const checkoutInitialState: State = {
  isCheckOut: false,
  isAddingAddress: false,
  isAddingPhoneNumber: false,
  savePhone: false,
  saveAddress: false,
  cardDetails: null,
  paymentType: enmPaymentMethod.CreditCard,
};

export function checkoutReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_CHECKOUT_LOADING':
      return {...state, isCheckOut: action.payload};
    case 'TOGGLE_ADD_ADDRESS':
      return {
        ...state,
        isAddingAddress: action.payload ?? !state.isAddingAddress,
      };
    case 'TOGGLE_ADD_PHONE':
      return {
        ...state,
        isAddingPhoneNumber: action.payload ?? !state.isAddingPhoneNumber,
      };
    case 'SET_SAVE_PHONE':
      return {...state, savePhone: action.payload};
    case 'SET_SAVE_ADDRESS':
      return {...state, saveAddress: action.payload};
    case 'SET_CARD_DETAILS':
      return {...state, cardDetails: action.payload};
    case 'SET_PAYMENT_TYPE':
      return {...state, paymentType: action.payload};
    default:
      return state;
  }
}
