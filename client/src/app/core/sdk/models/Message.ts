/* tslint:disable */

declare var Object: any;
export interface MessageInterface {
  "sender_id": string;
  "receiver_id"?: string;
  "text_message"?: string;
  "image_message"?: string;
  "msg_date"?: Date;
  "id"?: any;
}

export class Message implements MessageInterface {
  "sender_id": string;
  "receiver_id": string;
  "text_message": string;
  "image_message": string;
  "msg_date": Date;
  "id": any;
  constructor(data?: MessageInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Message`.
   */
  public static getModelName() {
    return "Message";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Message for dynamic purposes.
  **/
  public static factory(data: MessageInterface): Message{
    return new Message(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Message',
      plural: 'Messages',
      path: 'Messages',
      idName: 'id',
      properties: {
        "sender_id": {
          name: 'sender_id',
          type: 'string'
        },
        "receiver_id": {
          name: 'receiver_id',
          type: 'string'
        },
        "text_message": {
          name: 'text_message',
          type: 'string'
        },
        "image_message": {
          name: 'image_message',
          type: 'string'
        },
        "msg_date": {
          name: 'msg_date',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
      },
      relations: {
      }
    }
  }
}
