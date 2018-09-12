/**
 * Collection of Items.
 */

import LoginItem from "./Login";
import RegisterItem from './Register'
import RequestResetPasswordItem from './RequestResetPassword'
import ResetPasswordItem from './ResetPassword'

export class Auths {
    static Login = LoginItem;
    static Register = RegisterItem;
    static RequestResetPassword = RequestResetPasswordItem;
    static ResetPassword = ResetPasswordItem;
}

export const Login = LoginItem;
export const Register = RegisterItem;
export const RequestResetPassword = RequestResetPasswordItem;
export const ResetPassword = ResetPasswordItem;