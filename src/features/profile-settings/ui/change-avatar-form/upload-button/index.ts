import uuid from 'shared/packages/uuid';
import { Block } from 'shared/components/block';
import { ButtonOutlined } from 'shared/ui/button';
import templateSpec from './upload-button.template.hbs';
import styles from './styles.module.css';

interface UploadButtonProps {
  onChange: (e: Event) => void;
}

interface InnerProps extends UploadButtonProps {
  id: string;
  button: Block;
}

export class UploadButton extends Block<InnerProps> {
  constructor(props: UploadButtonProps) {
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

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
