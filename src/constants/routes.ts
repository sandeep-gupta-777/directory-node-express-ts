import { roles } from "./roles";


let ALL_ACCESS = [roles.ADMIN, roles.NON_ADMIN];

/*Registration routes*/
const user_prefix = '/users/:USER_ID';
export const login = {route:`/login`, accessibleTo: ALL_ACCESS};
export const signup = {route:"/signup", accessibleTo:ALL_ACCESS};
export const changePass = {route:`${user_prefix}/change-password`, accessibleTo:ALL_ACCESS};

/*create users*/
const account_prefix = `${user_prefix}/accounts`;
export const account_create = {route:`${account_prefix}/create`, accessibleTo:[roles.ADMIN]};
export const account_read = {route:`${account_prefix}/read`, accessibleTo:ALL_ACCESS};
export const account_delete = {route:`${account_prefix}/delete`, accessibleTo:ALL_ACCESS};
export const account_update = {route:`${account_prefix}/update`, accessibleTo:ALL_ACCESS};

/*Action routes*/
const action_prefix = `${user_prefix}/directory`;
// export const account_create = {route:`${action_prefix}/create-admin`, accessibleTo:[roles.ADMIN]};
export const phone_number_create = {route:`${action_prefix}/create`, accessibleTo:ALL_ACCESS};
export const phone_number_update = {route:`${action_prefix}/update`, accessibleTo:ALL_ACCESS};
export const phone_number_delete = {route:`${action_prefix}/delete`, accessibleTo:ALL_ACCESS};
export const phone_number_read = {route:`${action_prefix}/read`, accessibleTo:ALL_ACCESS};//details of a phone number
export const phone_number_list = {route:`${action_prefix}/list`, accessibleTo:ALL_ACCESS};//TODO: add sort by and other filters

/*Analytics routes*/
export const phone_number_count = {route:'/analytics/count', accessibleTo:[roles.ADMIN]};
