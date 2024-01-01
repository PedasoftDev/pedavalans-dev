interface IDatabase {
    id: string;
    name: string;
    description: IDescription;
    seed_admin: IAdmin;
    author: string;
    version: string;
    enabled: boolean;
    collections: ICollection[];
}

interface IDescription {
    en: string;
    tr: string;
    fr?: string;
    es?: string;
    de?: string;
}

interface ICollection {
    id: string;
    name: string;
    description: IDescription;
    version: string;
    attributes: {
        key: string;
        type: string;
        default?: boolean;
    }[];
}

interface IAdmin {
    name: "pedasoft";
    email: "info@pedasoft.com";
    password: "pedasoft";
}

export default IDatabase;
