
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
    gameData?: any,
    squareRemaining?: string,
    requestCreateNewGame: () => void,
    isExpired: boolean,
    setIsExpired: any,
    requestUpdateGame: (row:number, col:number) => void,
    requestAddRemoveFlagGame: (row:number, col:number) => void
}

export type TypeCreateGame = {
    rows_number?: number,
    cols_number?: number,
    mines_number?: number
}

export type TypeSquare = {
    index: number,
    adj_mines: number,
    is_selected: boolean,
    is_mine: boolean,
    is_flaged: boolean,
    row: number,
    board: number
}

export type TypeGameDataResponse = {
    id?: number,
    uuid?: string,
    rows_number?: number,
    cols_number?: number,
    mines_number?: number,
    end_game?: boolean,
    is_winner?: boolean,
    square_remaining?: number,
    created_at?: string,
    rows?: [any]
}
