import { db } from './db.mjs';
import {
    GetCommand,
    PutCommand,
    QueryCommand
} from '@aws-sdk/lib-dynamodb'
import createError from 'http-errors';

export interface NewUser {
    username: string;
    password: string;
    email: string;
    createAt: string;
    role?: string;
}

export interface UserCredentials {
    username: string;
    password: string;
    role: string;
}

export const addUser = async (user: NewUser): Promise<boolean> => {
    try {
        const command = new PutCommand({
            TableName : 'cantina-db',
            Item: {
                PK: `USER:${user.username}`,
                SK: `PROFILE`,
                username: user.username,
                password: user.password,
                GSI1PK: user.email,
                GSI1SK: `CREATE AT:${user.createAt}`,
                role: user.role || 'customer',
            }
        });
        await db.send(command)
        return true
    } catch (error) {
            throw createError(500, error instanceof Error ? error.message : 'Failed to add user');
    }
}
export const getUser = async (username: string): Promise<UserCredentials | undefined> => {
    try {
        const command = new GetCommand({
            TableName : 'cantina-db',
            Key : {
                PK: `USER:${username}`,
                SK: `PROFILE`,
            } 
        })
        const { Item } = await db.send(command)
        if (!Item) {
            return undefined;
        }
        if (
            typeof Item.username !== 'string' ||
            typeof Item.password !== 'string' ||
            typeof Item.role !== 'string'
        ) {
            throw createError(500, 'Stored user record is invalid');
        }
        return { username: Item.username, password: Item.password, role: Item.role };
    } catch (error) {
        throw createError(500, error instanceof Error ? error.message : 'Failed to get user');
    }
}

export const getUserForRegister = async (username: string): Promise<boolean> => {
    try {
        const command = new GetCommand({
            TableName : 'cantina-db',
            Key : {
                PK: `USER:${username}`,
                SK: `PROFILE`
            } 
        })
        const { Item } = await db.send(command)
        if(Item === undefined) {
            return false
        } else
            return true
    } catch (error) {
        throw createError(500, error instanceof Error ? error.message : 'Failed to check username');
    }
}

export const getEmailForRegister = async (email: string): Promise<boolean> => {
    try {
        const command = new QueryCommand({
            TableName: 'cantina-db',
            IndexName: 'GSI1',
            KeyConditionExpression: 'GSI1PK = :GSI1PK AND begins_with(GSI1SK, :GSI1SK)',
            ExpressionAttributeValues: {
              ':GSI1PK': email,
              ':GSI1SK': "CREATE AT:"
            },
        });

        const { Items } = await db.send(command);
        return Items?.[0] !== undefined;
    } catch (error) {
        throw createError(500, error instanceof Error ? error.message : 'Failed to check email');
    }
}