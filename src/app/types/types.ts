export namespace Types {
    export interface Advert {
        _id?: string;
        phone: string;
        password: string;
        nickname?: string;
        createDt?: Date;
        /**
         * 账户余额
         */
        money?: number;
        /**账户历史充值的总额 */
        historyMoney?: number;
    }
    export interface IUser {
        _id?: string;
        nickname: string;
        todayMoney?: number;
        totalMoney?: number;
        createDt?: number;
        isFinish?: boolean;
        sex?: number;
    }
    export interface Field {
        label: string;
        key: string;

    }
    export interface ITaskRecord {
        _id?: string;
        shareDetail: { user: IUser, money: number }[];
        createDt?: Date;
        task?: ITask;
    }

    export interface ITaskTag {
        _id?: string,
        name: string,
        sort: number,
        createDt?: Date;
        subTaskNum?: number;
    }

    export interface ITask {
        _id?: string;
        title: string;
        createDt: Date;
        fee: number;
        startDt?: Date;

        publisher: string | IUser;
        shareMoney: number;
        // 余额
        totalMoney: number;
        active: boolean;
        websiteUrl: string;
        imageUrl?: string;
        bannerUrl?: string;
        taskTag?: string | ITaskTag;
    }
    export interface IGetMoneyRequest {
        _id?: string;
        user: IUser;
        money: number;
        createDt: number;
        status: 1 | 2 | 3;
    }

}
