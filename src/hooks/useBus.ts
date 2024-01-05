import mitt, { Emitter } from 'mitt';

/**
 * @description 
 * */ 
type EventsBus = {
  key: string;
}

export default class emitter {
  public static bus:Emitter<EventsBus> = mitt<EventsBus>();
}