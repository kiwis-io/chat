/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Member } from '../../models/Member';
import { Message } from '../../models/Message';
import { Container } from '../../models/Container';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Member: Member,
    Message: Message,
    Container: Container,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
