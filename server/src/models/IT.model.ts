export interface ITInfo {
    name: string;
    email: string;
    type?: 2;
};

export default class IT {
    private itInfo: ITInfo;
    public static readonly type: 2 = 2;

    constructor(it: ITInfo) {
        this.itInfo = it;

        if (this.itInfo.type === undefined) {
            this.itInfo.type = 2;
        }
    }

    public info(): ITInfo {
        return this.itInfo;
    }
}
