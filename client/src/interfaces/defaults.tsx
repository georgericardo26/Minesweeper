
export interface IProps {
    children: React.ReactNode
}


export interface ITopBar {
    children: React.ReactNode
}

export interface ISignUP {
    handleSubmit: (event: any) => void,
    ErrorDisplay?: boolean
}
export interface IHome {
    handleSubmit: (event: any) => void,
    ErrorDisplay?: boolean
}

export type ObjFields = {
    first_name?: string,
    last_name?: string,
    username?: string,
    email?: string,
    phone_number?: string,
    password?: string,
    re_password?: string
}

export type ItemsType = {
    name: string
}

export type IGridOption = {
    grid: string
}

export type TypeProfileTopBar = {
    grid: string
    profileName?: string
}

export interface IRequestData {
    url: string,
    bodyData?: Object,
    header?: Object
}

export type IResponseData = {
    status?: number,
    data?: Object
}

export type ISignUpSucess = {
    account_creation: string
}

export type TypeGameOBJ = {
    errorDisplay?: boolean,
    gameData?: any
}

export type TypeCreateGame = {
    rows_number?: number,
    cols_number?: number,
    mines_number?: number
}
