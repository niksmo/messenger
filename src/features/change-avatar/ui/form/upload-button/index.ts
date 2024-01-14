import uuid from 'shared/packages/uuid';
import { Block, type IBlockProps } from 'shared/components/block';
import { ButtonOutlined } from 'shared/ui/button';
import templateSpec from './upload-button.template.hbs';
import styles from './styles.module.css';

interface IUploadButtonProps extends IBlockProps {
  onChange: (e: Event) => void;
}

export class UploadButton extends Block<IUploadButtonProps> {
  constructor(props?: IUploadButtonProps) {
    const button = new ButtonOutlined({
      name: 'pickButton',
      type: 'button',
      label: 'Pick image',
    });

    super({ id: uuid(), button, ...props });

    button.setProps({
      onClick: () => {
        const inputEl = this.getContent();
        inputEl.click();
      },
    });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
