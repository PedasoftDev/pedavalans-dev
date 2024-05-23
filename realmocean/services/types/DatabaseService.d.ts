import { Query } from "./Queryd";


export interface DatabaseService {
    Query: Query;
    create(projectId: string, databaseId: string, name: string, enabled?: boolean);
    createCollection(projectId: string, databaseId: string, collectionId: string, name: string, permissions?: string[], documentSecurity?: boolean, enabled?: boolean);
    list(projectId: string): any[];
    createDocument(projectId: string, databaseId: string, collectionId: string, documentId: string, data: any, permissions?: any);
    listDocuments(projectId: string, databaseId: string, collectionId: string, queries?: string[]);
    createStringAttribute(projectId: string, databaseId: string, collectionId: string, key: string, size: number, required: boolean, xdefault?: string, array?: boolean, encrypt?: any);
}