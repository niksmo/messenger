import { BlockInput, type IBlockProps } from 'shared/components/block';
import templateSpec from './search-input.template.hbs';
import styles from './styles.module.css';

interface ISearchBarProps extends IBlockProps {
  id: string;
  name: string;
  placeholder: string;
  onInput?: (e: Event) => void;
}

export class SearchBar extends BlockInput<ISearchBarProps> {
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
