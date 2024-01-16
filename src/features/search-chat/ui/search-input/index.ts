import uuid from 'shared/packages/uuid';
import { Block, type BlockProps } from 'shared/components/block';
import templateSpec from './search-input.template.hbs';
import styles from './styles.module.css';

type SearchBarProps = BlockProps<{
  onInput?: (e: Event) => void;
}>;

export class SearchBar extends Block<SearchBarProps> {
  constructor() {
    super({ id: uuid() });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  protected _getListenersSelector(): string {
    return 'input';
  }
}
