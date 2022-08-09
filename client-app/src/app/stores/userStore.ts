import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { store } from "./store";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {return this.user};

    private handleRegisterOrLogin = (user: User) => {
        store.commonStore.setToken(user.token);
        runInAction(() => this.user = user);
        history.push('/activities');
        store.modalStore.closeModal();
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            this.handleRegisterOrLogin(user);
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.removeToken();
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error)
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            this.handleRegisterOrLogin(user);
        } catch (error) {
            throw error;
        }
    }
}