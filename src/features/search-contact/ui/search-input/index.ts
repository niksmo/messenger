import templateSpec from './search-input.template.hbs';
import styles from './styles.module.css';
import { Block, type IBlockProps } from 'shared/components/block';

interface ISearchBarProps extends IBlockProps {
  id: string;
  name: string;
  placeholder: string;
  onInput?: (e: Event) => void;
}

export class SearchBar extends Block<ISearchBarProps> {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  protected _getListenersSelector(): string {
    return 'input';
  }
}
