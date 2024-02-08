
namespace IAccount {
    export interface IBase {
        $createdAt: string;
        $id: string;
        $updatedAt: string;
        accessedAt: string;
        email: string;
        emailVerification: boolean;
        labels: any[];
        name: string;
        passwordUpdate: string;
        phone: string;
        phoneVerification: boolean;
        prefs: { organization: string };
        registration: string;
        status: boolean;
    }
    export interface IPasswordChange {
        password: string;
        newPassword: string;
        newPasswordConfirm: string;
    }
}