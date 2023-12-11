import { Block } from '../../../../shared/components/block/block';
import templateSpec from './message.template.hbs';
import styles from './styles.module.css';

export class ResponseMessage extends Block {
  constructor() {
    super({}, styles);
  }

  protected _getTemplateSpec() {
    return templateSpec;
  }

  public isShow(bool: boolean) {
    this.getContent().style.visibility = bool ? 'hidden' : 'visible';
  }
}
